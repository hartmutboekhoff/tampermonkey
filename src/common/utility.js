function getComments(rootNode) {
  function commentsRecursive(node) {
    if( node.nodeType == 8 )
      return [node];
    else if( node.childNodes?.length > 0 )
      return [...node.childNodes].map(n=>commentsRecursive(n));
    else
      return undefined;
  }
  rootNode ??= document;
  return commentsRecursive(rootNode).flat(Infinity).filter(n=>!!n);
}

function wildcardToRegExp(pattern) {
  return new RegExp('^'+pattern.replaceAll(/[.*?()\[\]{}^$|\\]/g,m=>({'*':'.*','?':'.'}[m]??'\\'+m))+'$');
}



function parseDate(dateText,format,centuryBreak) {
  const Formats = {
    'dd.MM.[yy]yy hh:mm:ss': /(?<D>\d{2})\.(?<M>\d{2})\.(?<Y>\d{2,4})\s+(?<h>\d{1,2}):(?<m>\d{2})(:(?<s>\d{2}))?/,
    '[yy]yy/MM/dd hh:mm:ss PM|AM': /(?<Y>\d{2,4})\/(?<M>\d{2})\/(?<D>\d{2})\s+(?<h>\d{1,2}):(?<m>\d{2})(:(?<s>\d{2}))?\s*(?<ampm>PM|AM)?/,
    'MM/dd/yyyy hh:mm:ss PM|AM': /(?<M>\d{2})\/(?<D>\d{2})\/(?<Y>\d{4})\s+(?<h>\d{1,2}):(?<m>\d{2})(:(?<s>\d{2}))?\s*(?<ampm>PM|AM)?/,
    'MM/dd/yyyy': /(?<M>\d{2})\/(?<D>\d{2})\/(?<Y>\d{4})/,
    'dd.MM.yyyy': /(?<D>\d{2})\.(?<M>\d{2})\.(?<Y>\d{4})/,
    'hh:mm:ss PM|AM': /(?<h>\d{1,2}):(?<m>\d{2})(:(?<s>\d{2}))?\s*(?<ampm>PM|AM)?/,
    'yyyy-MM-dd hh:mm:ss': /(?<Y>\d{4})-(?<M>\d{2})-(?<D>\d{2})\s+(?<h>\d{2}):(?<m>\d{2}):(?<s>\d{2})/,
  };
  
  let parsed;
  if( Formats[format] )
    parsed = dateText.match(Formats[format]);
  else
    for( k in Formats )
      if( undefined != (parsed = dateText.match(Formats[k])) ) 
        break;

  if( !parsed ) return undefined;
  
  let {Y,M,D,h,m,s,ampm} = parsed.groups;

  if( !!h && ampm == 'PM' ) 
    h = +h + 12;
  else if( h == 12 && ampm == 'AM' )
    h = 0;

  
  if( Y == undefined || M == undefined || D == undefined )
    return new Date(0, 0, 1, h??0, m??0, s??0);
  else if( +Y < (centuryBreak??(new Date()).getYear()+10) ) 
    Y = +Y + 2000;
  else if( Y < 100 )
    Y = +Y + 1900;
    
  --M;
  return new Date(Y, M, D, h??0, m??0, s??0);
}
function formatDate(d, format) {
  const Presets = {
    date: 'dd.MM.yyyy',
    time: 'H:mm',
    datetime: 'dd.MM.yyyy H:mm',
    longdate: 'dddd, d. MMMM yyyy',
    longdatetime: 'dddd, d. MMMM yyyy H:mm"',
    $test: '"Jahr:" yy yyyy "Monat": M MM MMM MMMM "Tag": d dd ddd dddd "Stunden": h hh AP H HH "Minuten": m mm "Sekunden": s ss',
  }
  return (Presets[format]??format).replace(/(")(.*?)\1|(')(.*?)\3|AP|(\w)\5*/g,(m0,...m)=>{
    switch( m0 ) {
      case 'h': return d.getHours() % 12 || 12;
      case 'hh': return ('0'+(d.getHours() % 12 || 12)).slice(-2);
      case 'H': return d.getHours();
      case 'HH': return ('0'+d.getHours()).slice(-2);

      case 'm': return d.getMinutes();
      case 'mm': return ('0'+d.getMinutes()).slice(-2);
      
      case 's': return d.getSeconds();
      case 'ss': return ('0'+d.getSeconds()).slice(-2);
      
      case 'AP': return (d.getHours()>12 || (d.getHours()==0 && d.getMinutes()==0 && d.getSeconds()==0))? 'PM' : (d.getHours() < 12 || (d.getMinutes()==0 && d.getSeconds()==0))? 'AM' : 'PM';

      case 'd': return d.getDate();
      case 'dd': return ('0'+d.getDate()).slice(-2);
      case 'ddd': return ['So','Mo','Di','Mi','Do','Fr','Sa','So'][d.getDay()];
      case 'dddd': return ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'][d.getDay()];
      
      case 'M': return d.getMonth()+1;
      case 'MM': return ('0'+(d.getMonth()+1)).slice(-2);
      case 'MMM': return ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][d.getMonth()];
      case 'MMMM': return ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'][d.getMonth()];
      
      case 'yy': return d.getYear() % 100;
      case 'yyyy': return d.getFullYear();
      
      default: return m[1] ?? m[3];
    }
  })
}

