import React from 'react';

const SimilarJob = ({ title, date, skills, description, employer, location, id, handler, similarJobs, applied }) => {
  const listSkills = skills.map((jobSkill) => <li key={jobSkill}>{jobSkill}</li>);
    return (
      <div className="Job-grid" key={id}>
        <div className="titledate">
          { title }&nbsp;&nbsp;&sdot;&nbsp;&nbsp;{ date }
        </div>
        <div id="Job-item">
          <div id="Job-skills" key={id}>
            { listSkills }
          </div>
          <div id="Job-description">
            { description }
          </div>
          <div id="Job-company">
            <a href={`/company/${employer.id}`}>
              { employer.name }&nbsp;&nbsp;&sdot;&nbsp;&nbsp;{ location }
            </a>
          </div>
        </div>

        <button
          id={ id }
          onClick={ handler }
          className="view-job-btn"
        >
          View Job
        </button>
        <br />
        { applied ? (<div> You've applied to this job</div>) : (null) }
        <hr />
      </div>
    );
  }

export default SimilarJob;
