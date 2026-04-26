console.log('%cDEPRECATED ??? /funke/tz-portale/styles.js', 'background-color: red, color: white; font-size: 200%;');

(function(){
  function showInfo() {
    const s = document.createElement('script');
    s.innerText = `
      const id = window.SPARK.trackingData.pageArticleID ?? window?.SPARK?.debugPageData?.article?.articleId;
      alert( id ?? "Artikel-ID unbekannt");
    `;
    document.head.appendChild(s);
  }
  
  window.addKeyHandler('Ctrl+F1',showInfo);
})();