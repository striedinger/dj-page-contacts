const CARD_CLASS = 'dj-page-contacts-card';

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'inject-features') {
    // Clean all existing info cards
    const elements = document.querySelectorAll(`.${CARD_CLASS}`);
    for (let i=0;i<elements.length;i++) {
      const element = elements[i];
      element.parentNode.removeChild(element);
    }
    // Add new info cards to existing page features
    const { features } = message;
    const validatedFeatures = [...features];
    const length = features.length;
    for (let i=0;i<length;i++) {
      const { name, team } = features[i];
      const { name: teamName, email: teamEmail, 'slack-channel': slackChannel } = team || {};
      const element = document.querySelector(features[i].match);
      validatedFeatures[i].isPresent = !!element;
      if (element) {
        // Needed for absolute positioning of ownership cards
        element.style.position = 'relative';
        const html = `
          <div class="${CARD_CLASS}">
            <h3>${name}</h3>
            <p>${teamName}</p>
            <p><strong>Email: </strong>${`<a href="mailto:${teamEmail}">${teamEmail}</a>`}</p>
            <p><strong>Slack: </strong>${`<a href="https://dowjones.slack.com/channels/${slackChannel}">#${slackChannel}</a>`}</p>
          </div>
        `;
        element.insertAdjacentHTML('beforeend', html);
      }
    }
    // Sends list of features actually present in page
    chrome.runtime.sendMessage({ type: 'validated-features', features: validatedFeatures });
  }
  if (message.type === 'get-article-id') {
    // If on article page, send id to popup
    const articleId = document.querySelector('meta[name="article.id"]');
    const env = document.documentElement.dataset.env;
    if (articleId) chrome.runtime.sendMessage({ type: 'article-id', articleId: articleId.getAttribute('content'), env });
  }
  if (message.type === 'focus-feature') {
    const element = document.querySelector(message.match);
    if (element) {
      element.scrollIntoView();
      element.focus();
    }
  }
});
