import React from 'react';
import { NavLink } from 'react-router-dom';
const GroupRecommendations = ({ data, handler }) => {

  const recommendedGroups = data.slice(0, 10).map((group) => {
    return (
      <div className="single-Group-Recommended-grid" key={group.id}>
         <div className="single-Group-Recommended-image">
           <a href={`/groups/${group.id}/`}>
             <img src={ group.attributes.picture_main } alt="Company" />
           </a>
         </div>
         <div id="single-Group-Recommended-item">
           <div className="single-Group-Recommended-title">
             <a href={`/groups/${group.id}/`}>
               { group.attributes.title }
             </a>
           </div>

           <div id="single-Group-Recommended-members">
           <br />
             { group.attributes.followers_count } Members
           </div>
           <div id="single-Group-Recommended-bio">
           <br />
           { group.attributes.description ? (
            <React.Fragment>
            { group.attributes.description.length > 55 ? (
            <div>{ group.attributes.description.substring(0, 55) + '...' }</div>
            ) : (<div>{group.attributes.description}</div>)}
            </React.Fragment>
            ) : null }
           </div>
          </div>
          <button
            id={ group.id }
            onClick={ handler }
            className="single-Group-recommended-btn"
          >
            Join
          </button>
       </div>

    );
  });

  return (
    <div className="single-Group-Recommended-body">
      { recommendedGroups }
    </div>
  )
}
export default GroupRecommendations;
