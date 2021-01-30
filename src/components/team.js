import React from 'react';

const Team = ({ name, email, 'slack-channel': slackChannel }) => (
  <details className="card">
    <summary>{name}</summary>
    <ul>
      {email && (
        <li>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
      )}
      {slackChannel && (
        <li>
          <a href={`https://dowjones.slack.com/channels/${slackChannel}`}>{`#${slackChannel}`}</a>
        </li>
      )}
    </ul>
  </details>
);

export default Team;
