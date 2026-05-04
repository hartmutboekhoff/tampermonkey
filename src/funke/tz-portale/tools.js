(function(){
  window.addEventListener('load',()=>{
    async function compareWithFeeds(...feeds) {
      const itemUrlRx = /<item>.*?<link>(.*?)<\/link>.*?<\item>/mgs;
      const articleIdRx = /^.*?\/article(\d+)\/.*$/;
      
      const Sorters = {
        id_asc: (a,b)=>a.id-b.id,
        id_desc: (a,b)=>b.id-a.id,
        url_asc: (a,b)=>a.url.localeCompare(b.url),
        url_desc: (a,b)=>-a.url.localeCompare(b.url),
        page: (a,b)=>{
          const aix = pageArticles.findIndex(i=>i.id==a.id);
          const bix = pageArticles.findIndex(i=>i.id==b.id);
          return aix == bix ? 0 :
                 aix < 0? 1 :
                 bix < 0? -1 : 
                 aix - bix;
        }
      }
      function mergeLists(...ls) {
        const merged = {};
        ls.forEach((l,ix)=>l.reduce((agg,article)=>{
          agg[article.id] ??= {...article};
          agg[article.id][ix] = true;
          return agg;
        }, merged));
        return Object.values(merged);
      }
      async function fetchFeedList(feed) {
        if( feed == undefined || feed == '' || feed == 'rss' )
          feed = location.href + (location.href.endsWith('/')? 'rss' : '/rss');
        else if( feed.startsWith('/') )
          feed = location.origin + feed;
        else if( feed.startsWith('?') )
          feed = location.href + feed;
        else if( feed.startsWith(':') )
          feed = location.protocol + feed;

        console.log('fetching feed data from:', feed);
        return await fetch(feed)
          .then(r=>r.status == 200? r.text() : '')
          .then(t=>[...t.matchAll(itemUrlRx)]
            .map(item=>item[1])
            .filter(url=>!!url)
            .map(url=>({url, id:url.match(articleIdRx)?.[1]}))
            .filter(article=>!!article.id)
          );
      }
      function createOverlapTable(names, feeds, compared) {
        const overlaps = names
          .map(rowName=>names.reduce((agg,colName)=>(agg[colName]=0, agg),
                                     {rowName, feed:rowName}));
        compared.forEach(article=>{
          overlaps.forEach(row=>{
            if( article[row.rowName] != ' ' )
              names.forEach(colName=>{if( article[colName] != ' ' ) ++row[colName]})
          })
        });
        overlaps.unshift(names.reduce((agg,n,ix)=>{
          agg[n] = feeds[ix].length;
          return agg;
        },
        { feed: 'Artikel im Feed' }));
        
        return overlaps;
      }
       
      
      const options = typeof feeds.at(-1) == 'object'? feeds.pop() : {};

      const pageArticles = [...document.querySelectorAll('a')]
        .map(a=>({url:a.href, id:a.href.match(articleIdRx)?.[1]}))
        .filter(article=>!!article.id);

      const feedLists = await Promise.all(feeds.map(f=>fetchFeedList(f)));

      const compared = mergeLists(pageArticles, ...feedLists);
      const sorter = Sorters[options.sort];
      if( sorter )
        compared.sort(sorter);

      const listNames = ['web-page', ...feeds];
      compared.forEach(c=>{
        listNames.forEach((n,ix)=>c[n] = c[ix]? c.id : ' ');
        c.path = c.url.replace(location.origin, '');
      });

      //console.log(compared);
      console.table(compared, [...listNames, 'path']);

      const overlaps = createOverlapTable(listNames, [pageArticles, ...feedLists], compared);
      console.table(overlaps, ['feed', ...listNames]);
    }
    
    const scr = document.createElement('script');
    scr.id = 'HBO_FeedComparer';
    scr.appendChild(document.createTextNode(compareWithFeeds.toString()));
    document.head.appendChild(scr);

  });
})();

// ------------------------------------------------------------------
console.log(GM_info.script.name, 'Version '+GM_info.script.version, 'funke/tz-portale/tools.js', 'Version '+COMMON_VERSION);
