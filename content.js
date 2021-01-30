chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'inject') {
    // Clean all existing info cards
    const elements = document.querySelectorAll('.dj-page-contacts-card');
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
          <div class="dj-page-contacts-card">
            <p><strong>${name}</strong></p>
            <p><strong>Team: </strong>${teamName}</p>
            <p><strong>Email: </strong>${`<a href="mailto:${teamEmail}">${teamEmail}</a>`}</p>
            <p><strong>Slack: </strong>${`<a href="https://dowjones.slack.com/channels/${slackChannel}">#${slackChannel}</a>`}</p>
          </div>
        `;
        element.insertAdjacentHTML('beforeend', html);
      }
    }
  }
});
