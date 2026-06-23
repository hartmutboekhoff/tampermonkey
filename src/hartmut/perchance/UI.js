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
  let ispCheckRunning = false;
  async function monitorSaveISP() {
    async function doCheck() {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      
      console.log('connection data:', data);
      const saveProviders = ['Deutsche Telekom AG', 'Datacamp Limited'];
      if( saveProviders.includes(data.org) ) {
        console.log('connection green');
        document.body.classList.remove('attention-wrong-isp');
      }
      else {
        console.log('connection yellow');
        alert(`Provider ${data.org} may not be save!`);
        document.body.classList.add('attention-wrong-isp');
        console.log('save providers: ', saveProviders);
      }      
    }
    
    if( ispCheckRunning ) return;
    ispCheckRunning = true;
    console.group('GM checking ISP');
    try {
      await doCheck();
    }
    catch(e) {
      console.error('ERROR checking isp', e);
    }
    console.groupEnd();
    ispCheckRunning = false;
  }
  function anoyUser() {
    [...document.querySelectorAll('textarea')].forEach(t=>t.value = '');
    setTimeout(()=>document.body.remove(), 200);
    for( let i = 0 ; i < localStorage.length ; i++ ) {
      const k = localStorage.key(i);
      if( !k.startsWith('usage_') )
        localStorage.removeItem(k);
    }
    for( let i = 0 ; i < sessionStorage.length ; i++ ) {
      sessionStorage.removeItem(sessionStorage.key(i));
    }
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    
  }
  
  window.addEventListener('load',()=>{
    
    if( location.href.startsWith('https://perchance.org/') )
      initializeUsageTracking([
        {threshold: 0, interval: 60, warn: false},
        {threshold: 15, interval: 60, warn: true},
        {threshold: 25, interval: 30, warn:  true},
        {threshold: 30, interval: 10, warn: true},
        {threshold: 33, interval: 10, warn: true, action: anoyUser},
      ]);
    
    window.addEventListener('click', ev=>{
      if( ev.target.nodeName != 'IMG' || ev.target.id == GM_DownloadButtonId ) return;
      const imgs = document.getElementsByTagName('img');

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
    if( window.location.href.startsWith('https://perchance.org/ai-') ) {
      window.setInterval(monitorSaveISP, 120*1000);
      monitorSaveISP();
    }
      
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //GM_sessionStorage.setItem('language', 'de-DE');
    //window.registerForReadOut('selector');
    window.registerForReadOut('TEXTAREA', {excludeFormFields:false, language: 'en-US'});
    window.registerForReadOut('div.imageCtn', {
      extract: node=>node.dataset.prompt,
      language: 'en-US'
    });
    window.registerForReadOut('div#outputEl', {language: 'en-US'});



    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
  
  
    // ================================================


  });
})();