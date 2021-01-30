import React from 'react';
import { Icon } from 'react-icons-kit';
import { crosshairs } from 'react-icons-kit/fa/crosshairs';
import Team from './team';

const Feature = ({ id, name, match, tabId, team }) => {
  const handleClick = () => {
    chrome.tabs.sendMessage(tabId, { type: 'focus', match });
  };
  return (
    <details className="card">
      <summary>{name}</summary>
      <div className="content">
        {team && <Team {...team} />}
        <button id={`feature-${id}`} onClick={handleClick}><Icon icon={crosshairs} /> Find</button>
      </div>  
    </details>
  );
};

export default Feature;
