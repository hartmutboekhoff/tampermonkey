(function(){
  window.addEventListener('load',()=>{
    const language = document.getElementsByTagName('html')[0].lang;
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    window.registerForReadOut('code',{
      language:'en-US',
      replace: [
        {pattern: /&&?/, replacement: ' and '},
        {pattern: /\|\|?/, replacement: ' or '},
        {pattern: /===?/, replacement: ' equals '},
        {pattern: '=', replacement: ' is: '},
        {pattern: '.', replacement: ' dot '},
      ]
    });
    window.registerForReadOut('div.comment-body span',{
      exclude:'span.comment-date'
    });

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
  
  
    // ================================================


  });
})();