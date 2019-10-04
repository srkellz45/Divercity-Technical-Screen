import React from 'react';

const PeopleGroups = ({ data, joinGroup, requestAccess }) => {
  const SearchGroups = data.map((group) => {
    let groups = group.attributes;
      return (
        <div className="People-Connections-body" key={group.id}>
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
            <div className="connections-Followers">
            { groups.followers_count } followers
            </div>
          </div>
          { groups.group_type === "private" ? ( // if the group is private
            <React.Fragment>
              { !groups.is_followed_by_current ? ( // if user isn't following group, show button
                <div id="People-Group-btn">
                { groups.request_to_join_status === "pending" ? (
                    <button
                      id={ group.id }
                      className="People-Group-member-btn"
                    >
                    Request Pending
                  </button>
                ) : (
                  <button
                      id={ group.id }
                      onClick={ requestAccess }
                      className="People-Group-btn"
                    >
                    Request Access
                  </button>
                )}
                </div>
              ) : (
              <div id="People-Group-btn">
                <button
                    id={ group.id }
                    className="People-Group-member-btn"
                  >
                  Member
                </button>
              </div>
              ) }
            </React.Fragment>
          ) : ( // if the group is PUBLIC
            <React.Fragment>
            { !groups.is_followed_by_current ? ( // if user isn't following group, show button
              <div id="People-Group-btn">
                <button
                    id={ group.id }
                    onClick={ joinGroup }
                    className="People-Group-btn"
                  >
                  Join
                </button>
              </div>
            ) : (
            <div id="People-Group-btn">
              <button
                  id={ group.id }
                  className="People-Group-member-btn"
                >
                Member
              </button>
            </div>
            ) }
          </React.Fragment>
        )}
        </div>
      );
    });

  return (
    <div>
    { SearchGroups }
    </div>
  )
}
export default PeopleGroups;
