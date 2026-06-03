(function(){
  window.addEventListener('load',()=>{
    
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //GM_sessionStorage.setItem('language', 'de-DE');
    //window.registerForReadOut('selector');
    window.registerForReadOut('div.description');
    window.registerForReadOut('select');
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
  
  
    // ================================================


  });
})();