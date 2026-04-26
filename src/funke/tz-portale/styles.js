console.log('%cDEPRECATED /funke/tz-portale/styles.js', 'background-color: red, color: white; font-size: 200%;');

console.log('HBo Tampermonkey', 'styles.js', 'Version '+GM_info.script.version);

function addStyle(css) {
  const s = document.createElement('style');
  s.innerHTML = css;
  s.id = "hartmut-style"
  document.head.appendChild(s);
}
addStyle(GM_getResourceText('css'));

console.log('HBo Tampermonkey', 'styles.js', 'Syntax Ok');