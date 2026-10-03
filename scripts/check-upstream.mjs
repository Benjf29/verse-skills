import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

export function compareRevision(pinned, response) {
  if (!/^[a-f0-9]{40}$/.test(pinned) || !response || !/^[a-f0-9]{40}$/.test(response.sha)) throw new Error('Invalid upstream revision');
  return { pinned, upstream: response.sha, changed: response.sha !== pinned,
    compare: `https://github.com/verselang/book/compare/${pinned}...${response.sha}` };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.length !== 2) throw new Error('Usage: node scripts/check-upstream.mjs');
  const lock = JSON.parse(await readFile(new URL('../sources.lock.json', import.meta.url), 'utf8'));
  const response = await fetch('https://api.github.com/repos/verselang/book/commits/main', {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'verse-skills-maintainer' },
    redirect: 'error', signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Upstream check unavailable: HTTP ${response.status}`);
  console.log(JSON.stringify(compareRevision(lock.revision, await response.json()), null, 2));
  // A changed revision is information, never permission to replace the curated content.
}
