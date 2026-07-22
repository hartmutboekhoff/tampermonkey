(function(){

  function KeySimulator() {
    const DELAY = 100;
    
    class KeySimulator {
      #timer;
      #queue = [];
      
      constructor(type, field) {
        if( type == undefined )
          [type, field] = ['keydown', document.activeElement];
        else if( typeof type == 'object' )
          [type, field] = ['keydown', type];
        else if( field == undefined )
          field = document.activeElement;

        this.type = type;
        this.field = field;
      }
      #start() {
        if( this.#timer != undefined ) return;
        if( this.#queue.length == 0 ) return;
        this.#timer = setTimeout(()=>{
          while( this.#queue.length )
            this.#next();
          this.#timer = undefined;
        },DELAY);
      }
      #next() {
        const key = this.#queue.shift();
        const ev = new KeyboardEvent(this.type, key);
console.log('simulating key', ev.key, ev.code, ev, this);
        this.field.dispatchEvent(ev);
      }
      #push(key,code,opts = {}) {
        this.#pushEventObject({...opts,key,code});
      }
      #pushEventObject(opts) {
        this.#queue.push({...opts});
        this.#start();
      }
      
      space() {
        this.#push('Space', 'Space');
        return this;
      }
      backspace() {
        this.#push('Backspace', 'Backspace');
        return this;
      }
      key(key, code) {
        if( arguments.length == 1 )
          this.#pushEventObject(this.#codeToEvent(key));
        else if( arguments.length == 2 )
          this.#push(key, code)
        return this;
      }
      #codeToEvent(code) {
        if( code.match(/^[a-z]$/) ) return {key:`Key${code.toUpperCase()}`, code};
        if( code.match(/^[A-Z]$/) ) return {key:`Key${code}`, code, shiftKey: true};
        if( code.match(/^[0-9]$/) ) return {key:`Digit${code}`, code};
        if( code.match(/^F([1-9]|1[0-2])$/) ) return {key:code, code:''};
        switch( code ) {
          case 'Space': 
          case 'space': 
          case ' ': 
            return {key:'Space', code:'Space'};

          case 'Backspace': 
          case 'backspace': 
            return {key:'Backspace', code:'Backspace'};
          
          case 'escape': 
          case 'Escape': 
          case 'esc': 
            return {key:'Escape', code:'Escape'};
          
          case 'enter': 
          case 'Enter': 
            return {key:'Enter', code:'Enter'};
        }
        return {key:code, code};
      }
    }
    function simulate(args) {
      let type = 'keydown', field = document.activeElement;
      let simArgs;
      switch( args.length ) {
        case 0: 
          return;
        case 1:
          simArgs = [args[0]];
          break;
        case 2:
          simArgs = [...args].slice(0, 2);
          break;
        case 3:
          if( typeof args[0] == 'object' )
            field = args[0];
          else
            type = args[0];
          simArgs = [...args].slice(1,3);
          break;
        case 4:
        default:
          [type, field] = [...args];
          simArgs = [...args].slice(2,4);
      }
      const s = new KeySimulator(type, field);
      s.key(...simArgs);
    }
    function construct(args) {
      let type = 'keydown', field = document.activeElement;
      switch( args.length ) {
        case 0:
          break;
        case 1:
          if( typeof args[0] == 'object' )
            field = args[0];
          else
            type = args[0];
          break;
        case 2:
        default:
          [type, field] = [...args];
        
      }
      return new KeySimulator(type, field);
    }  

    if( this.constructor.name == 'KeySimulator' )
      return construct(arguments);
    else 
      sumulate(arguments);
  }




  function markAsEdited(field) {
    //const sim = new KeySimulator('keypress', field);
    //return sim.space().backspace().key('x');
    
    field.dispatchEvent(new Event('input'));
    
  }
  
  function openTextContextMenu() {
    const b1 = document.activeElement
                       ?.closest("cue-storyline")
                       ?.querySelector("cue-storyline-selection > cue-auto-scroll > cue-mouse-handler > div.storyElements > cue-lazy-story-element-editor-container:nth-child(5) > cue-lazy-load > cue-story-element-editor-container > cue-mouse-handler > cue-lazy-load > cue-insert-menu > div > button");
    if( b1 ) {
      b1.click();
      setTimeout(()=>{
        const b2 = b1.closest('cue-insert-menu').querySelector('div > div > div.left > button');
        if( b2 )
          b2.click();
        else
          console.log('B2 nciht gefunden');
      }, 100);
    }
    else {
      console.log('B1 nicht gefunden');
    }
  }
  function prettyfyOrganizationalUnits() {
    const pubs = {
      'berlin':           {sort: 10, indent: false , style: 'bm'},
      'hamburg':          {sort: 20, indent: false , style: 'ha'},
      'niedersachsen':    {sort: 30, indent: false , style: 'ni'},
      'ni bz':            {sort: 31, indent: true  , style: 'ni'},
      'ni hk':            {sort: 32, indent: true  , style: 'ni'},
      'nrw':              {sort: 40, indent: false , style: 'nrw'},
      'nrw waz':          {sort: 41, indent: true  , style: 'nrw'},
      'nrw nrz':          {sort: 42, indent: true  , style: 'nrw'},
      'nrw wp':           {sort: 43, indent: true  , style: 'nrw'},
      'nrw wr':           {sort: 44, indent: true  , style: 'nrw'},
      'nrw ikz':          {sort: 45, indent: true  , style: 'nrw'},
      'nrw talzeit':      {sort: 46, indent: true  , style: 'nrw'},
      'thüringen':        {sort: 50, indent: false , style: 'th'},
      'th ta':            {sort: 51, indent: true  , style: 'th'},
      'th otz':           {sort: 52, indent: true  , style: 'th'},
      'th tlz':           {sort: 53, indent: true  , style: 'th'},
      'system':           {sort:100, indent: false , style: 'sys'},
      'zentralredaktion': {sort:  0, indent: false , style: 'zr'},
      'ab gesamt':        {sort: 70, indent: false, style: 'ab'},
      'ab b':             {sort: 71, indent: true,  style: 'ab'},
      'ab hh':            {sort: 72, indent: true,  style: 'ab'},
      'ab nrw':           {sort: 73, indent: true,  style: 'ab'},
      'ab ni':            {sort: 74, indent: true,  style: 'ab'},
      'ab th':            {sort: 75, indent: true,  style: 'ab'},
    };
    const ul = document.querySelector('cue-form-select#organizational-units ul.options');
    if( ul == undefined || ul.sorted == true ) return;
    const lis = [...ul.querySelectorAll('li')]
                  .map(element=>({element,...pubs[element.innerText.toLowerCase()]}));
    lis.forEach(li=>{
      if( li.indent )
        li.element.classList.add('indent');
      li.element.classList.add(li.style);
      ul.removeChild(li.element);
    });
    lis.sort((a,b)=>a.sort-b.sort);
    ul.sorted = true;
    ul.append(...lis.map(li=>li.element));
    
    console.log(lis);
  }
  function initXhtmlInsertHelper() {
    const xhtmlRoot = document.querySelector('field-xhtmlinput');
    const xhtml = xhtmlRoot?.shadowRoot?.getElementById('xhtmltextarea');
    const form = xhtmlRoot?.closest('cue-field-editors');
    const title = form?.querySelector('textarea[name="title"]');
    const type = form?.querySelector('textarea[name="cmp_name"]');

    if( xhtml && type && title ) {
      xhtml.addEventListener('change', ev=>onInsertXhtml(ev,xhtml,title,type));
      [xhtml,title, type].forEach(e=>e.style.outline = '5px solid #fa0');
    }
  }
  function onInsertXhtml(ev, xhtmlField, titleField, typeField) {
    const titleRx = /^([^<]*)(.*)$/si;
    const srcRx = /\bsrc=(['"])(.*?)\1[ >]/;
    const srcTypeMap = {
      'dpa-infocom.net': 'dpa',
      'dpa-sportslive.com': 'dpa',
    }
    
    const value = ev.target.value;
    const [,title,xhtml] = value.match(titleRx) ?? [];
    
    if( !xhtml ) return;
    
    if( title && titleField.value == '' ) {
      titleField.value = title.replace(/^[\s"'']*/s, '').replace(/[\s'"]*$/s, '');
      xhtmlField.value = xhtml.replace(/^[\s"'']*/s, '').replace(/[\s'"]*$/s, '');
      markAsEdited(titleField);
    }
    if( typeField.value == '' ) {
      const src = xhtml.match(srcRx)?.[2];
      if( src ) {
        Object.entries(srcTypeMap).forEach(([k,v])=>{
          if( src.indexOf(k) >= 0 )
            typeField.value = v;
        });
        markAsEdited(typeField);
      }
    }
  }
  
  function highlightActiveDates(el) {
    const [d,t] = [...el.querySelectorAll('input')].map(i=>i.value);
    if( d.length && t.length ) {
      const date = parseDate(`${d} ${t}`);
      const now = new Date();
      const className = date > now? 'future' : date < now? 'past' : 'current';
      el.classList.remove('future','past','current');
      el.classList.add(className);
    }
  }
  
  
  window.addEventListener('load',()=>{
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
    window.addKeyHandler('Shift+ContextMenu', openTextContextMenu, {stopPropagation:true,preventDefault:true,excludeFormFields:false});
    
  
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    window.registerForReadOut('cue-list-item-versions', {
      language: 'de-DE',
      extract: node=>([...node.querySelectorAll('[data-testid="author"]'),...node.querySelectorAll('[data-testid="date"],[data-testid="time"]')].map(n=>n.innerText).join(' '))
    });
    window.registerForReadOut('input, textarea, [contenteditable="true"], .search-item', {language:'de-DE'});

    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
    window.onMutation('cue-form-select#organizational-units', {
      callback: prettyfyOrganizationalUnits
    });
    window.onMutation('cue-form-datetime#publish-date,cue-form-datetime#unpublish-date', {
      callback: highlightActiveDates,
    });
    window.onMutation('cue-field[data-test-value="com.escenic.uniqueName"] textarea', {
      callback:el=>(el.focus(),el.select()),
      runOnLoad: true,
    });
    window.onMutation('field-xhtmlinput', {
      callback: initXhtmlInsertHelper,
      runOnLoad: true,
    });
  
  
    // ================================================


  });
})();