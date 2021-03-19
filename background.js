chrome.runtime.onInstalled.addListener(async () => {
  const pages = await fetch(chrome.runtime.getURL('src/data/pages.json')).then(response => response.json()).then(json => json);
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: pages.map(page => {
        return new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { urlMatches: page.match }
        });
      }),
      actions: [
        new chrome.declarativeContent.ShowPageAction(),
      ]
    }]);
  });
});
