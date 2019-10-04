import React from 'react';
//import { NavLink } from 'react-router-dom';

const Application = ({ data, id, cancelHandler, viewHandler }) => {
    if(data.attributes.canceled === false) {
      return (
        <div className="Job-grid" key={id}>
          <div className="ApplyJob-box">
            <div className="Applied-Job-title">
              { data.attributes.job_title }
            </div>
            <div id="Applied-Job-company">
              <a href={`/company/${data.attributes.employer.id}`}>
                { data.attributes.employer.name }
              </a>
            </div>
            <div id="Job-location">
              { data.attributes.employer.address }
            </div>
          </div>
          <div className="Job-buttons">
            <button
              id={ data.attributes.job_id }
              onClick={ viewHandler }
              className="ApplyJob-btn"
            >
              View My Application
            </button>
            <button
             id={ data.attributes.job_id }
             onClick={ cancelHandler }
             className="ApplyJob-btn"
            >
              Cancel Application
            </button>
          </div>
        </div>
      )
    } else return null;
}


export default Application;