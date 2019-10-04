import React from 'react';
import { NavLink } from 'react-router-dom';

const Experience = ({ data, connect, disconnect }) => {
  const userConnections = data.map((connection) => {
    let connections = connection.attributes;
      return (
        <div className="Connections-body" key={connection.id}>
          <div id="connections-profile-photo">
            <img src={ connections.avatar_medium } alt="profile" />
          </div>
          <div id="connections-item">
            <div className="titledate">
             { connections.name }
            </div>
            <div id="userProfile-Data">
            { connections.city }
            </div>
            <div id="userProfile-Data">
            { connections.company.name }
            </div>
          </div>
          { connection.id !== localStorage.id ? ( // if this is you, don't show buttons
          <div>
          { !connections.is_followed_by_current ? (
            <button id={ connection.id } onClick={ connect } className="userProfile-btn">
              connect
            </button>
            ) : (
              <button id={ connection.id } onClick={ disconnect } className="userProfile-btn-connected">
                <span>Connected</span>
              </button>
            )}
          </div>
          ) : null }
        </div>
      );
    });

  return (
    <div>
    { userConnections }
    </div>
  )
}
export default Experience;
