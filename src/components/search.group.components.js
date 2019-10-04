import React from 'react';


const GroupResults = ({ data }) => {
  const SearchGroups = data.map((group) => {
    let groups = group.attributes;
      return (
        <div className="Connections-body" key={group.id}>
          <div id="connections-profile-photo">
          <a href={`/groups/${group.id}`}>
            <img src={ groups.picture_main } alt="profile" />
          </a>
          </div>
          <div id="connections-item">
            <div id="connections-Name">
            <a href={`/groups/${group.id}`}>
             { groups.title }
            </a>
            </div>
            <div id="connections-Data">
            { groups.description }
            </div>
          </div>
        </div>
      );
    });

  return (
    <div>
    { SearchGroups }
    </div>
  )
}
export default GroupResults;
