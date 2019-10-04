import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';
const Saved = ({ data, id, handler, unsave }) => {
let skills = data.attributes.skills_tag.toString();
    return (
      <div className="Job-grid" key={id}>
        <div className="Job-top">
          <div id="Job-Recruiter">
            <div id="job-recruiter-photo">
              <img src={ data.attributes.recruiter.avatar_medium } alt="recruiter" />
            </div>
            <div id="job-recruiter-info">
              <div id="job-recruiter-name">
                <NavLink to={`/users/${data.attributes.recruiter.id}`} alt="select-user">
                 { data.attributes.recruiter.name }
                </NavLink>
              </div>
              <div id="job-recruiter-title">
              { data.attributes.recruiter.occupation }
              <br />
              Posted { Moment(data.attributes.published_on).fromNow() }
              </div>
            </div>
          </div>
          <div className="Job-middle">
            <div>
              <div className="Job-title">
                { data.attributes.title }
              </div>
              <div id="Job-company">
                  <a href={`/company/${data.attributes.employer.id}`}>
                    { data.attributes.employer.name }
                  </a>
              </div>
              <div id="Job-location">
                { data.attributes.location_display_name }
              </div>
            </div>
            <div className="Job-buttons">
              <button
                id={ id }
                onClick={ handler }
                className="Job-btn"
              >
                View Job
              </button>
              <button
                id={ id }
                onClick={ unsave }
                className="Job-btn"
              >
                Un-Save Job
              </button>
            </div>
          </div>
          <hr />
        </div>


        <div id="Job-item">
          <div className="Job-Description-titles">
            <div id="Job-description-title-title">
              Job Type
            </div>
            <div id="Job-description-title">
              Required Experience
            </div>
            <div id="Job-description-title">
              Skills
            </div>
          </div>
          <div className="Job-Description-data">
            <div id="Job-skills-title">
             { data.attributes.job_type_info.name }
            </div>
            <div id="Job-skills">
             3-5 Years
            </div>
            <div id="Job-skills-skills">
             { skills.replace(/,/g, ", ") }
            </div>
          </div>
          <hr />
          <div id="Job-item">
            <div className="Job-Description">
              <div id="Job-description-title">
                Job Description
              </div>
              <div id="Job-bio">
                <div dangerouslySetInnerHTML={{ __html: `${ data.attributes.description }`}} />
              </div>
            </div>
          </div>
        </div>
        <br />
        { data.attributes.is_applied_by_current  ? (<div> You've applied to this job </div>) : (null) }
      </div>
    );
  }
export default Saved;