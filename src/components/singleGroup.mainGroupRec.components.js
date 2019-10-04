import React from 'react';
import { NavLink } from 'react-router-dom';
const MainGroupRecommendations = ({ data, handler }) => {

  const recommendedGroups = data.slice(0, 3).map((group) => {
  let hacksaw = (group.attributes.title.substring(0, 20) + '...');
    return (
      <div className="single-Group-main-Recommended-grid" key={group.id}>
         <div className="single-Group-main-Recommended-image">
           <a href={`/groups/${group.id}/`}>
             <img src={ group.attributes.picture_main } alt="Company" />
           </a>
         </div>
         <div id="single-Group-main-Recommended-item">
           <div className="single-Group-main-Recommended-title">
             <a href={`/groups/${group.id}/`}>
              { group.attributes.title.length < 20 ? // basically if the job title is too long, cut it off based on string length
              ( <div> { group.attributes.title } </div> ) :  hacksaw }
             </a>
           </div>

           <div id="single-Group-main-Recommended-members">
           <br />
             { group.attributes.followers_count } Members
           </div>
          </div>
        { group.attributes.is_followed_by_current ? (
          <button
            id={ group.id }
            className="single-Group-following-main-recommended-btn"
          >
            Member
          </button>
        ) : (
          <button
            id={ group.id }
            onClick={ handler }
            className="single-Group-main-recommended-btn"
          >
            Join
          </button>
        )}
      </div>
    );
  });

  return (
    <div className="single-Group-main-Recommended-body">
      { recommendedGroups }
    </div>
  )
}
export default MainGroupRecommendations;
