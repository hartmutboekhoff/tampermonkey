const COMMON_VERSION='5';

console.group('greasemonkey', GM_info.script.name, location.origin);
console.log(GM_info.script.name, 'Version '+GM_info.script.version);
console.log(location.origin, location.pathName);
console.log('Loaded resources', GM_info.script.resources.map(({name,url})=>({name, url})));




