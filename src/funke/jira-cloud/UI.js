(function(){
  window.addEventListener('load',()=>{
    
    
    // ================================================
    console.log('initializing shortcut-keys');
    //window.addKeyHandler('Space',ev=>alert('key pressed'));
  
  
    // ================================================
    console.log('initializing read-out elements');
    //window.registerForReadOut('selector');
    window.registerForReadOut('div[data-editor-container-id="issue-description-editor"]');
    window.registerForReadOut('div[data-testid="issue.activity.comments-list"] > div > span > div > div:nth-child(2)', {
      exclude: ['button'],
      childElements: {
        'h3': {
          extract: node=>node.querySelectorAll('span>div, span>span'),
        }
      }
    });
    window.registerForReadOut('div[data-testid="issue-view-layout-templates-default.ui.foundation-content.foundation-content-wrapper"] h1');
    window.registerForReadOut('div:has(>li>a[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"])');

    window.registerForReadOut('div[data-test-id="software-board.board-area"] section li', {
      readHidden: true,
      exclude: ['img', 'span[id$="-tooltip"]'],
      childElements: {
        'a': {
          extract: node=>node.getAttribute('href').slice(8)
        },
        'span[data-testid="issue-field-assignee.common.ui.read-view.popover.avatar--label"]': {
          extract: node=>node.innerText.match(/:(.*)$/)?.[1]??'',
        },
        'div[data-component-selector="platform-card.ui.card.card-content.content-section"] span': {
          extract: node=>node.innerText,
        }
      }
    });
    window.registerForReadOut('div[data-testid="issue.issue-view.views.common.child-issues-panel.issues-container"] ul>div',{
      exclude: ['img', 'div[data-testid="issue-line-card.ui.estimate.estimate-field"]']
    });
    window.registerForReadOut('li[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.list-item"]', {
      exclude: ['img', 'div[role]']
    });
    window.registerForReadOut('div[data-vc="issue-table-main-container"] table tr[data-testid="native-issue-table.ui.issue-row"] td', {
      exclude: ['img'],
      useAriaLabels: true,
    });

    window.registerForReadOut('div[data-testid="issue-field-inline-edit-read-view-container.ui.container"]',{
      exclude: 'button'
    });



    // ================================================
    console.log('initializing mutation-reactions');
    //window.onMutation('selector', reaction);
    window.onMutation('a[href^="https://cue.funke.cue.cloud/"]', {
      runOnLoad: true,
      listeners: {
        click: ev=>{
          ev.preventDefault();
          ev.stopPropagation();
          
          navigator.clipboard.writeText(ev.target.href)
            .then(result=>{
              const oldBg = ev.target.style.backgroundColor;
              ev.target.style.backgroundColor = '#8f4';
              ev.target.style.transition = '';
              window.setTimeout(()=>{
                ev.target.style.backgroundColor = oldBg;
                ev.target.style.transition = 'background-color 2s ease-in-out 0.5s';
              }, 1000);
            })
            .catch(reason=>{
              ev.target.style.backgroundColor = '#f44';
              console.log(reason);
            });
        }
      }
    });
  
      // ================================================


  });
})();