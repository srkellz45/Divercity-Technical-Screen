import React from 'react';
import { NavLink } from 'react-router-dom';
import emptyCheck from '../assets/AdminEmptyCheckmark.png';
import check from '../assets/AdminCheckmark.png';

const AdminConnections = ({ data, select, checked, admin }) => {
  let adminAddConnections;
  for(let i = 0; i < admin.length; i++) { // filters out Admin from Connections side
  let results = data.filter(conn => {
      return parseInt(conn.id) !== admin[i].attributes.user.id;
  });
  adminAddConnections = results.map((connection) => {
    let connections = connection.attributes;
    return (
      <div className="AdminConnections-item" key={connection.id} id={connection.id} onClick={select}>
        <div className="AdminConnections-check" id={connection.id}>
          { checked.indexOf(parseInt(connection.id)) === -1 ? <img src={ emptyCheck } alt="checkbox" id={connection.id} /> : <img src={ check } alt="checkbox" id={connection.id} /> }
        </div>
        <div id="AdminConnections-profile-photo">
        <a href={`/users/${connection.id}`}>
          <img src={ connections.avatar_medium } alt="profile" />
        </a>
        </div>
        <div className="AdminConnections-Info" id={connection.id}>
          <div className="AdminConnections-Name" id={connection.id}>
             { connections.name }
          </div>
          { connections.occupation && (
          <div className="AdminConnections-Data" id={connection.id}>
            { connections.occupation }
          </div>
          )}
          { connections.school_name && (
          <div className="AdminConnections-Data" id={connection.id}>
            { connections.school_name }
          </div>
          )}
        </div>
      </div>
    );
  });
}

  return (
    <div className="AddAdmin-connections-body">
      <div className="AddAdmin-subline">
        CONNECTIONS
      </div>
      { adminAddConnections }
    </div>
  )
}
export default AdminConnections;
