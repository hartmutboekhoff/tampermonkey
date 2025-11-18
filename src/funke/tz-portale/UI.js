(function(){
  window.addEventListener('load',()=>{


    function toggleBodyClass(c) {
      document.body.classList.toggle(c);
    }
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
    window.addKeyHandler('Ctrl+Space',ev=>{
      console.log('toggle debug-compact');
      document.body.classList.toggle('debug-compact')
      console.log('done toggle debug-compact');
    },{excludeFormFields:false});
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
    window.onMutation('#pageInfosContainer .show-type, .debug-component .show-type', {
      listeners: {
        click: ev=>ev.target.closest('#pageInfosContainer, .debug-component')?.classList.toggle('show-anyway'),
      },
      runOnLoad: true
    });
    window.onMutation('a[href^="https://cue.funke.cue.cloud/"]', {
      runOnLoad: true,
      listeners: {
        click: ev=>{
          ev.preventDefault();
          ev.stopPropagation();

          const oldArticleIdPattern = /https:\/\/cue\.funke\.cue\.cloud\/cue-web\/#\/main\?uri=\/webservice\/escenic\/content\/2\d{8}/;
          if( oldArticleIdPattern.test(ev.target.href) ) {
            blinkElement(ev.target, {backgroundColor:'#ff4', textDecoration:'line-through'}, 30000);
          }
          else {
            navigator.clipboard.writeText(ev.target.href)
              .then(result=>blinkElement(ev.target, '#8f4', 30000))
              .catch(reason=>{
                blinkElement(ev.target, '#f44');
                console.log(reason);
              });
          }
        }
      }
    });    

    // ================================================


  });
})();