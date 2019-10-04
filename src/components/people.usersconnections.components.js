import React from 'react';
import { NavLink } from 'react-router-dom';
import ConnectIcon from '../assets/icons/Connection.png';
import Pending from '../assets/icons/Pending.png';
import ConnectedIcon from '../assets/icons/ConnectedIcon.png';
import DMIcon from '../assets/icons/DM.png';

const UsersConnections = ({ data, connect, disconnect }) => {
  let addDefaultSrc = (evt) => {
    evt.target.src = 'https://s3-us-west-2.amazonaws.com/pinc-backend/images/cdn/avatars/Profile1.png';
  };
  const userConnections = data.map((connection) => {
    let connections = connection.attributes;
      return (
        <React.Fragment>
          { connections.is_followed_by_current ? (
            <div className="People-Connections-body" key={connection.id}>
              <div id="connections-profile-photo">
              <a href={`/users/${connection.id}`}>
                <img src={ connections.avatar_medium } onError={ addDefaultSrc } alt="profile" />
              </a>
              </div>
              <div id="connections-item">
                <div id="connections-Name">
                <a href={`/users/${connection.id}`}>
                 { connections.name }
                </a>
                </div>
                { connections.occupation ? (
                <div id="connections-Data">
                  { connections.occupation }
                </div>
                ) : (
                <React.Fragment>
                { connections.account_type === 'job_seeker' ? (
                  <div id="connections-Data">
                    Job Seeker
                  </div> ) : (null)
                  }
                  { connections.account_type === 'professional' ? (
                  <div id="connections-Data">
                    Professional
                  </div> ) : (null)
                  }
                  { connections.account_type === 'recruiter' ? (
                  <div id="connections-Data">
                    Recruiter
                  </div> ) : (null)
                  }
                  { connections.account_type === 'hiring_manager' ? (
                  <div id="connections-Data">
                    Hiring Manager
                  </div> ) : (null)
                  }
                  { connections.account_type === 'student' ? (
                  <div id="connections-Data">
                    Student
                  </div> ) : (null)
                  }
                  { connections.account_type === 'entrepreneur' ? (
                  <div id="connections-Data">
                    Entrepreneur
                  </div> ) : (null)
                  }
                  </React.Fragment>
                )}
              </div>
              <React.Fragment>
                { connection.id !== localStorage.id ? ( // if this is you, don't show buttons
                <React.Fragment>
                  { connections.connected === "connected" ? (
                    <div className="Connect-icons">
                      <img src={ConnectedIcon} className="Company-connected-icon" alt="Connect" id={ connection.id } onClick={ disconnect }/>
                      <NavLink to={`/users/${localStorage.id}/chats/${connection.id}`} >
                        <img src={DMIcon} className="Company-dm-icon" alt="Direct Message"/>
                      </NavLink>
                    </div>
                  ) : null }
                  { connections.connected === "requested" ? (
                    <div className="Connect-icons">
                      <img src={Pending} className="Company-connected-icon" alt="Connect" id={ connection.id } onClick={ disconnect }/>
                      <NavLink to={`/users/${localStorage.id}/chats/${connection.id}`} >
                        <img src={DMIcon} className="Company-dm-icon" alt="Direct Message"/>
                      </NavLink>
                    </div>
                  ) : null }
                  { connections.connected === "not_connected" ? (
                    <div className="Connect-icons">
                      <img src={ConnectIcon} className="Company-connected-icon" alt="Connect" id={ connection.id } onClick={ connect }/>
                      <NavLink to={`/users/${localStorage.id}/chats/${connection.id}`} >
                        <img src={DMIcon} className="Company-dm-icon" alt="Direct Message"/>
                      </NavLink>
                    </div>
                  ) : (null) }
                </React.Fragment>
                ) : null }
              </React.Fragment>
            </div>
          ) : ( null ) }
        </React.Fragment>
      );
    });

  return (
    <div>
    { userConnections }
    </div>
  )
}
export default UsersConnections;
