
// ==UserScript==
// @name     SAP
// @version  1
// @description     Funke Self-Service
// @grant GM_getResourceURL
// @grant GM_getResourceText
// @grant GM_info
// @grant addStyle
// @grant unsafeWindow

// @include               https://dffsg026p43.funkemedien.de:20111/*
// @include               https://dffsg026p43.funkemedien.de:20111/sap/*
// @include               https://dffsg026p43.funkemedien.de:20111/funke/nwbc/nwbc_cockpit/*



// @downloadURL           https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/sap/main.js
// @updateURL             https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/sap/main.js
// @resource  css-common  https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.css
// @resource  css         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/sap/styles.css

// @require               https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/head.js
// @require               https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/utility.js
// @require               https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.js
// @require               https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/KeyHandler.js
// @require               https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/UnifiedSessionStorage.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/readout.js
                          
// @require               https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/sap/UI.js

// ==/UserScript==


console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();