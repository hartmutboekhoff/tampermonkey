
// ==UserScript==
// @name         Funke Abwesenheitsmeldung
// @description  UI Verbesserungen für Funke Abwesenheitsmeldung
// @version      1
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_info
// @grant        addStyle
// @grant        unsafeWindow

// @include      https://forms.office.com/pages/responsepage.aspx?id=B1LbIxNmmUuH7QmY_PnleBSX8XFz_RBGvWIH-2OKxrpUM1ZMUE1BQkY0STdTUERDMzRIWE1ENVk0Qi4u
// @include      https://forms.cloud.microsoft/pages/responsepage.aspx?id=B1LbIxNmmUuH7QmY_PnleBSX8XFz_RBGvWIH-2OKxrpUM1ZMUE1BQkY0STdTUERDMzRIWE1ENVk0Qi4u



// @downloadURL          https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/abwesenheitsmeldung/main.user.js
// @updateURL            https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/abwesenheitsmeldung/main.user.js

// @resource  css-common https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.css
// @resource  css        https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/abwesenheitsmeldung/styles.css

// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/head.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/utility.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/styles.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/KeyHandler.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/UnifiedSessionStorage.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/readout.js
// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/common/mutationHandler.js

// @require         https://raw.githubusercontent.com/hartmutboekhoff/tampermonkey/version-2/src/funke/abwesenheitsmeldung/UI.js

// ==/UserScript==


console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'Initialization complete');
console.groupEnd();