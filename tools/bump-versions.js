// Called by .githooks/pre-commit.
// Bumps @version in main.user.js for every script whose folder has staged changes;
// staged changes in src/common/ bump all scripts.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const git = (args, input) => execFileSync('git', args, { encoding:'utf8', input });
const tryGit = args => { try { return git(args); } catch { return null; } };

const SCRIPT = 'main.user.js';
const COMMON = 'src/common/';
const SKIP = ['src/template/'];
const VERSION = /^(\/\/ @version\s+)(\S+)/m;

if( fs.existsSync(git(['rev-parse', '--git-path', 'MERGE_HEAD']).trim()) ) process.exit(0);
if( tryGit(['rev-parse', '--verify', '-q', 'HEAD']) === null ) process.exit(0);

const staged = git(['diff', '--cached', '--name-only', '--no-renames', '-z']).split('\0').filter(Boolean);
const scripts = git(['ls-files', '-z', 'src']).split('\0')
  .filter(f => path.posix.basename(f) === SCRIPT && !SKIP.some(s => f.startsWith(s)));

const targets = new Set();
for( const file of staged ) {
  if( file.startsWith(COMMON) ) {
    scripts.forEach(s => targets.add(s));
    continue;
  }
  // nearest script folder containing the file
  const owner = scripts
    .filter(s => file.startsWith(s.slice(0, -SCRIPT.length)))
    .sort((a,b) => b.length - a.length)[0];
  if( owner ) targets.add(owner);
}

const increment = v => v.replace(/(\d+)(?!.*\d)/, n => String(Number(n) + 1));

let bumped = 0;
for( const script of [...targets].sort() ) {
  const before = tryGit(['show', 'HEAD:' + script]);
  if( before === null ) continue;                        // new script
  const index = git(['show', ':' + script]);
  const oldVersion = (index.match(VERSION) || [])[2];
  if( !oldVersion || !/\d/.test(oldVersion) ) {
    console.warn(`bump-versions: no numeric @version in ${script}, skipped`);
    continue;
  }
  if( oldVersion !== (before.match(VERSION) || [])[2] ) continue;   // already bumped by hand
  const newVersion = increment(oldVersion);

  // update the staged content directly, so unstaged edits stay unstaged
  const blob = git(['hash-object', '-w', '--stdin', '--path', script], index.replace(VERSION, '$1' + newVersion)).trim();
  const mode = git(['ls-files', '-s', '--', script]).split(' ')[0];
  git(['update-index', '--cacheinfo', `${mode},${blob},${script}`]);

  // and the working tree, so it doesn't show the old version as a change
  const work = fs.existsSync(script) ? fs.readFileSync(script, 'utf8') : null;
  if( work && (work.match(VERSION) || [])[2] === oldVersion )
    fs.writeFileSync(script, work.replace(VERSION, '$1' + newVersion), 'utf8');

  console.log(`bump-versions: ${script} ${oldVersion} -> ${newVersion}`);
  bumped++;
}

if( bumped && fs.existsSync('README.md') ) {
  execFileSync(process.execPath, [path.join(__dirname, 'build-readme.js')], { stdio:'ignore' });
  git(['add', 'README.md']);
}
