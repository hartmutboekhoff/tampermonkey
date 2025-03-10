(function(){
  window.addEventListener('load',()=>{
    const language = document.getElementsByTagName('html')[0].lang;
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    window.registerForReadOut('h1,h2,h3,h4,p,ul,ol,label,button',{language});
    window.registerForReadOut('figure',{
      language,
      extract: node=>node.getElementsByTagName('figcaption'),
    });
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
  
  
    // ================================================


  });
})();