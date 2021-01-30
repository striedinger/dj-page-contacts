const CARD_CLASS = 'dj-page-contacts-card';

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'inject') {
    // Clean all existing info cards
    const elements = document.querySelectorAll(`.${CARD_CLASS}`);
    for (let i=0;i<elements.length;i++) {
      const element = elements[i];
      element.parentNode.removeChild(element);
    }
    // Add new info cards to existing page features
    const { features } = message;
    for (let i=0;i<features.length;i++) {
      const { name, team } = features[i];
      const { name: teamName, email: teamEmail, 'slack-channel': slackChannel } = team || {};
      const element = document.querySelector(features[i].match);
      if (element) {
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
  }
  if (message.type === 'focus') {
    const element = document.querySelector(message.match);
    if (element) {
      element.scrollIntoView();
      element.focus();
    }
  }
});
