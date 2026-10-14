// Regenerates the script list in README.md from the userscript headers in src/.
// usage: node tools/build-readme.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const README = path.join(ROOT, 'README.md');
const BASE = 'https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/';
const START = '<!-- scripts:start -->';
const END = '<!-- scripts:end -->';
const SKIP = ['template'];

// most sources are latin1, some utf-8
function decode(buffer) {
  try { return new TextDecoder('utf-8', { fatal:true }).decode(buffer); }
  catch { return buffer.toString('latin1'); }
}

function readHeader(file) {
  const text = decode(fs.readFileSync(file));
  const header = (text.match(/\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/) || [])[1] || '';
  const value = key => ((header.match(new RegExp('^// @' + key + '\\s+(.*)$', 'm')) || [])[1] || '').trim();
  return { name:value('name'), description:value('description'), version:value('version') };
}

function* findScripts(dir) {
  for( const entry of fs.readdirSync(dir, { withFileTypes:true }) ) {
    const full = path.join(dir, entry.name);
    if( entry.isDirectory() ) yield* findScripts(full);
    else if( entry.name.endsWith('.user.js') ) yield full;
  }
}

const groups = {};
for( const file of findScripts(SRC) ) {
  const rel = path.relative(SRC, file).split(path.sep).join('/');
  const group = rel.split('/')[0];
  if( SKIP.includes(group) ) continue;
  (groups[group] = groups[group] || []).push({ ...readHeader(file), url:BASE + rel });
}

const escape = s => s.replace(/\|/g, '\\|');
let list = '';
for( const group of Object.keys(groups).sort() ) {
  list += `\n### ${group}\n\n| Script | Description | Version | |\n|---|---|---|---|\n`;
  for( const s of groups[group].sort((a,b) => a.name.localeCompare(b.name)) )
    list += `| ${escape(s.name)} | ${escape(s.description)} | ${s.version} | [Install / update](${s.url}) |\n`;
}
const block = `${START}\n${list}\n${END}`;

const readme = fs.existsSync(README) ? fs.readFileSync(README, 'utf8') : `${START}\n${END}\n`;
if( !readme.includes(START) || !readme.includes(END) ) {
  console.error(`README.md is missing the ${START} / ${END} markers`);
  process.exit(1);
}
const updated = readme.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
if( updated !== readme ) {
  fs.writeFileSync(README, updated, 'utf8');
  console.log('README.md updated');
}
else console.log('README.md is up to date');
