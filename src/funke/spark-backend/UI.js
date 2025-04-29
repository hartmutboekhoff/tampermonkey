(function(){
  window.addEventListener('load',()=>{
    
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    window.registerForReadOut('.card', {
      //prefix: 'version 8, ',
      language: 'de-DE',
      extract: node=>([node.querySelector('p'), ': ', node.querySelector('h5')]),
      childElements: {
        h5: {
          replace: {
            pattern: /\./g,
            replacement: ''
          },
        },
        p: {
          language: 'de-DE',
          replace: [
            {pattern:'Authors', replacement:'Autoren'},
            {pattern:'Publication', replacement:''},
            {pattern:'bzv-bz', replacement:'Braunschweiger Zeitung'},
            {pattern:'bzv-hk', replacement:'Harzkurier'},
            {pattern:'bmo', replacement:'Berliner Morgenpost'},
            {pattern:'hao', replacement:'Hamburger Abendblatt'},
            {pattern:'nrw-waz', replacement:'WAZ'},
            {pattern:'nrw-nrz', replacement:'NRZ'},
            {pattern:'nrw-wp', replacement:'WP'},
            {pattern:'nrw-wr', replacement:'WR'},
            {pattern:'nrw-ikz', replacement:'IKZ'},
            {pattern:'mgt-ta', replacement:'Thüringer Allgemeine'},
            {pattern:'mgt-otz', replacement:'OTZ'},
            {pattern:'mgt-tlz', replacement:'TLZ'},
          ]
        }
      }
    });
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
    window.onMutation('input#searchCriteria', {
      runOnLoad: true,
      listeners: {
        input: ev=>{
          const v = ev.target.value;
          const t = v.replaceAll(/\D+/g, ' ').trim(' ');
          if( t != v )
            ev.target.value = t;
          if( /\D/.test(t) )
            ev.target.classList.add('format-error');
          else
            ev.target.classList.remove('format-error');
        },
      }
    });
  
  
    // ================================================


  });
})();