import React from 'react';
import Moment from 'moment';
const MyJobUnpublished = ({ data, userID, jobID, publish, edit, handleDelete, viewApplications }) => {
  const listSkills = data.skills_tag.map((jobSkill) => <li key={jobSkill}>{jobSkill}</li>);
    return (
      <div className="MyJob-grid" key={jobID}>
        <div className="MyJob-top">
          <div className="MyJob-middle">
            <div className="MyJob-buttons">
              <button
                id={ jobID }
                onClick={ viewApplications }
                className="PublishJob-btn"
              >
               View Applications
              </button>
              <button
                id={ jobID }
                onClick={ edit }
                className="MyJob-Top-btn"
                >
               Edit
              </button>
            </div>
            <div className="MyJob-Applicants-body">
              { data.applicant_count === 0 ? (
                <div className="MyJob-No-Applicants">
                No one has applied yet
                </div>
              ) : (
              <div className="MyJob-Applicants">
                { data.applicant_count === 1 ? (
                  <div className="MyJob-No-Applicants">
                    { data.applicant_count } person has applied for this job.
                  </div>
                ) : (
                  <div className="MyJob-No-Applicants">
                    { data.applicant_count } people have applied for this job.
                  </div>
                ) }
                <br/>
              </div>
            )}
            </div>
            <div>
              <div className="MyJob-title">
                { data.title }
              </div>
              <div id="MyJob-company">
                  <a href={`/company/${data.employer.id}`}>
                    { data.employer.name }
                  </a>
              </div>
              <div id="MyJob-location">
                { data.location_display_name }
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div id="MyJob-item">
          <div className="MyJob-Description-titles">
            <div id="MyJob-description-title-title">
              Job Type
            </div>
            <div id="MyJob-description-title">
              Required Experience
            </div>
            <div id="MyJob-description-title">
              Skills
            </div>
          </div>
          <div className="MyJob-Description-data">
            <div id="MyJob-skills-title">
             { data.job_type_info.name }
            </div>
            <div id="MyJob-skills">
             { data.required_experience ? ( <div>{ data.required_experience }</div> ) : (<div>Not listed</div>) }
            </div>
            <div id="MyJob-skills-skills">
             { listSkills }
            </div>
          </div>
          <hr />
          <div id="MyJob-item">
            <div className="MyJob-Description">
              <div id="MyJob-description-title">
                Job Description
              </div>
              <div id="MyJob-bio">
                <div dangerouslySetInnerHTML={{ __html: `${ data.description }`}} />
              </div>
            </div>
          </div>
        </div>
        <br />
          <div className="DeleteJob-buttons">
              <div>
                <br/>
                <button
                  id={ jobID }
                  onClick={ publish }
                  className="PublishJob-btn"
                >
                 Publish
                </button>
                <button
                  id={ jobID }
                  onClick={ handleDelete }
                  className="DeleteJob-btn"
                  >
                 Delete
                </button>
              </div>
              <div id="MyJob-Published">
                This was unpublished { Moment(data.unpublished_on).fromNow() }
              </div>
          </div>
        </div>
    )
}


export default MyJobUnpublished;

