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
    });
  
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

    // ================================================


  });
})();