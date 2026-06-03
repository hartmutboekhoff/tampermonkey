// ==UserScript==
// @name         dpa Shop
// @description  UI Verbesserungen für dpa Shop
// @version      1
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow

// @include      https://setup.dpa-sportslive.com/setup/*
// @include      https://setup.dpa-electionslive.com/setup/*

// @downloadURL          http://localhost:3000/funke/dpa-shop/main.js
// @updateURL            http://localhost:3000/funke/dpa-shop/main.js

// @resource  css-common http://localhost:3000/common/styles.css
// @resource  css        http://localhost:3000/funke/dpa-shop/styles.css

// @require         http://localhost:3000/common/head.js
// @require         http://localhost:3000/common/utility.js
// @require         http://localhost:3000/common/styles.js
// @require         http://localhost:3000/common/KeyHandler.js
// @require         http://localhost:3000/common/UnifiedSessionStorage.js
// @require         http://localhost:3000/common/readout.js
// @require         http://localhost:3000/common/mutationHandler.js

// @require         http://localhost:3000/funke/dpa-shop/UI.js

// ==/UserScript==

//GM_sessionStorage(100);

console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();