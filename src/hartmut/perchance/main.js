// ==UserScript==
// @name         Perchance
// @description  UI Verbesserungen für Perchance
// @version      1
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow

// @include      https://perchance.org/*
// @include      https://*.perchance.org/*
// @include      https://image-generation.perchance.org/*
// @include      https://*.perchance.org/*
// @include      https://perchance.org/*
// @include      perchance.org/*



// @downloadURL          http://localhost:3000/hartmut/perchance/main.js
// @updateURL            http://localhost:3000/hartmut/perchance/main.js

// @resource  css-common http://localhost:3000/common/styles.css
// @resource  css        http://localhost:3000/hartmut/perchance/styles.css

// @require         http://localhost:3000/common/head.js
// @require         http://localhost:3000/common/utility.js
// @require         http://localhost:3000/common/styles.js
// @require         http://localhost:3000/common/KeyHandler.js
// @require         http://localhost:3000/common/UnifiedSessionStorage.js
// @require         http://localhost:3000/common/readout.js

// @require         http://localhost:3000/hartmut/perchance/UI.js

// ==/UserScript==

//GM_sessionStorage(100);

console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();