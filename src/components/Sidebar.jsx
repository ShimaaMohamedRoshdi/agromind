import React from 'react';

function Sidebar({ lands, onSelectLand }) {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '20px' }}>
      <h2>My Lands</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {lands.map((land) => (
          <li key={land.id} style={{ marginBottom: '10px' }}>
            <button onClick={() => onSelectLand(land)} style={{ width: '100%' }}>
              {land.landName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
