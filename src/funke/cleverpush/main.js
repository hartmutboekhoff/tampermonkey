// ==UserScript==
// @name         Cleverpush
// @description  UI Verbesserungen für Cleverpush
// @version      1
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow

// @include      https://app.cleverpush.com/*

// @downloadURL          https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/cleverpush/main.js
// @updateURL            https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/cleverpush/main.js

// @resource  css-common https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.css
// @resource  css        https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/cleverpush/styles.css

// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/head.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/utility.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/KeyHandler.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/UnifiedSessionStorage.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/readout.js

// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/cleverpush/UI.js

// ==/UserScript==

//GM_sessionStorage(100);

console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();