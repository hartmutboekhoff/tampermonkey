(function(){
  window.addEventListener('load',()=>{
    
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //GM_sessionStorage.setItem('language', 'de-DE');
    //window.registerForReadOut('selector');
    window.registerForReadOut('db-list-row', {
      extract: node=>[
        node.querySelector('[data-test="transactionType"]'),
        node.querySelector('[data-test="entryDate"]'),
        node.querySelector('[data-test="counterPartyName"]'),
        node.querySelector('[data-test="amount" ]')
      ],
      childElements: {
        'div[data-test="counterPartyName"]': {
          
        },
        'db-list-row-content[data-test="transactionType"]': {
        },
        'div[data-test="entryDate"]': {
          
        },
        'db-list-row-content[data-test="amount" ] db-banking-decorated-amount': {
          extract: node=>node.innerText.replaceAll(/\.|,00/g,''),
        },
      }
    });
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
  
  
    // ================================================


  });
})();