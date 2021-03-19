import { Icon } from 'react-icons-kit';
import { envelope } from 'react-icons-kit/fa/envelope';
import { slack } from 'react-icons-kit/fa/slack';

const Team = ({ name, email, 'slack-channel': slackChannel }) => (
  <details className="card">
    <summary>{name}</summary>
    <ul>
      {email && (
        <li>
          <Icon icon={envelope} /><a href={`mailto:${email}`}>{email}</a>
        </li>
      )}
      {slackChannel && (
        <li>
          <Icon icon={slack} /><a href={`https://dowjones.slack.com/channels/${slackChannel}`}>{`#${slackChannel}`}</a>
        </li>
      )}
    </ul>
  </details>
);

export default Team;
