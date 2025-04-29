// ==UserScript==
// @name         SPARK Backend
// @description  UI Verbesserungen für SPARK Backend
// @version      1
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow

// @include      https://backend.sparknews.funkemedien.de/*
// @include      https://backend.sparknews-uat.funkemedien.de/*

// @downloadURL          http://localhost:3000/funke/spark-backend/main.js
// @updateURL            http://localhost:3000/funke/spark-backend/main.js

// @resource  css-common http://localhost:3000/common/styles.css
// @resource  css        http://localhost:3000/funke/spark-backend/styles.css

// @require         http://localhost:3000/common/head.js
// @require         http://localhost:3000/common/utility.js
// @require         http://localhost:3000/common/styles.js
// @require         http://localhost:3000/common/KeyHandler.js
// @require         http://localhost:3000/common/UnifiedSessionStorage.js
// @require         http://localhost:3000/common/readout.js
// @require         http://localhost:3000/common/mutationHandler.js

// @require         http://localhost:3000/funke/spark-backend/UI.js

// ==/UserScript==


console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();