(function(){
  let customLanguage = undefined;

  function getLanguage() {return customLanguage; }
  function selectLanguage() {
    showSelectLanguageDialog().then(lang=>customLanguage=lang??language);
  }
  function showSelectLanguageDialog() {
    return new Promise((resolve,reject)=>{
      const dlg = document.createElement('dialog');
      dlg.id = 'GM-hbo-language-selector';
      dlg.innerHTML = `
<h1>Sprache auswählen</h1>
<div class="dialog-body">
  <select id="lang">
    <option value="de-DE">deutsch</option>
    <option value="en-US">englisch</option>
  </select>
  <div class="buttons">
    <button id="cancel">Abbrechen</button>
    <button id="ok">Ok</button>
  </div>
</div>
      `;
      const [langOpt, cancelBtn, okBtn] = dlg.querySelectorAll('#lang, #cancel, #ok');
      if( customLanguage )
        langOpt.value = customLanguage;
      let language = langOpt.value;

      document.body.appendChild(dlg);
      dlg.addEventListener('close', ()=>{
        resolve(language)
        document.body.removeChild(dlg);
      });
      okBtn.addEventListener('click', ()=>{
        language = langOpt.value;
        dlg.close();
      });
      cancelBtn.addEventListener('click', ()=>{
        language = undefined;
        dlg.close();
      });
      langOpt.addEventListener('keydown', ev=>{
        if( ev.code == 'Enter' || ev.code == 'NumpadEnter' ) {
          language = langOpt.value;
          dlg.close();
        }
      });
      
      dlg.showModal();
    });
  }
  
  
  window.addEventListener('load',()=>{
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
    window.addKeyHandler('Alt+KeyL', selectLanguage, {excludeFormFields:false});
  
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    window.registerForReadOut('h1,h2,h3,h4,p,ul,ol,label,button,th,td,article,legend,option', {language: getLanguage});
    window.registerForReadOut('figure',{
      language: getLanguage,
      extract: node=>node.getElementsByTagName('figcaption'),
    });
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
  
  
    // ================================================


  });
})();