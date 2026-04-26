(function() {
  const DOUBLE_KEY_PRESS = 500;
  const QUEUE_CLEANUP_DELAY = 750;
  const MONTHNAME_MAP = {
    'januar': 1, 
    'january': 1,
    'jan': 1,
    'februar': 2,
    'february': 2,
    'feb': 2,
    'märz': 3,
    'm&Auml;Rz': 3,
    'march': 3,
    'mär': 3,
    'm&Auml;R': 3,
    'mar': 3,
    'april': 4,
    'apr': 4,
    'mai': 5,
    'mey': 5,
    'juni': 6,
    'june': 6,
    'juno': 6,
    'jun': 6,
    'juli': 7,
    'july': 7,
    'jul': 7,
    'august': 8,
    'aug': 8,
    'september': 9,
    'sep': 9,
    'oktober': 10,
    'october': 10,
    'okt': 10,
    'oct': 10,
    'november': 11,
    'nov': 11,
    'dezember': 12,
    'december': 12,
    'dez': 12,
    'dec': 12,
  };
  const DAYNAME_MAP = {
    'sonntag': 0,
    'sunday': 0,
    'son': 0,
    'sun': 0,
    'so': 0,
    'su': 0,
    'montag': 1,
    'monday': 1,
    'mon': 1,
    'mo': 1,
    'dienstag': 2,
    'tuesday': 2,
    'die': 2,
    'thu': 2,
    'di': 2,
    'mittwoch': 3,
    'wednesday': 3,
    'mit': 3,
    'wed': 3,
    'mi': 3,
    'we': 3,
    'donnerstag': 4,
    'thursday': 4,
    'don': 4,
    'thu': 4,
    'do': 4,
    'th': 4,
    'freitag': 5,
    'friday': 5,
    'fre': 5,
    'fri': 5,
    'fr': 5,
    'samstag': 6,
    'sonnabend': 6,
    'saturday': 6,
    'sam': 6,
    'sat': 6,
    'sa': 6,
  };


  const Format = {
    date: function(dt) {
      return dt.getDate()+'.'+(dt.getMonth()+1)+'.'+dt.getFullYear();
    },
    time: function(dt) {
      return dt.getHours()+' Uhr '+dt.getMinutes();
    },
    dateAndTime: function(dt) {
      return Format.date(dt)+', '+Format.time(dt);
    },
    niceDateTime: function(dt) {
      function dateDiff(dt1,dt2) {
        const r = {
          totalSeconds: Math.trunc((dt1.valueOf()-dt2.valueOf())/1000),
          totalDays: Math.trunc((dt1.valueOf()/1000/60-dt1.getTimezoneOffset())/60/24)-Math.trunc((dt2.valueOf()/1000/60-dt2.getTimezoneOffset())/60/24),
          past: false,
          future: false,
          now: false,
        };
        const f = r.totalSeconds < 0? -1 : 1;
        if( r.totalSeconds == 0 )
        	r.now = true;
        else
        	r.future = !(r.past = r.totalSeconds < 0);
        	
        r.seconds = f * (r.totalSeconds%60);
        r.totalMinutes = Math.trunc(r.totalSeconds/60);
        r.minutes = f * (r.totalMinutes%60);
        r.totalHours = Math.trunc(r.totalMinutes/60);
        r.hours = f * (r.totalHours%24);
        r.days = f * Math.trunc(r.totalHours/24);
/*
        r.dateTime1 = dt1;
        r.dateTime2 = dt2;
        r.day1 = new Date(Math.floor(dt1.valueOf()/1000/60/60/24)*1000*60*60*24);
        r.day2 = new Date(Math.floor(dt2.valueOf()/1000/60/60/24)*1000*60*60*24);
        console.log(r);
*/
        return r;
      }
      function fewMinutes(d) {
        if( d.minutes == 0 ) return 'jetzt';
        return (d.past? 'vor ' : 'in ')
        			 +(d.minutes== 1?'einer Minute':d.minutes+' Minuten');
      }
      function fewHours(d) {
        return (d.past? 'vor ' : 'in ')
        			 +(d.hours==1?'einer Stunde ':d.hours+' Stunden ')
               +(d.minutes==0?'':' und '+(d.minutes==1?'einer Minute':d.minutes+' Minuten'));
      }
      function fewDays(d,dt) {
        const dname = ['vorgestern', 'gestern', 'heute','morgen','\xfcbermorgen'][d.totalDays+2] 
                      ?? (d.past? 'am vergangenen ' : 'am kommenden ')+['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','freitag','Samstag'][dt.getDay()];
        return  dname+', '+Format.time(dt);
      }
      const delta = dateDiff(dt, new Date());
      if( delta.totalDays < -7 ) return Format.date(dt);
      if( delta.totalHours < -12 ) return fewDays(delta, dt);
      if( delta.totalMinutes < -60 ) return fewHours(delta);
      if( delta.totalSeconds < -60) return fewMinutes(delta);
      if( delta.totalSeconds < 0 ) return 'gerade eben';
      if( delta.totalSeconds == 0 ) return 'jetzt';
      if( delta.totalSeconds < 60 ) return 'gleich';
      if( delta.totalMinutes < 60 ) return fewMinutes(delta)
      if( delta.totalHours <= 12 ) return fewHours(delta)
      if( delta.totalDays <= 7 ) return fewDays(delta, dt);
      return Format.date(dt);
    },
    reduceWhitespace: function(s) {
      return s == undefined? '' : s.replace(/\s+/g,' ').trim();
    },
    niceName: function(name) {
      const extMarkerRx = /\((extern|external|gast|guest)\)/i;
      const namePartsRx = /(?:([^,]+),)?(.+)/

      const res = name.replace(extMarkerRx, '')
                      .match(namePartsRx)
                      ?.slice(1)
                      .map(s=>s?.trim()??'');
      return (res[1]??'') + ' ' + (res[0]??'');
    },
    easyUrls: function(text) {
      const urlRx = /(?:(?:https?:\/\/www\.)|(?:https?:\/\/)|(?:www\.))([\S]+)/gi;
      // $0: mit Protokoll
      // $1: ohne Protokoll
      // $2: ohne www
      const CharReplaceMap = {
        '.': ' Punkt ',
        '#': ' hash ',
        '?': ' Fragezeichen ',
        '&': ' und ',
        '=': ' gleich ',
        'www.': ' www ',
        '.de': ' Punkt D E ',
        '.com': ' PUnkt com ',
        '.net': ' PUnkt net ',
        '.html': ' Punkt html',
      };
      return text.replace(urlRx,(m,m1)=>{
        const charRx = /\.de|\.com|\.html|[\W-_]/g;
        return m1.replace(charRx,c=>CharReplaceMap[c]??' ');
      });
    },
    niceNumber: function(text) {
      // implementation is missing
      return text;
    }
  };

  const DEFAULT_OPTIONS = {
    pitch: .8,
    rate: 1.35,
    volume: .8,
    language: undefined,
    readHidden: false,
  }
  
  function isInline(node, dflt=true) {
    const displayMode = (node.currentStyle ?? window.getComputedStyle(node, ""))?.display;
    return !displayMode? dflt : displayMode.indexOf('inline')>=0;
  }
  function mergeUtteranceOptions(a, b, c) {
    return {
      pitch: a?.pitch ?? b?.pitch ?? c?.pitch,
      rate: a?.rate ?? b?.rate ?? c?.rate,
      volume: a?.volume ?? b?.volume ?? c?.volume,
      language: a?.language ?? b?.language ?? c?.language,
      readHidden: a?.readHidden ?? b?.readHidden ?? c?.readHidden,
    };
  } 
  function assignUtteranceOptions(utterance, options) {
    if( options != undefined ) {
      utterance.lang = options.language ?? options.lang ?? 'de-DE';
      if( options.pitch != undefined ) utterance.pitch = options.pitch;
      if( options.volume != undefined ) utterance.volume = options.volume;
      if( options.rate != undefined ) utterance.rate = options.rate;
    }
    else {
      utterance.lang = 'de-DE';
    }
    return utterance;
  }
  
/*  
  const UTTREANCE_OPTIONS = ['pitch','rate','volume','lang'];
  const UTTREANCE_COLLECTOR_OPTIONS = ['pitch','rate','volume','lang','readHidden'];
  function assignProperties(dest,src,properties) {
    for( let p of properties )
      if( src[p] != undefined )
        dest[p] = src[p];
    return dest;
  }
*/

  class BaseKeyHandler {
    #this; 
    #previousKey; #previousTime;
    
    constructor(thisObject, options) {
      this.#this = thisObject;
      this.doublePressTimeout = options?.doublePressTimeout ?? DOUBLE_KEY_PRESS;
      this.stopPropagation = options?.stopPropagation ?? false;
      this.preventDefault = options?.preventDefault ?? false;

      document.addEventListener('keydown', ev=>this.callHandler(ev), true);
    }
    getHandler(ev) {
      const k = (ev.ctrlKey? 'Ctrl+':'') +
                (ev.altKey? 'Alt+':'') +
                (ev.shiftKey? 'Shift+':'') +
                ev.code;

      const doublePressed = this.#previousKey == k 
                            && new Date() - this.#previousTime < this.doublePressTimeout;
      this.#previousKey = k;
      this.#previousTime = new Date();

      const handler = this[k];
      return typeof handler != 'function'
              ? undefined 
              : { handler, 
                  doublePressed, 
                  stopPropagation: handler.stopPropagation ?? this.stopPropagation, 
                  preventDefault: handler.preventDefault ?? this.preventDefault
                };
    }
    callHandler(ev) {
      const h = this.getHandler(ev);
      if( h == undefined ) return;

      ev.doublePressed = h.doublePressed;
      try {
        switch( h.handler.apply(this.#this, [ev]) ) {
          case true:
            ev.stopPropagation();
            ev.preventDefault();
          case false:
            break;
          
          default:
            if( !ev.target.matches('INPUT,TEXTAREA') ) {
              if( h.stopPropagation ) ev.stopPropagation();
              if( h.preventDefault ) ev.preventDefault();
            }
        }
      }
      catch(e) {
        console.error(e);
      }
    }
  }

  class UtteranceElementCollection {
    #elements = []; 
    #highlighted = undefined;
    
    constructor(u) {
      u.addEventListener('boundary', ev=>this.#onBoundary(ev));
      u.addEventListener('end', ev=>this.#onEnd(ev));
      u.addEventListener('error', ev=>this.#onEnd(ev));
    }
    
    push(startOffset, length, element) {
      this.#elements.push({element, startOffset, length});
    }
    append(ue, offset) {
      for(let {element, startOffset, length} of ue) {
        startOffset += offset;
        this.#elements.push({element, startOffset, length});
      }
    }
    getAt(offset) {
      return this.#elements.find(e=>e.startOffset <= offset && e.startOffset+e.length > offset)?.element;
    }
    highlightAt(offset) {
      let e = this.getAt(offset);
      if( !e ) return;
      if( e.nodeName == '#text' ) e = e.parentElement;
      if( e == this.#highlighted ) return;
      if( this.#highlighted )
        this.#highlighted.style.outline = this.#highlighted.originalOutlineStyle;
      this.#highlighted = e;
      e.originalOutlineStyle ??= e.style.outline;
      e.style.outline = '4px solid blue';
    }
    endHighlighting() {
      if( !this.#highlighted ) return;
      this.#highlighted.style.outline = this.#highlighted.originalOutlineStyle;
      this.#highlighted = undefined;
    }
    
    #onBoundary(ev) {
      this.highlightAt(ev.charIndex);
    }
    #onEnd(ev) {
      this.endHighlighting();
    }
    [Symbol.iterator]() {return this.#elements[Symbol.iterator]();}
  }

  class NormalizedExtract {
    #text; #nodes; #element;
    
    constructor(extract, element) {
      if( extract == undefined ) return;
      
      if( typeof extract == 'string' )
        this.#text = extract;
      else if( typeof extract != 'object' ) 
        return;
      else if( Array.isArray(extract) ) 
        this.nodes = extract;
      else if( Array.isArray(extract.nodes) )
        this.nodes = extract.nodes;
      else if( typeof extract.text == 'string' )
        this.#text = extract.text;

      this.pitch = extract.pitch;
      this.rate = extract.rate;
      this.volume = extract.volume;
      this.language = extract.language;
      this.#element = element;
    }
    get isEmpty() {
      return (this.#text == undefined || this.#text == '') 
             && (this.#nodes == undefined || this.#nodes.length == 0);
    }
    get isNested() {
      return this.#nodes != undefined;
    }
    get isText() {
      return this.#text != undefined;
    }
    get text() {
      return this.#text;
    }
    set text(t) {
      if( this.#nodes != undefined ) throw 'Cannot set text for nested node';
      this.#text = t;
    }
    get nodes() {
      return this.#nodes;
    }
    set nodes(n) {
      if( this.#text != undefined ) throw 'Cannot add nested items to text-node';
      this.#nodes = [...n].map(i=>i==undefined
                                 ? undefined
                                 : i.constructor.name == 'NormalizedExtract'
                                 ? i
                                 : new NormalizedExtract(i) 
                             ).filter(i=>i!=undefined && !i.isEmptyy);
    }
    
    addPrefix(text) {
      if( !this.isNested ) this.#convertToNested();
      this.nodes.unshift(new NormalizedExtract(text.toString()));
    }
    addSuffix(text) {
      if( !this.isNested ) this.#convertToNested();
      this.nodes.push(new NormalizedExtract(text.toString()));
    }
    #convertToNested() {
      //if( this.#nodes ) throw 'Invalid operation';
      this.#nodes = [new NormalizedExtract(this.#text)];
      this.#text = undefined;
    }
    replace(pattern,replacement) {
      if( pattern == undefined ) return;


      if( this.#text != undefined )
      	this.#text = pattern.global
      		? this.#text.replaceAll(pattern,replacement??'')
      		: this.#text.replace(pattern,replacement??'');
      else if( this.#nodes != undefined )
        this.#nodes.forEach(n=>n.replace(pattern,replacement??''));
    }

    getUtterances(options) {
      options = mergeUtteranceOptions(this,options);

      if( this.#text != undefined )  {
        const u = new SpeechSynthesisUtterance(this.#text);
        assignUtteranceOptions(u, options);
        u.htmlElements = new UtteranceElementCollection(u);
        u.htmlElements.push(0, this.#text.length, this.#element);
        return [u];
      }
      else if( this.#nodes != undefined )
        return this.#nodes.map(n=>n.getUtterances(options)).flat(Infinity);
    }
    applyCustomOptions(custom) {
      if( custom.pitch != undefined ) this.pitch = custom.pitch;
      if( custom.rate != undefined ) this.rate = custom.rate;
      if( custom.volume != undefined ) this.volume = custom.volume;
      if( custom.language != undefined ) this.language = custom.language;
      
      if( (custom.prefix??'') != '' ) this.addPrefix(custom.prefix);
      if( (custom.suffix??'') != '' ) this.addSuffix(custom.suffix);

    }
    applyReplacements(replacements) {
      if( Array.isArray(replacements) )
        replacements.forEach(r=>this.replace(r.pattern,r.replacement));
      else if( typeof replacements == 'object' )
        this.replace(replacements.pattern, replacements.replacement);
    }
  }
  
  class UtteranceCollector {
    #collected = new Set();
    #exclude; #replacements;
    #customCollectors = [];
    #extractedData;
    
    constructor(node, options) {
      this.#initOptions(options);
      
      this.options.language = getLanguage(this.options.language, node);

      this.#extractedData = this.#collectNode(node);
      if( this.#extractedData.isEmpty && options.useAriaLabels !== false )
        this.#extractedData = new NormalizedExtract([...node.querySelectorAll('[aria-label]')].map(n=>n.ariaLabel).join(' '));

      this.#extractedData.applyReplacements(this.#replacements);

      if( (this.prefix??'') != '' ) this.#extractedData.addPrefix(this.prefix);
      if( (this.suffix??'') != '' ) this.#extractedData.addSuffix(this.suffix);
    }
    get utterances() {
      const utterances = this.#extractedData.getUtterances(mergeUtteranceOptions(this.options,DEFAULT_OPTIONS)).filter(u=>!!u);
      const res = [];
      let prev = {};
      for( const u of utterances ) {
        if( prev.pitch == u.pitch
            && prev.rate == u.rate
            && prev.volume == u.volume
            && prev.language == u.language
            && prev.lang == u.lang
            && prev.voice == u.voice ) {
          const startOffset = prev.text.length;
          prev.text += ' ' + u.text;
          prev.htmlElements.append(u.htmlElements, startOffset);
        }
        else {
          res.push(prev=u);
        }
      }
      return res;
    }
    get format() {
      return Format;
    }
    
    convertDates() {
      function toDate({year,month,day,hour,minutes,seconds,ampm}) {
        if( typeof month == 'string' )
          month = MONTHNAME_MAP[month.toLowerCase()] ?? month;

        return new Date(year, month-1, day, hour==undefined? 0 : ampm=='PM'? +hour+12 : hour, minutes??0, seconds??0);
      }
			const dateRXs = [
				/*en*/ /(?<month>\d{1,2})\/(?<day>\d{1,2})\/(?<year>\d{4}),? (?<hour>\d{1,2}):(?<minutes>\d{2})(?::(?<seconds>\d{2}))? (?<ampm>AM|PM)/g,
				/*de*/ /(?<day>\d{1,2})\.(?<month>\d{1,2})\.(?<year>\d{4}),? (?<hour>\d{1,2}):(?<minutes>\d{2})(?::(?<seconds>\d{2}))?/g,
				/*de (text)*/ /(?<day>\d{1,2})\.\s+(?<month>\w+)\s+(?<year>\d{4}),?\s+(um\s+)?(?<hour>\d{1,2}):(?<minutes>\d{2})(?::(?<seconds>\d{2}))?/g,
				/*en (text)*/ /(?<month>\w+)\s+(?<day>\d{1,2}),\s+(?<year>\d{4})\s(at\s)?(?<hour>\d{1,2}):(?<minutes>\d{2})(?::(?<seconds>\d{2}))? (?<ampm>AM|PM)/g,
				//...(this.options.customDatePatterns ?? []),
			];

			dateRXs.forEach(rx=>this.#extractedData.replace(rx,(...args)=>Format.niceDateTime(toDate(args.pop()))));
    }
    convertUrls() {
      this.#extractedData.replace(/.*/m, Format.easyUrls);
    }
    convertNumbers() {
      // implementation is missing
    }
    
    #initOptions(options) {
      this.options = mergeUtteranceOptions(options, DEFAULT_OPTIONS);

      if( options == undefined ) return;

      this.rootExtractor = options.extract;

      this.prefix = options.prefix;
      this.suffix = options.suffix;
      
      if( Array.isArray(options.replace) )
        this.#replacements = options.replace;
      else if( typeof options.replace == 'object' )
        this.#replacements = [options.replace];

      if( Array.isArray(options.exclude) )
        this.#exclude = options.exclude.join(',');
      else if( typeof options.exclude == 'string' )
        this.#exclude = options.exclude;
      
      if( options.childElements != undefined )
        for( let selector in options.childElements ) 
          this.#customCollectors.push(Object.assign({},options.childElements[selector], {selector}));
    }
    #getCustomCollector(node) {
      return typeof node.matches == 'function' 
                ? this.#customCollectors?.find(c=>node.matches(c.selector))
                : undefined;
    }
    #collectNode(node) {
      if( this.#collected.has(node) ) return undefined;
      this.#collected.add(node);
      
      if( !this.#isReadable(node) ) return undefined;

      const custom = this.#collected.size == 1
                      ? {extract: this.rootExtractor} // root-element
                      : this.#getCustomCollector(node); // child-elements

      const extract = this.#extractNodeText(node, custom);
      if( extract == undefined ) return undefined;

      const norm = new NormalizedExtract(extract, node);
      if( custom ) {
        norm.applyReplacements(custom.replace);
        norm.applyCustomOptions(custom);
      }
      return norm;
    }
    #extractNodeText(node,customOptions) {
      if( typeof customOptions?.extract == 'function' ) {
        const customExtract = this.#applyCustomExtractor(node,customOptions.extract);
        if( customExtract.node != undefined )
          node = customExtract.node;
        else if( customExtract.childNodes != undefined )
          return this.#collectChildNodes(customExtract);
        else
          return customExtract.extracted;
      }
      else if( customOptions?.text != undefined )
        return customOptions.text.toString();
      
      const f = this[node.nodeName.toUpperCase()];
      return typeof f == 'function'
                ? f.apply(this,[node]) 
                : this.default(node);
    }
    #applyCustomExtractor(node,customExtractor) {
      let extracted;
      try {
        extracted = customExtractor.apply(this,[node]);
      }
      catch(e) {
        console.warn(e);
      }

      if( extracted instanceof Node ) 
        return {node: extracted};
      if( extracted == undefined 
          || typeof extracted == 'string'
          || typeof extracted[Symbol.iterator] != 'function' )
        return {extracted};

      extracted = [...extracted];
      return extracted.length == 0
              ? {extracted: undefined}
              : extracted[0] instanceof Node
              ? {childNodes: extracted} 
              : {extracted};
    }
    #collectChildNodes(node) {
      return [...node.childNodes].map(cn=>this.#collectNode(cn)).filter(cn=>!cn?.isEmpty);
    }
    #isExcluded(node) {
      return this.#exclude == undefined? false : !!node.matches?.(this.#exclude);
    }
    #isReadable(node) {
      switch( node.nodeType ) {
        case 3: // #text
        case 8: // #comment
        case 4: // CDATA
          return true;
          
        case 1: // Element
          return ( this.options.readHidden || node.offsetParent != undefined )
                 && !this.#isExcluded(node);
          
        case undefined: // non-node values
          return true;
          
        default:
          return false;
      }
    }

    default(node) {
      this.#collected.add(node); // prevent loops generated by custom extractors 
      if( node.childNodes != undefined && node.childNodes.length > 0 )
        return this.#collectChildNodes(node);
      return Format.reduceWhitespace(node.innerText ?? node.nodeValue ?? node.toString());
    }
    ['#TEXT'](node) {
      return Format.reduceWhitespace(node.nodeValue);
    }
    ['#COMMENT'](node) {
      return undefined;
      //return node.nodeValue;
    }
    EM(node) {
      const res = this.default(node) ?? {};
      res.pitch = 1.3;
      res.volume = 1;
      return res;
    }
    CODE(node) {
      const res = this.default(node) ?? {};
      res.pitch = .9;
      res.volume = 1;
      if( !isInline(node) )
        res.rate = .9;

      return res;
    }
    INPUT(node) {
      switch(node.type) {
        case 'hidden':
          return '';
          
        case 'password':
          return 'Geheim.';
          
        case 'text':
        default:
          return node.value;
      }
    }
    TEXTAREA(node) {
      if( node.selectionStart != node.selectionEnd ) {
        const t = node.value.slice(node.selectionStart, node.selectionEnd).trim();
        if( t != '' ) return t;
      }
      return node.value;
    }
    SELECT(node) {
      return [...node.options].find(o=>o.value == node.value)?.innerText;
    }
    IMG(node) {
      let text = node.title;
      if( text != node.alt ) text += ', '+node.alt;
      text = Format.reduceWhitespace(text);
      if( text == '' )
        //text = node.src.match(/([^\\\/]*)\.[^\\\/\.]*$/)?.[1] ?? '';
        text = node.src.match(/([^\/]*?)(\?.*)?(#.*)?$/)?.[1]
      return 'Bild: '+text;
    }
    SVG(node)  {
      return undefined;
    }
  }  

/*
  class UtteranceList extends Array {
    #progress = -1;
    
    constructor() {
      super();
    }
    speak(start) {
      
    }
    skip(steps) {
      
    }
    cancel() {
      
    }
  }
*/
  class ReadOutQueue {
    static #instance;
    #queue = [];
    #currentIx = 0;
    #played = [];
    #cleanupTimer;

    static get instance() {
      if( ReadOutQueue.#instance == undefined )
        ReadOutQueue.#instance = new ReadOutQueue();
      return ReadOutQueue.#instance;
    }
    
    get #current() {
      return this.#queue[this.#currentIx];
    }
    #start() {
      if( this.#queue.length > 0 
          && !window.speechSynthesis.speaking 
          && !window.speechSynthesis.pending )
        this.#next();
    }
    
    #setPlayed(currentIx, progress=0) {
      const pix = this.#played.findIndex(p=>p.currentIx == currentIx && p.progress == progress);
      if( pix == -1 ) 
        this.#played.push({currentIx, progress});
      else
        this.#played.splice(pix+1);
    }

    #speak(uix) {
      function applyHighlighting(u) {
        let element = u.htmlElement;
        if( !element ) return;
        if( element.nodeName == '#text' ) element = element.parentElement;
        if( !(element instanceof HTMLElement) ) {
          //console.log('cannot highlight non-HTMLElement', element);
          return;
        }
        //console.log('highlighting', element);

        if( !element ) 
          return;

        element.originalStyle ??= element.getAttribute('style');
        element.style.outline = '4px solid blue';
        
        u.addEventListener('end', ()=>element.setAttribute('style', element.originalStyle));
        u.addEventListener('error', ()=>element.setAttribute('style', element.originalStyle));
      }
      
      if( uix != undefined )
        this.#current.progress = uix;

      const u = this.#current[this.#current.progress];        
      //applyHighlighting(u);
      console.debug('Speaking:', u.lang, u.text);

      window.speechSynthesis.speak(u);
      this.#setPlayed(this.#currentIx, uix??0);
    }
    #next() {
      if( this.#current == undefined )
        return;
      else if( ++this.#current.progress < this.#current.length )
        this.#speak();
      else if( ++this.#currentIx < this.#queue.length )
        this.#speak(0);
      else
        this.#cleanup();
    }
    #cleanup(delay=0) {
      if( this.#cleanupTimer != undefined ) {
        if( delay > 0 ||  window.speechSynthesis.speaking || window.speechSynthesis.pending )
          return;
      }
      else {
        if( delay != -1 && ( window.speechSynthesis.speaking || window.speechSynthesis.pending ) )
          delay = QUEUE_CLEANUP_DELAY;
        if( delay > 0 )
          return void (this.#cleanupTimer = window.setTimeout(()=>this.#cleanup(),delay));
      }

      this.#cleanupTimer = undefined;
      this.#queue = [];
      this.#currentIx = 0;
      this.#played = [];
    }
    #mark(ix) {
      this.#setPlayed(this.#currentIx,ix);
    }
    #pushUtterances(utterances, k, e) {
      if( utterances.length == 0 ) return;

      utterances.progress = -1;
      utterances.key = k;
      utterances.element = e
      utterances.forEach((u,ix)=>{
        u.onend = ev=>this.#next();
        u.onmark = ev=>this.#mark(ix);
      });
        
      this.#queue.push(utterances);
      this.#start();
    }
    #pushText(t, k, options,e) {
      k ??= t;
      const u = new SpeechSynthesisUtterance(t);
      assignUtteranceOptions(u, mergeUtteranceOptions(options,DEFAULT_OPTIONS));
      this.#pushUtterances([u], k, e);
      return k;
    }
    #pushElement(e, k, options) {
      if( this.#queue.find(u=>u.element==e) != undefined ) 
        return;
        
      const u = new UtteranceCollector(e,options);
      u.convertDates();
      u.convertUrls();
      //u.convertNumbers();
      k ??= e.id ?? e.className ?? e.nodeName;
      if( u.utterances.length > 0 )
        this.#pushUtterances(u.utterances, k, e);
      else
        this.#pushText('Kein Text.', k, options, e);
    }
    read(v,options) {
      if( this.#current?.element == v ) 
        return;

      this.cancel();
      this.push(v, options);
    }
    push(v,options) {
      return v instanceof HTMLElement
          ? this.#pushElement(v, undefined, options)
          : this.#pushText(v, undefined, options);
    }
    cancel() {
      this.#cleanup(-1);
      window.speechSynthesis.cancel();
    }
    skip(to) {
      let ix = to==undefined? 1 : parseInt(to);
      if( isNaN(ix) ) {
        if( -1 == (ix = this.#queue.findIndex(u=>u.key==to||u.element==to)) )
          return;
          
        this.#currentIx = ix;
        if( !!this.#current ) this.#current.progress = -1;
      }
      else {
        this.#currentIx += ix;
        if( !!this.#current ) this.#current.progress = -1;
      }

      if( window.speechSynthesis.speaking || window.speechSynthesis.pending )
        window.speechSynthesis.cancel();
      else
        this.#next();
    }
    rewind(steps=0) {
      if( steps > 0 ) 
        this.#played.splice(-steps);
      if( this.#played.length == 0 ) 
        return;
        
      const np = this.#played.pop();
      this.#currentIx = np.currentIx;
      if( !!this.#current ) this.#current.progress = np.progress;

      if( window.speechSynthesis.speaking || window.speechSynthesis.pending )
        window.speechSynthesis.cancel();
      this.#speak();
    }
    pause() {
      if( window.speechSynthesis.speaking ) {
        window.speechSynthesis.pause();
        return true;
      }
    }
    resume() {
      if( window.speechSynthesis.paused ) {
        window.speechSynthesis.resume();
        return true;
      }
      return false;
    }
    togglePause() {
      if( window.speechSynthesis.paused ) {
        window.speechSynthesis.resume();
        return true;
      }
      else if( window.speechSynthesis.speaking ) {
        window.speechSynthesis.pause();
        return true;
      }
      return false;
    }    
    get isReading() {
      return window.speechSynthesis.speaking 
             || window.speechSynthesis.pending 
             || this.#currentIx < this.#queue.length
             || this.#played.length > 0;
    }
  }
  
  class CssPathHelper extends Array {
    static MAX_AGE = 10000; // ms
    #timestamps = [];
    
    constructor() {
      super(...arguments);
      if( this.length > 0 ) this.#timestamps.fill(new Date(), 0, this.length-1);
    }
    
    cleanup(maxage) {
      const cut = (new Date().valueOf()) - (maxage || CssPathHelper.MAX_AGE);
      let ix = 0;
      while( ix < this.length && this.#timestamps[ix++].valueOf() < cut);
      if( ix > 1 )  {
        super.splice(0,ix-1);
        this.#timestamps.splice(0,ix-1);
      }
    }
    add(element) {
      function getCssPath(e) {
        let selector = '';
        do {
          selector = e.nodeName 
                     + (e.id?'#'+e.id.replace(/\./g,'\\.'):'') 
                     + (e.className?'.'+e.className.replace(/\s+/g,'.'):'') 
                    + (Object.entries(e.dataset).map(([key, value])=>`[data-${key.replaceAll(/[A-Z]/g, m=>'-'+m.toLowerCase())}="${value}"]`).join(''))
                     + ' ' + selector;
          e = e.parentNode;
        } while( e != undefined && e.nodeName != 'BODY' );
        return selector;
      }

      this.cleanup();
      const selector = getCssPath(element);
      const ix = this.indexOf(selector);
      if( ix >= 0 ) {
        super.splice(ix,1);
        this.#timestamps.splice(ix,1);
      }
      this.push(selector);
    }
    push(selector) {
      super.push(selector);
      this.#timestamps.push(new Date());
    }
    pop(selector) {
      super.pop(selector);
      this.#timestamps.pop(new Date());
    }
    shift(selector) {
      super.shift(selector);
      this.#timestamps.shift(new Date());
    }
    unshift(selector) {
      super.unshift(selector);
      this.#timestamps.unshift(new Date());
    }
    getCompact() {
      function findCommonStart(strings) {
        function commonStart(a,b) {
          for( let len = a.length < b.length? a.length : b.length ; len > 0 ; len-- ) {
            const common = b.slice(0,len);
            if( a.startsWith(common) )
              return common;
          }
          return '';
        }

        let common = strings[0];
        for( let i = 1 ; i < strings.length ; i++ ) {
          common = commonStart(strings[i], common);
          if( common == '' ) break;
        }
        return common;
      }

      const common = findCommonStart(this);
      if( common == '' ) 
        return this;
      const cutaway = common.length;
      return {
        url: location.href,
        base: common,
        length: this.length,
        items: [...this].map(i=>i.slice(cutaway)),
      };
    }
    
    toJSON() {
      return {url:location.href, items:[...this]};
    }
  }
  
  class SynchronizedSelectors {
    #mine = []; // {selector: "string", options: {} }
    
    constructor() {
      
    }
    #storagePush() {
      if( typeof GM_sessionStorage != 'function' ) return;
      const project = GM_info.script.name;
      const v = this.#mine.map(m=>({selector: m.selector, priority: m.options.priority, project}));
      GM_sessionStorage().setItem('ReadOutSelectors', v);
    }
    #storagePull() {
      if( typeof GM_sessionStorage != 'function' ) return this.#mine;
      
      const project = GM_info.script.name;
      return GM_sessionStorage.getMergedItem('ReadOutSelectors')
        .map(s=>({
          selector: s.selector,
          options: s.project == project
                      ? this.get(s.selector)?.options
                      : { priority: s.priority, exclude: true }
        }))
      
    }
    get(selector) {
      return this.#mine.find(m=>m.selector==selector) ?? {exclude:true};
    }
    push(selector, options) {
      this.#mine.push({selector, options});
      this.#storagePush();
    }
    findClosestMatch(element) {
      function getDistance(el,anc) {
        let dist = 0;
        while( !!el & el !== anc ) {
          el = el.parentNode;
          ++dist;
        }
        return dist;
      }

      if( !element ) return undefined;
      
      return this.#storagePull()
        .map(s=>({
          ancestor:element.closest(s.selector),
          options:s.options,
          selector:s.selector
        }))
        .filter(ai=>!!ai.ancestor)
        .map(ai=>{
          ai.distance = getDistance(element,ai.ancestor);
          return ai
        })
        .sort((a,b)=>{
          const aPrio = a.options.priority ?? 10;
          const bPrio = b.options.priority ?? 10;
          if( aPrio == bPrio )
            return a.distance-b.distance;
          else
            return aPrio-bPrio;
        })[0];
    }
  }
  
  class ReadOutUI {
    #cssPathHelper = new CssPathHelper();
    #selectors = new SynchronizedSelectors();
    #keyHandlers = new (class extends BaseKeyHandler {
      constructor(parent) {
        super(parent)
      }

      Escape(ev) {
        if( !this.isReading ) 
          return false;
        this.cancel();
        return true;
      }
      Tab(ev) {
        if( !this.isReading ) 
          return false;
        this.skip();
        return true;
      }
      Space(ev) {
        return this.togglePause();
      }
      ['Shift+Tab'](ev) {
        if( this.isReading )
          this.rewind(ev.doublePressed? 2 : 1);
        return true;
      }
      ['Ctrl+Shift+ControlLeft'](ev) {
      	this.readSelection();
      }
      ['Ctrl+Shift+ShiftLeft'](ev) {
      	this.readSelection();
      }
    })(this);

    constructor() {
      window.addEventListener('mousemove',ev=>{
        this.#onMousemove(ev);
      });
    }
          
    get isReading() {
      return ReadOutQueue.instance.isReading;
    }
    read(e,options) {
      ReadOutQueue.instance.read(e,options);
      return this;
    }
    readSelector(selector, options) {
      const eleemnts = document.querySelectorAll(selector);
      if( elements.length > 0 ) {
        this.read(elements[0], options);
        for( let i = 1 ; i < elements.length ; this.queue(elements[i++], options) );
      }
      return this;
    }
    queue(e, options) {
      ReadOutQueue.instance.push(e,options);
      return this;
    }
    queueSelector(selector,options) {
      [...document.querySelectorAll(selector)]
        .forEach(e=>this.queue(e,options));
      return this;
    }
    cancel() {
      ReadOutQueue.instance.cancel();
    }
    skip(to) {
      ReadOutQueue.instance.skip(to);
    }
    rewind(steps) {
      ReadOutQueue.instance.rewind(steps);
    }
    pause() {
      return ReadOutQueue.instance.pause();
    }
    resume() {
      return ReadOutQueue.instance.resume();
    }
    togglePause() {
      return ReadOutQueue.instance.togglePause();
    }
    registerReadOut(selector,options) {
      this.#selectors.push(selector,options ?? {});
    }
    readSelection() {
    	const sel = window.getSelection();
    	if( !sel.isCollapsed ) 
    		this.read(sel.toString());
    }
    #printCssPath(ev) {
      this.#cssPathHelper.add(ev.target)
      console.log(this.#cssPathHelper.getCompact());
    }
    #readOutElement(ev) {
      const target = document.elementFromPoint(ev.clientX,ev.clientY);
      const match = this.#selectors.findClosestMatch(target);
      if( match != undefined && match.options.exclude !== true ) {
        if( match.options.immediate == true )
          this.read(match.ancestor,match.options);
        else
          this.queue(match.ancestor,match.options);
      }
    }
    #onMousemove(ev) {
      if( ev.shiftKey && ev.ctrlKey )
        this.#readOutElement(ev);
      else if( ev.shiftKey && ev.altKey )
        this.#printCssPath(ev);
      
    }
  }

  window.ReadOut = document.ReadOut = new ReadOutUI();
  window.registerForReadOut = function(...args){
    if( args[0].constructor.name == 'RegExp' ) {
      if( args[0].test(location.href) )
        window.ReadOut.registerReadOut(args[1], args[2]);
    }
    else if( args.length >= 3 ) {
      if( wildcardToRegExp(args[0]).test(location.href) )
        window.ReadOut.registerReadOut(args[1], args[2]);
    }
    else {
      window.ReadOut.registerReadOut(args[0], args[1]);
    }
    
  };
})();

// ------------------------------------------------------------------
console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'common/readout.js', 'Version '+COMMON_VERSION);
