(function(){
  const GM_DownloadButtonId = 'GM_DownloadButton';
  
  function getAllowedSchedule() {
    WorkingHours = [
      {threshold: 0, interval: 60, warn: false},
      {threshold: 15, interval: 60, warn: true},
      {threshold: 22, interval: 30, warn:  true},
      {threshold: 28, interval: 10, warn: true},
      {threshold: 30, interval: 10, warn: true, action: anoyUser},
    ];
    OffHours = [
      {threshold: 0, interval: 300, warn: false},
      {threshold: 60, interval: 300, warn: true},
      {threshold: 90, interval: 60, warn:  true},
      {threshold: 120, interval: 30, warn: true},
      {threshold: 150, interval: 10, warn: true},
    ];
    Weekend = [
      {threshold: 0, interval: 300, warn: false},
      {threshold: 60, interval: 300, warn: true},
      {threshold: 120, interval: 60, warn:  true},
      {threshold: 180, interval: 30, warn: true},
    ];
    
    const now = new Date();
    const d = now.getDay();
    const h = now.getHours();
    return d == 0  || d == 6
            ? Weekend
            : h < 8 || h > 19 
            ? OffHours
            : WorkingHours;
  }
  
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
      initializeUsageTracking(getAllowedSchedule());
    
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
    window.registerForReadOut('#resultImgEl', {
      language: 'en-US',
      readHidden: true,
      extract: node=>{
        const extractRx = /prompt=([\s\S]*?)negativePrompt=([\s\S]*?)guidanceScale=([\s\S]*?)seed=([\s\S]*)/;;
        const [,p,n,g,s] = node.title.match(extractRx);
        return p ?? 'no prompt found';
      }
    });
    window.registerForReadOut('.sectionLabel', {language: 'en-US'});

    window.registerForReadOut('body>div>textarea', {language: 'en-US'});
    window.registerForReadOut('.thread', {
      exclude: ['.characterEditButton'],
      extract: node=>node.querySelectorAll('.name, .characterName'),
      language: 'en-US'
    });
    window.registerForReadOut('.charCard .body .name, .charCard .body .desc', {language: 'en-US'});


    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
    window.onMutation({
      '#contentGuardSettingsEl': {
        runOnLoad: true,
        callback: el=>{
          const opt = el.querySelector('option[value="315360000000"]');
          if( opt ) opt.selected = true;
          const over18 = el.querySelector('#contentGuardOver18CheckboxEl');
          if( over18 ) over18.checked = true;
          const btn = el.querySelector('button');
          btn?.click();

  console.log('hbo_bm', 'just click now', btn);
        }
      },
      'iframe.text-to-image-plugin-image-iframe~div': {
        callback: el=>{
          if( location.pathname != '/ai-character-chat' ) return console.log('not showing button in ', location.pathname);
          if( el.hasOpenInGeneratorButton ) return;
          const btn3 = document.createElement('button');
          btn3.setAttribute('style', 'position: relative; top: -15px; cursor: pointer; margin-left: 1rem; background-color:#8ae;');
          btn3.innerText = 'Generator';
          btn3.onclick = ()=>{
            const url = new URL(btn3.parentElement.previousElementSibling.src);
            const json = JSON.parse(decodeURIComponent(url.hash).slice(1));
            json.timeIndex = (new Date()).valueOf();
            const hash = encodeURIComponent(JSON.stringify(json));
            window.open(`https://perchance.org/ai-text-to-image-generator#${hash}`);
          };
          el.appendChild(btn3);
          el.hasOpenInGeneratorButton = true;
          
        }
      },
      '.removeAllBlursCheckbox': {
        runOnLoad: true,
        callback: el=>{
          el.checked = true;
        }
      },
      'textarea.paragraph-input[data-name="description"]': {
        runOnLoad: true,
        callback: el=>{
          if( location.hash.length <= 1 ) return;
          const json = JSON.parse(decodeURIComponent(location.hash.slice(1)));
          const now = (new Date()).valueOf();
          if( now - json.timeIndex < 10000 && json.prompt && json.prompt != '' )
            window.setTimeout(()=>{
              if( !json.negativePrompt && json.negativePrompt != '' )
                el.value = `${json.prompt} \n(negativePrompt:::${json.negativePrompt})`;
              else
                el.value = `${json.prompt}`;
            }, 1000);
        }
      },
      'select[data-name="artStyle"]': {
        runOnLoad: true,
        callback: el=>{
          if( location.hash.length > 1 ) {
            const json = JSON.parse(decodeURIComponent(location.hash.slice(1)));
            const now = (new Date()).valueOf();
            if( now - json.timeIndex < 10000 && json.prompt && json.prompt != '' )
              window.setTimeout(()=>{
                el.value="ref:optionKeyName:𝗡𝗼 𝘀𝘁𝘆𝗹𝗲";          
              }, 1000);            
          }
          else if( el.value == "ref:optionKeyName:Painted Anime" ) {
            window.setTimeout(()=>{
              el.value="ref:optionKeyName:Professional Photo";
            }, 1000);
          }
        }
      },
      'select[data-name="numImages"]': {
        runOnLoad: true,
        callback: el=>{
          if( el.hasExtendedOptions ) return;
          function createOption(n) {
            const opt = document.createElement('option');
            opt.value = n;
            opt.innerText = n;
            return opt;
          }
          el.append(createOption(64));
          el.append(createOption(128));
          el.hasExtendedOptions = true;
        }
      }
    });
  
  
    // ================================================


  });
})();