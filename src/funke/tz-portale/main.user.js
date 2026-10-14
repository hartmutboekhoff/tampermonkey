// ==UserScript==
// @name         Funke Portale
// @version      6
// @namespace    http://hartmut-boekhoff.de
// @description  Printout Debug-Info for Funke News
// @author       Hartmut Boekhoff

// @match        https://*.waz.de
// @match        https://*.waz.de/*
// @match        https://*.nrz.de
// @match        https://*.nrz.de/*
// @match        https://*.wp.de
// @match        https://*.wp.de/*
// @match        https://*.wr.de
// @match        https://*.wr.de/*
// @match        https://*.ikz-online.de
// @match        https://*.ikz-online.de/*
// @match        https://*.morgenpost.de
// @match        https://*.morgenpost.de/*
// @match        https://*.abendblatt.de
// @match        https://*.abendblatt.de/*
// @match        https://*.thueringer-allgemeine.de
// @match        https://*.thueringer-allgemeine.de/*
// @match        https://*.otz.de
// @match        https://*.otz.de/*
// @match        https://*.tlz.de
// @match        https://*.tlz.de/*
// @match        https://*.braunschweiger-zeitung.de
// @match        https://*.braunschweiger-zeitung.de/*
// @match        https://*.harzkurier.de
// @match        https://*.harzkurier.de/*
// @match        https://*.talzeit.de
// @match        https://*.talzeit.de/*


// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow
// @sandbox      raw

// @downloadURL          https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/tz-portale/main.user.js
// @updateURL            https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/tz-portale/main.user.js

// @resource  css-common   https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.css
// @resource  css          https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/tz-portale/styles.css

// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/head.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/utility.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/KeyHandler.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/UnifiedSessionStorage.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/readout.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/mutationHandler.js


// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/tz-portale/UI.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/tz-portale/tools.js

// ==/UserScript==

console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();