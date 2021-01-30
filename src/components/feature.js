import React from 'react';
import Team from './team';

const Feature = ({ id, name, team }) => {
  const handleClick = () => {
    console.log(`clicking feature id ${id} - ${name}`);
  };
  return (
    <details className="card">
      <summary>{name}</summary>
      <div className="content">
        <button id={`feature-${id}`} onClick={handleClick}>Locate</button>
        <h3>Team</h3>
        {team && <Team {...team} />}
      </div>  
    </details>
  );
};

export default Feature;
