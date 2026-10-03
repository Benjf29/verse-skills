import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, rm, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCatalog } from './validate.mjs';
import { compareRevision } from './check-upstream.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
test('the seven skills have valid references and immutable source provenance', async () => {
  assert.equal((await validateCatalog(root)).catalog.skills.length, 7);
});
test('tampered files, escaping paths, unknown provenance and unlisted files are rejected', async () => {
  for (const mutation of ['content', 'path', 'source', 'extra']) {
    const temporary = await mkdtemp(join(tmpdir(), 'verse-skills-test-'));
    try {
      await cp(root, temporary, { recursive: true });
      const catalogPath = join(temporary, 'catalog.json'), catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
      if (mutation === 'content') await writeFile(join(temporary, 'skills/verse-language/SKILL.md'), 'Changed');
      if (mutation === 'path') catalog.skills[0].files[0].path = '../../LICENSE';
      if (mutation === 'source') {
        const lock = JSON.parse(await readFile(join(temporary, 'sources.lock.json'), 'utf8'));
        lock.revision = '0'.repeat(40); await writeFile(join(temporary, 'sources.lock.json'), JSON.stringify(lock));
      }
      if (mutation === 'extra') await writeFile(join(temporary, 'skills/verse-language/extra.txt'), 'Not in manifest');
      await writeFile(catalogPath, JSON.stringify(catalog));
      await assert.rejects(validateCatalog(temporary));
    } finally { await rm(temporary, { recursive: true, force: true }); }
  }
});
test('upstream comparison distinguishes changed, unchanged and invalid responses', () => {
  const a = 'a'.repeat(40), b = 'b'.repeat(40);
  assert.equal(compareRevision(a, { sha: a }).changed, false);
  assert.equal(compareRevision(a, { sha: b }).changed, true);
  assert.throws(() => compareRevision(a, { message: 'Rate limited' }));
});
