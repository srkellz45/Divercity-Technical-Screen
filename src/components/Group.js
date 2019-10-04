import React from 'react';
//import { NavLink } from 'react-router-dom';
const Group = ({ data, id }) => {
    return (
        <div className="Group-item"  key={id}>
          <div id="Group-description">
            { data.title }
          </div>
        </div>

    );
  }

export default Group;
