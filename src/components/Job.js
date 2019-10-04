import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';

const Job = ({ data, id, handler, quickApply, openEdit }) => {
  let skills = data.attributes.skills_tag.toString();
    return (
      <div className="Job-grid">
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

            { data.attributes.recruiter.occupation ? (
            <div id="job-recruiter-title">
              { data.attributes.recruiter.occupation }
            </div>
            ) : (
            <React.Fragment>
            { data.attributes.recruiter.account_type === 'job_seeker' ? (
              <div id="job-recruiter-title">
                Job Seeker
              </div> ) : (null)
              }
              { data.attributes.recruiter.account_type === 'professional' ? (
              <div id="job-recruiter-title">
                Professional
              </div> ) : (null)
              }
              { data.attributes.recruiter.account_type === 'recruiter' ? (
              <div id="job-recruiter-title">
                Recruiter
              </div> ) : (null)
              }
              { data.attributes.recruiter.account_type === 'hiring_manager' ? (
              <div id="job-recruiter-title">
                Hiring Manager
              </div> ) : (null)
              }
              { data.attributes.recruiter.account_type === 'student' ? (
              <div id="job-recruiter-title">
                Student
              </div> ) : (null)
              }
              { data.attributes.recruiter.account_type === 'entrepreneur' ? (
              <div id="job-recruiter-title">
                Entrepreneur
              </div> ) : (null)
              }
              </React.Fragment>
            )}

              <br />
              {/* Posted { Moment(data.attributes.published_on).fromNow() } */}
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
                  className="View-Job-btn"
                >
                View Job
              </button>
              { data.attributes.recruiter.id === parseInt(localStorage.id) ? (
                <button
                    onClick={ openEdit }
                    id={ data.id }
                    aria-label="Save"
                    className="Job-btn"
                  >
                  Edit
                </button>

              ) : (
              <React.Fragment>
                { !data.attributes.is_applied_by_current ? (
                  <button
                    onClick={ quickApply }
                    id={ data.id }
                    aria-label="Save"
                    className="Job-btn"
                  >
                  Apply
                </button>
                ) : (
                <div className="Job-Applied">
                  <button
                    id={ data.id }
                    aria-label="Save"
                    className="Job-Applied-btn"
                  >
                  Applied
                </button>
                </div>
                )}
              </React.Fragment>
              )}
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
             { data.attributes.required_experience ? ( <div>{ data.attributes.required_experience }</div> ) : (<div>Not listed</div>) }
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
        { data.attributes.is_applied_by_current  ? (<div className="Job-Applied"> You've applied to this job </div>) : (null) }
      </div>
    );
  }

export default Job;
