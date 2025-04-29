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
    window.onMutation('a[href^="https://cue.funke.cue.cloud/"]', {
      runOnLoad: true,
      listeners: {
        click: ev=>{
          ev.preventDefault();
          ev.stopPropagation();
          
          navigator.clipboard.writeText(ev.target.href)
            .then(result=>{
              const oldBg = ev.target.style.backgroundColor;
              ev.target.style.backgroundColor = '#8f4';
              ev.target.style.transition = '';
              window.setTimeout(()=>{
                ev.target.style.backgroundColor = oldBg;
                ev.target.style.transition = 'background-color 2s ease-in-out 0.5s';
              }, 1000);
            })
            .catch(reason=>{
              ev.target.style.backgroundColor = '#f44';
              console.log(reason);
            });
        }
      }
    });    

    // ================================================


  });
})();