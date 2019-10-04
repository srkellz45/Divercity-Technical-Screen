import React from 'react';

const Applicant = ({ data, id }) => {
   return (
      <div className="singleUser-grid" key={id}>
        For the job { data.job_title }
        <br />

          <div className="titledate">
            { data.applicant.name } has applied
          </div>
          <div id="singleUser-email" key={id}>
            { data.applicant.email }
          </div>
          <div id="singleUser-description">
            cover letter: { data.cover_letter }
            <br />
            resume: { data.document }
          </div>
        <hr />
      </div>
    );
  }

export default Applicant;
