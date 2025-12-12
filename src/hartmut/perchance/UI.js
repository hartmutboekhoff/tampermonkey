(function(){
  const GM_DownloadButtonId = 'GM_DownloadButton';
  function dateToFilename(d) {
    if( !d ) d = new Date();
    return [d.getFullYear(),
            d.getMonth()+1,
            d.getDate(),
            d.getHours(),
            d.getMinutes(),
            d.getSeconds(),
            d.getMilliseconds()
           ]
           .map((v,ix)=>('00'+v).slice(ix==0?-4:ix==6?-3:-2))
           .join('-');
  }
  
  window.addEventListener('load',()=>{
    
    
    window.addEventListener('click', ev=>{
      if( ev.target.nodeName != 'IMG' || ev.target.id == GM_DownloadButtonId ) return;
      const imgs = document.getElementsByTagName('img');
console.log(imgs);
      if( imgs?.[0] ) {
        const l = document.getElementById(GM_DownloadButtonId) ?? document.createElement('a');
        if( l.id != GM_DownloadButtonId ) {
          console.log('creating download-link');
          l.id = GM_DownloadButtonId;
          l.href = imgs[0].src;
          l.download = dateToFilename();
          l.innerText = "Hier klicken";
          document.body.appendChild(l);
          document.body.classList.add('downloaded');
        }
        else
          console.log('download link present', l.download);
        l.click();
        //document.body.removeChild(l);
      }
    });
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //GM_sessionStorage.setItem('language', 'de-DE');
    //window.registerForReadOut('selector');
    

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
  
  
    // ================================================


  });
})();