import React from 'react';
import Moment from 'moment';
const AppliedJobView = ({ data, cancel, close }) => {
  return (
    <div className="Apply-Job-grid" key={data.id}>
      <div id="Apply-Job-photo">
          <img src={ data.attributes.employer.photos.original } alt="Job Logo" />
        </div>
      <div className="Apply-Job-title">
        { data.attributes.title }
      </div>
      <div id="Apply-Job-company">
        <a href={`/company/${data.attributes.employer.id}`}>
          { data.attributes.employer.name }
          &nbsp;&nbsp;&sdot;&nbsp;&nbsp;
          { data.attributes.employer.address }
        </a>
      </div>
      <div className="Apply-Job-date">
        You applied { Moment(data.attributes.created_at).fromNow() }
      </div>

      <div className="myApplicationJob-box">
        <div id="myApplication-photo">
          <img src={ data.attributes.applicant.photos.medium } alt="Profile" />
        </div>
        <div className="myApplication-name">
          { data.attributes.applicant.name }
        </div>
        <div className="myApplication-email">
          <a href={`mailto:${data.attributes.applicant.email}`} >
            { data.attributes.applicant.email }
          </a>
        </div>
      </div>

      <div className="myApplication-Job-documents">
      Resume: <br />
        <div id="myApplication-documents-title">
        <a href={data.attributes.document} alt="resume" target="_blank" rel="noopener noreferrer">
          { data.attributes.document_name }
        </a>
        </div>
      Cover Letter:
        <div id="myApplication-documents-title">
          {data.attributes.cover_letter}
        </div>
      </div>
      <hr />
      <div className="myApplication-buttons">
        <button
          onClick={ close }
          id={ data.id }
          aria-label="Close Modal"
          className="Applied-btn"
        >
          Close
        </button>
        <button
          onClick={ cancel }
          id={ data.attributes.job_id }
          aria-label="Cancel Application"
          className="Applied-btn"
        >
          Cancel Job Application
        </button>
      </div>
    </div>
  );
}

export default AppliedJobView;


// <div className="myApplicationJob-box">
//             <div id="Job-title">
//               { data.attributes.job_title }
//             </div>
//             <div id="job-recruiter-name">
//               <a href={`/company/${data.attributes.employer.id}`}>
//                 { data.attributes.employer.name }
//               </a>
//             </div>
//             <div id="job-recruiter-title">
//               { data.attributes.employer.address }
//             </div>
//             <div id="myApplication-photo">
//               <img src={ data.attributes.employer.photos.thumb } alt="recruiter" />
//             </div>
//           </div>