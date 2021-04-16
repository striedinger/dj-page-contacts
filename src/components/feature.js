import { Icon } from 'react-icons-kit';
import { crosshairs } from 'react-icons-kit/fa/crosshairs';
import Team from './team';

const Feature = ({ handleFocus, id, isPresent, name, match, team }) => {
  const handleClick = () => {
    if (typeof handleFocus === 'function') handleFocus(match);
  };
  return (
    <details className="card">
      <summary>{name}</summary>
      <div className="content">
        {team && <Team {...team} />}
        <button id={`feature-${id}`} onClick={handleClick} disabled={!isPresent}><Icon icon={crosshairs} /> Find</button>
      </div>  
    </details>
  );
};

export default Feature;
