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

// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow
// @sandbox      raw

// @resource  css-common   http://localhost:3000/common/styles.css
// @resource  css          http://localhost:3000/funke/tz-portale/styles.css

// @require         http://localhost:3000/common/head.js
// @require         http://localhost:3000/common/utility.js
// @require         http://localhost:3000/common/styles.js
// @require         http://localhost:3000/common/KeyHandler.js
// @require         http://localhost:3000/common/UnifiedSessionStorage.js
// @require         http://localhost:3000/common/readout.js
// @require         http://localhost:3000/common/mutationHandler.js


// @require         http://localhost:3000/funke/tz-portale/UI.js
// @require         http://localhost:3000/funke/tz-portale/tools.js

// ==/UserScript==

console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();