// ==UserScript==
// @name     Helpdesk UI
// @version  9
// @description     Helpdesk UI
// @grant GM_getResourceURL
// @grant GM_getResourceText
// @grant GM_info
// @grant addStyle
// @grant unsafeWindow
// @include         https://helpline.funkemedien.de/ServicewareProcesses/processes
// @include         https://helpline.funkemedien.de/WebDesk/WebForms/*
// @include         https://helpline.funkemedien.de/WebDesk/*
// @include         https://helpline.funkemedien.de/ServicewareProcesses/tasks
// @include         https://helpline.funkemedien.de/WebDesk/Task/TaskDialog
// @include         https://helpline.funkemedien.de/WebDesk/Task/TaskDialog?*
// @include         https://helpline.funkemedien.de/auth/*

// @downloadURL            https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/helpdesk/main.js
// @updateURL              https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/helpdesk/main.js
// @resource  css-common   https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.css
// @resource  css          https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/helpdesk/styles.css

// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/head.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/utility.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/KeyHandler.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/UnifiedSessionStorage.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/readout.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/mutationHandler.js

// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/helpdesk/UI.js

// ==/UserScript==


console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();