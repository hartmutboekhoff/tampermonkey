// ==UserScript==
// @name         Microsoft Dokumentation
// @description  UI Verbesserungen f�r Microsoft Dokumentation
// @version      1
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow

// @include      https://vscode-docs.readthedocs.io/*
// @include      https://*.readthedocs.io/*

// @downloadURL          http://localhost:3000/hartmut/ms-docs/main.js
// @updateURL            http://localhost:3000/hartmut/ms-docs/main.js

// @resource  css-common http://localhost:3000/common/styles.css
// @resource  css        http://localhost:3000/hartmut/ms-docs/styles.css

// @require         http://localhost:3000/common/head.js
// @require         http://localhost:3000/common/utility.js
// @require         http://localhost:3000/common/styles.js
// @require         http://localhost:3000/common/KeyHandler.js
// @require         http://localhost:3000/common/readout.js

// @require         http://localhost:3000/hartmut/ms-docs/UI.js

// ==/UserScript==


console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();