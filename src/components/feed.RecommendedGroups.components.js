import React from 'react';
import { NavLink } from 'react-router-dom';

const RecommendedGroups = ({ image, title, followers, id, handler, close }) => {
    return (
    <React.Fragment>
      <div className="Recommended-Group-grid" key={id}>
        <div className="Recommended-Group-image">
          <NavLink to={`groups/${id}/`}>
            <img src={ image } alt="Group" />
          </NavLink>
        </div>
        <div className="Recommended-Group-right">
          <div className="Recommended-Group-title">
            <NavLink to={`groups/${id}/`}>
              { title }
            </NavLink>
          </div>
          <div id="Recommend-Group-btn">
            <button
                id={ id }
                onClick={ handler }
                className="recommended-Group-btn"
              >
              Join
            </button>
          </div>
        </div>
      </div>

    </React.Fragment>
    );
  }

export default RecommendedGroups;
//<button id={id} name="Group" className="Recommended-Group-X-button" onClick={close}> X </button>

        // <div id="Recommended-Group-item">
        //   <div id="Recommended-Group-members">
        //   <br />
        //     { followers } Members
        //   </div>
        // </div>