function getLanguage(node, ...languages) {
  const langMap = {
    de: 'de-DE',
    ['de-DE']: 'de-DE',
    ['de-AT']: 'de-DE',
    ['de-CH']: 'de-DE',
    en: 'en-US',
    ['en-US']: 'en-US',
    ['en-UK']: 'en-US',
    ['en-AU']: 'en-US',  

    // default languages for domains
    ['.de']: 'de-DE', 
    ['.at']: 'de-DE', 
    ['.com']: 'en-US', 
    ['.gov']: 'en-US', 
    ['.net']: 'en-US',
  };
  
  if( node instanceof HTMLElement ) {
    while( node.parentElement && langMap[node.getAttribute('lang')] == undefined )
      node = node.parentElement;
    languages.unshift(node.getAttribute('lang'));
  }
  else if( typeof node == 'string' ) {
    languages.unshift(node);
  }
   
  const adjusted = languages.reduce((acc,l)=>acc??=langMap[l],undefined);
  if( adjusted != undefined ) return adjusted;

  if( typeof GM_sessionStorage == 'function' ) {
    const globalLang = langMap[GM_sessionStorage.getMergedItem('language')];
    if( globalLang ) return globalLang;
  }
  
  // get lang attribute or tld
  const docLang = document.getElementsByTagName('html')[0].lang 
                  ?? document.location.host.match(/\.([^\.]+$)/)?.[1];

  return langMap[docLang] ?? 'de-DE';
}  

function highlightDomElements() {
  const dialogHtml = `
<form method="dialog">
  <h1>Elemente hervorheben</h1>
  
<p>
  <input autofocus type="text" id="selector" name="selector" />
</p><p>
  <input type="checkbox" checked id="outline" name="outline" />
  <label for="outline">Rahmen</label>
  <input type="text" class="color" value="#F00" id="outline-color" name="outline-color" />
</p><p>
  <input type="checkbox" id="background" name="background" />
  <label for="background">Hintergrund</label>
  <input type="text" class="color" value="#FF0" id="background-color" name="background-color" />
</p><p>
  <input type="checkbox" id="mark-for-readout" name="mark-for-readout" />
  <label for="mark-for-readout">Zum vorlesen kennzeichnen</label>
  <select id="language" name="language">
    <option value="">bitte ausw&auml;hlen</option>
    <option value="en-US">englisch</option>
    <option value="de-DE">deutsch</option>
  </select>
</p>
  <div class="buttons">
    <button id="cancel" class="cancel-button">Cancel</button>
    <button id="ok" class="ok-button">Ok</button>
  </div>
</form>
  `;
  
  let dlg = document.getElementById('tampermonkey-highlight-dialog');
  if( ! dlg ) {
    dlg = document.createElement('dialog');
    dlg.id = 'tampermonkey-highlight-dialog';
    dlg.innerHTML = dialogHtml;
    document.body.appendChild(dlg);
    dlg.addEventListener('close',ev=>{
      if( !dlg.returnValue == 'ok' ) return;
      const selector = dlg.querySelector('#selector').value;
      const options = {
        outline: document.querySelector('#outline').checked,
        outlineColor: document.querySelector('#outline-color').value,
        background: document.querySelector('#background').checked,
        backgroundColor: document.querySelector('#background-color').value,
        markForReadout: document.querySelector('#mark-for-readout').checked,
        language: document.querySelector('#language').value,
      };

      const eleemnts = document.querySelectorAll(selector);
      eleemnts.forEach(e=>{
        if( options.outline ) {
          e.style.outline = '4px solid '+options.outlineColor;
          e.style.outlineOffset = '3px';
        }
        if( options.background ) {
          e.style.backgroundColor = options.backgroundColor;
        }
        if( options.markForReadout ) {
          e.classList.add('read-me-please');
          if( options.language != '' )
            e.setAttribute('lang', options.language);
        }
          
      });
    });
    dlg.querySelector('#ok').addEventListener('click', ev=>{
      ev.preventDefault();
      dlg.close('ok');
    });
    dlg.querySelector('#cancel').addEventListener('click', ev=>{
      ev.preventDefault();
      dlg.close('cancel');
    });
  }
  
  const langOpt = dlg.querySelector(`option[value="${getLanguage()}"]`);
  if( langOpt != undefined ) langOpt.setAttribute('selected', true);
  dlg.returnValue = 'cancel';
  dlg.showModal();
}
function highlightInputFields() {
  document.querySelectorAll('input,select,textarea,button').forEach(e=>e.classList.toggle('GM-input-field'));
}

window.addEventListener('load', ()=>{
  window.addKeyHandler('F8', ()=>highlightDomElements());
  window.addKeyHandler('shift+F8', ()=>highlightInputFields(), {excludeFormFields:false});
  window.registerForReadOut('.read-me-please', {language:getLanguage()});
})
// ------------------------------------------------------------------
console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'common/utility.js', 'Version '+COMMON_VERSION);
