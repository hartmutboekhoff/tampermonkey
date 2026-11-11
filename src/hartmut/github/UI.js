(function(){
  window.addEventListener('load',()=>{
    
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    window.registerForReadOut('.review-comment task-lists',{language:'de-DE'});
    window.registerForReadOut('[data-component="text"]',{language:'de-DE'});
    window.registerForReadOut('div[data-component="PageHeader.Description"] div[class*="summaryContainer"]', {
      language:'de-DE',
      replace: {
        pattern: /\buat\b/i,
        replacement: 'U A T ',
      },
      exclude: '[data-component="Tooltip"]'
    });
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
    // copy Link to Clipboard
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