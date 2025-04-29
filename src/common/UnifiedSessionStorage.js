(function() {
  const ProjectsKey = 'GM-Projects';
  
  class UnifiedGmSessionStorage {
    #project; #location;
    
    constructor(priority=100) {
      this.#location = location;
      this.#project = GM_info.script.name;
      
      const list = this.#getProjects().filter(p=>p.name!=this.#project);
      list.push({name:this.#project,priority});
      const sorted = list
        .map((p,index)=>({...p, index}))
        .sort((a,b)=>a.priority!=b.priority? a.priority-b.priority : a.index-b.index)
        .map(({name, priority})=>({name, priority}));

      sessionStorage.setItem(ProjectsKey, JSON.stringify(sorted));

      console.log('GM-Projects:',  sorted);
    }
    #getProjects() {
      const v = sessionStorage.getItem(ProjectsKey);
      return v? JSON.parse(v) : [];
    }
    #getKey(key, project) {
      return (project??this.#project)+'#'+key
    }
    setItem(key, value) {
      sessionStorage.setItem(this.#getKey(key), JSON.stringify(value));
    }
    getItem(key) {
      const v = sessionStorage.getItem(this.#getKey(key));
      return v? JSON.parse(v) : v;
    }
    getAllItems(key) {
      return this.#getProjects()
              .map(p=>{
                const v = sessionStorage.getItem(p.name+'#'+key);
                return {...p, value: v? JSON.parse(v) : undefined};
              });
    }
    getMergedItem(key) {
      const items = this.getAllItems(key);
      if( items.every(i=>Array.isArray(i.value)) )
        // merge arrays
        return items.reduce((acc, i)=>([...acc, ...i.value]), []);
      else if( items.every(i=>typeof i.value == 'object' && !Array.isArray(i.value)) )
        // merge objects
        return items.reduceRight((acc, i)=>({...acc, ...i.value}), {});
      else if( items.every(i=>typeof i.value != 'object') )
        // get first non-null primitive value
        return items.find(i=>i.value!=undefined)?.value;
      else if( items.every(i=>i.value == undefined) )
        return undefined;
      else
        // return unmerged list?
        return items; // should this be undefined or exception?
    }
    removeItem(key) {
      sessionStorage.removeItem(this.#getKey(key));
    }
    removeAllItems(key) {
      this.#getProjects().forEach(p=>sessionStorage.removeItem(p.name+'#'+key));
    }
  }
  
  let instance;
  
  if( window.GM_sessionStorage == undefined ) {
    window.GM_sessionStorage = function(priority) {
      instance ??= new UnifiedGmSessionStorage(priority);
      return instance;
    };
    
    window.GM_sessionStorage.setItem = function(...args) {return window.GM_sessionStorage().setItem(...args);};
    window.GM_sessionStorage.getItem = function(...args) {return window.GM_sessionStorage().getItem(...args);};
    window.GM_sessionStorage.getAllItems = function(...args) {return window.GM_sessionStorage().getAllItems(...args);};
    window.GM_sessionStorage.getMergedItem = function(...args) {return window.GM_sessionStorage().getMergedItem(...args);};
    window.GM_sessionStorage.removeItem = function(...args) {return window.GM_sessionStorage().removeItem(...args);};
    window.GM_sessionStorage.removeAllItems = function(...args) {return window.GM_sessionStorage().removeAllItems(...args);};
    
  }
  //return window.GM_sessionStorage;
})();

// ------------------------------------------------------------------
console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'common/UnifiedSessionStorage.js', 'Version '+COMMON_VERSION);
