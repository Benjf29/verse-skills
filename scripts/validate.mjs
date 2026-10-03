import { createHash } from 'node:crypto';
import { readFile, lstat, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';

export const skillIds = ['verse-language', 'verse-types-and-data', 'verse-failure-and-effects', 'verse-concurrency', 'verse-architecture', 'verse-persistence', 'verse-debugging'];
const hash = text => createHash('sha256').update(text).digest('hex');
const relativePath = /^(?:[a-zA-Z0-9_-]+\/){0,4}[a-zA-Z0-9_-]+(?:\.(?:md|json|txt))?$/;

/** Purely local validation. Never runs a script supplied by a skill. */
export async function validateCatalog(root) {
  const catalog = JSON.parse(await readFile(resolve(root, 'catalog.json'), 'utf8'));
  const lock = JSON.parse(await readFile(resolve(root, 'sources.lock.json'), 'utf8'));
  if (catalog.schemaVersion !== 1 || catalog.name !== 'verse-skills' ||
      catalog.repository !== 'https://github.com/Benjf29/verse-skills' || catalog.license !== 'MIT AND CC0-1.0' ||
      !/^\d+\.\d+\.\d+$/.test(catalog.version) || !Array.isArray(catalog.skills) ||
      JSON.stringify(catalog.skills.map(s => s.id)) !== JSON.stringify(skillIds)) throw new Error('Invalid Verse catalog');
  if (lock.repository !== 'https://github.com/verselang/book' || !/^[a-f0-9]{40}$/.test(lock.revision) || lock.license !== 'CC0-1.0') throw new Error('Invalid upstream lock');
  let characters = 0;
  for (const skill of catalog.skills) {
    if (skill.entrypoint !== 'SKILL.md' || !skill.name || skill.name.length > 100 || !skill.description || skill.description.length > 500 ||
        !Array.isArray(skill.files) || skill.files.length > 64 || new Set(skill.files.map(f => f.path)).size !== skill.files.length) throw new Error(`Invalid skill: ${skill.id}`);
    const paths = skill.files.map(f => f.path), folder = resolve(root, 'skills', skill.id);
    for (const required of ['SKILL.md', 'sources.json', 'LICENSE', 'references/BOOK-LICENSE.txt']) if (!paths.includes(required)) throw new Error(`Missing ${required}`);
    for (const file of skill.files) {
      if (!relativePath.test(file.path) || !/^[a-f0-9]{64}$/.test(file.sha256)) throw new Error('Invalid file path or hash');
      let parent = folder;
      for (const part of file.path.split('/')) {
        parent = resolve(parent, part);
        if ((await lstat(parent)).isSymbolicLink()) throw new Error('Symlink not allowed');
      }
      if (!(await lstat(parent)).isFile()) throw new Error('Regular file required');
      const content = await readFile(parent, 'utf8');
      if (content.length > 100_000 || hash(content) !== file.sha256) throw new Error(`Content mismatch: ${skill.id}/${file.path}`);
      if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(content)) throw new Error('Control character');
      if (/\/Users\/|C:\\Users\\|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{20}/.test(content)) throw new Error('Private or machine-specific content');
      characters += content.length;
      if (file.path.endsWith('.md')) for (const [, link] of content.matchAll(/\]\(([^)]+)\)/g)) {
        if (link.startsWith('https://') || link.startsWith('#')) continue;
        const target = resolve(dirname(parent), link.split('#')[0]);
        if (!paths.some(path => resolve(folder, path) === target)) throw new Error(`Broken local reference: ${link}`);
      }
    }
    const text = await readFile(resolve(folder, 'SKILL.md'), 'utf8');
    if (!text.startsWith(`---\nname: ${skill.id}\ndescription: ${skill.description}\n---\n`)) throw new Error('Frontmatter mismatch');
    const source = JSON.parse(await readFile(resolve(folder, 'sources.json'), 'utf8'));
    if (source.repository !== lock.repository || source.revision !== lock.revision || source.license !== lock.license ||
        source.compatibility !== 'language-reference-only' || source.uefnCompiled !== false || !source.files.length) throw new Error('Unqualified source');
    for (const file of source.files) if (!lock.files.some(f => JSON.stringify(f) === JSON.stringify(file))) throw new Error('Unpinned source');
    const actual = await readdir(folder, { recursive: true, withFileTypes: true });
    if (actual.filter(f => f.isFile()).length !== paths.length || actual.some(f => f.isSymbolicLink())) throw new Error('Unlisted skill files');
  }
  return { catalog, characters };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.length !== 2) throw new Error('Usage: node scripts/validate.mjs');
  const result = await validateCatalog(fileURLToPath(new URL('..', import.meta.url)));
  console.log(`${result.catalog.skills.length} skills validated, ${result.characters} content characters. No Verse compiler invoked.`);
}
