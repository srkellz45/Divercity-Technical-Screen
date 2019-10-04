import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';
const JobApply = ({ data, apply, save, close, openEdit }) => {
  let skills = data.attributes.skills_tag.toString();
    return (
      <div className="Apply-Job-grid" key={data.id}>
        <div id="Apply-Job-photo">
            <img src={ data.attributes.employer.photos.medium } alt="Job Logo" />
          </div>
        <div className="Apply-Job-title">
          { data.attributes.title }
        </div>
        <div id="Apply-Job-company">
          <a href={`/company/${data.attributes.employer.id}`}>
            { data.attributes.employer.name }
            &nbsp;&nbsp;&sdot;&nbsp;&nbsp;
            { data.attributes.location_display_name }
          </a>
        </div>
        <div className="Apply-Job-date">
        Posted { Moment(data.attributes.published_on).fromNow() }
        </div>
        <div className="Apply-Job-buttons">
          { !data.attributes.is_bookmarked_by_current ? (
            <button
              onClick={ save }
              id={ data.id }
              aria-label="Save"
              className="Apply-Job-btn"
            >
            Save
          </button>
          ) : (
            <button
              id="Saved-btn"
              aria-label="Save"
              className="Apply-Job-btn"
            >
            Saved
          </button>
          )}


          { data.attributes.recruiter.id === parseInt(localStorage.id) ? (
                <button
                    onClick={ openEdit }
                    id={ data.id }
                    aria-label="Save"
                    className="Apply-Job-btn"
                  >
                  Edit
                </button>

              ) : (
              <React.Fragment>
                { !data.attributes.is_applied_by_current ? (
                  <button
                    onClick={ apply }
                    id={ data.id }
                    aria-label="Save"
                    className="Apply-Job-btn"
                  >
                  Apply
                </button>
                ) : (
                <div className="Job-Applied">
                  You've Applied Already
                </div>
                )}
              </React.Fragment>
              )}
        </div>
        <div id="Apply-Job-headline">
          Posted By
        </div>
        <div id="Apply-Job-recruiter">
          <div id="recruiter-name">
            <NavLink to={`/users/${data.attributes.recruiter.id}`} alt="select-user">
             { data.attributes.recruiter.name }
            </NavLink>
          </div>
          <div id="recruiter-photo">
            <img src={ data.attributes.recruiter.avatar_medium } alt="recruiter" />
          </div>
        </div>

        <div id="Apply-Job-headline">
          Job Type
        </div>
        <div id="Apply-Job-type">
          { data.attributes.job_type_info.name }
        </div>
        <div id="Apply-Job-headline">
          Job Description
        </div>
        <div id="Apply-Job-type">
          <div dangerouslySetInnerHTML={{ __html: `${ data.attributes.description }`}} />
        </div>

        <hr />
        <div id="Apply-Job-headline">
         Desired Skills
        </div>

        <div id="Apply-Job-skills">
          { skills.replace(/,/g, ", ") }
        </div>

        <button
          onClick={ close }
          id={ data.id }
          aria-label="close"
          className="Apply-Job-btn"
          style={{ marginTop: '60px' }}
        >
          Close
        </button>
      </div>
    );
  }

export default JobApply;
