import React from 'react';
import { NavLink } from 'react-router-dom';

const CompanyAdmin = ({ data, selected, connections, select }) => {
  let adminStorage = [];

  const selectedAdmin = connections.map(connection => {
    for (var i = selected.length - 1; i >= 0; i--) {
      if(selected[i] === parseInt(connection.id)) {
        adminStorage.push(connection);
      }
    }
  });

  const companyAdmin = data.map((admin) => {
    let admins = admin.attributes;
    if(admin.attributes.user.id === parseInt(localStorage.id)) {
      return (
        <div className="CompanyAdmin-you-item" key={admin.id} id={admin.id} >
          <div id="CompanyAdmin-profile-photo">
          <a href={`/users/${admin.id}`}>
            <img src={ admins.user.avatar_medium } alt="profile" />
          </a>
          </div>
          <div className="CompanyAdmin-Info" id={admin.id}>
            <div className="CompanyAdmin-Name" id={admin.id}>
               You
            </div>
            { admins.occupation && (
            <div className="CompanyAdmin-Data" id={admin.id}>
              { admins.user.occupation }
            </div>
            )}
          </div>
        </div>
      );
    }
    return (
       <div className="CompanyAdmin-item" key={admin.id} id={admin.id} >
         <div id="CompanyAdmin-profile-photo">
         <a href={`/users/${admin.id}`}>
           <img src={ admins.user.avatar_medium } alt="profile" />
         </a>
         </div>
         <div className="CompanyAdmin-Info" id={admin.id}>
           <div className="CompanyAdmin-Name" id={admin.id}>
              { admins.user.name }
           </div>
           { admins.occupation && (
           <div className="CompanyAdmin-Data" id={admin.id}>
             { admins.user.occupation }
           </div>
           )}
         </div>
       </div>
    );
  });

  const adminNames = data.map(admin => {
    if(admin.attributes.user.id === parseInt(localStorage.id)) {
      return (
        <div className="CompanyAdmin-banner-name" style={{ paddingRight: '15px', background: '#babac8'}} key={admin.id}>
          You
        </div>
      )
    }
    return (
      <React.Fragment>
        <div className="CompanyAdmin-banner-name" style={{ paddingRight: '15px'}} key={admin.id}>
          {admin.attributes.user.name}
        </div>
      </React.Fragment>
    )
  })

  const newAdminNames = adminStorage.map(admin => {
    return (
      <React.Fragment>
        <div className="CompanyAdmin-banner-name" key={admin.id}>
          {admin.attributes.name}
          <button
            className="CompanyAdmin-banner-close-btn"
            type="button"
            id={admin.id}
            onClick={select} >
            X
          </button>
        </div>
      </React.Fragment>
    )
  })

  const newAdmin = adminStorage.map(admin => {
    return (
     <div className="CompanyAdmin-item" key={admin.id} >
       <div id="CompanyAdmin-profile-photo">
       <a href={`/users/${admin.id}`}>
         <img src={ admin.attributes.avatar_medium } alt="profile" />
       </a>
       </div>
       <div className="CompanyAdmin-Info">
         <div className="CompanyAdmin-Name">
            { admin.attributes.name }
         </div>
         { admin.attributes.occupation && (
         <div className="CompanyAdmin-Data">
           { admin.attributes.occupation }
         </div>
         )}
       </div>
     </div>
    )
  })

  return (
    <div className="CompanyAdmin-body">
      <div className="AddAdmin-subline">
        ADMIN
      </div>
      <div className="CompanyAdmin-Names">
        { adminNames }
        { newAdminNames }
      </div>
      { companyAdmin }
      { newAdmin }
    </div>
  )
}
export default CompanyAdmin;
