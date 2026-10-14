// Switches the userscript headers in src/ between the local dev server and GitHub.
// usage: node tools/switch-host.js github|local

const fs = require('fs');
const path = require('path');

const HOSTS = {
  local:  'http://localhost:3000/',
  github: 'https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/',
};

const target = process.argv[2];
if( !HOSTS[target] ) {
  console.error('usage: node tools/switch-host.js ' + Object.keys(HOSTS).join('|'));
  process.exit(1);
}
const from = HOSTS[target === 'github' ? 'local' : 'github'];
const to = HOSTS[target];

const SRC = path.join(__dirname, '..', 'src');
const HEADER = /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/;

function* walk(dir) {
  for( const entry of fs.readdirSync(dir, { withFileTypes:true }) ) {
    const full = path.join(dir, entry.name);
    if( entry.isDirectory() ) yield* walk(full);
    else if( entry.name.endsWith('.js') ) yield full;
  }
}

let changed = 0;
for( const file of walk(SRC) ) {
  // latin1 keeps every byte as-is, so non-UTF-8 files survive the round trip
  const text = fs.readFileSync(file, 'latin1');
  const updated = text.replace(HEADER, header => header.split(from).join(to));
  if( updated !== text ) {
    fs.writeFileSync(file, updated, 'latin1');
    console.log('  ' + path.relative(SRC, file));
    changed++;
  }
}
console.log(`${changed} file(s) switched to ${target} (${to})`);
