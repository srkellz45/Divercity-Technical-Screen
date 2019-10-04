import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobApplicants extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  // if do show/hide in here for authentication can also include redirect link to login

  }

  render() {
      return(
        <React.Fragment>
          <div className="Applicants-View-Modal">
            <div className="Applicants-headline">
              Applications for { this.props.data[0].attributes.job_title }
            </div>
            <div className="Applicants-company">
              { this.props.data[0].attributes.employer.name }
              &nbsp;⋅&nbsp;
              { this.props.data[0].attributes.employer.address }
            </div>
          <hr />
          { this.props.data.map((applicants) => {
            return (
              <div className="Applicants-grid" key={applicants.id}>
                <div className="Applicants-container">
                <div className="myApplicationJob-box">
                  <a href={ `/users/${applicants.attributes.applicant.id}`}>
                    <div id="Applicants-photo">
                    <img src={ applicants.attributes.applicant.photos.medium } alt="Profile" />
                  </div>
                  <div className="myApplication-name">
                    { applicants.attributes.applicant.name }
                  </div>
                  </a>
                  <div className="myApplication-email">
                    <a href={`mailto:${applicants.attributes.applicant.email}`} >
                      { applicants.attributes.applicant.email }
                    </a>
                  </div>
                </div>

                  <React.Fragment>
                    { applicants.attributes.applicant.account_type === 'job_seeker' ? (
                    <div id="Applicants-role">
                      Job Seeker
                    </div> ) : (null)
                    }
                    { applicants.attributes.applicant.account_type === 'professional' ? (
                    <div id="Applicants-role">
                      Professional
                    </div> ) : (null)
                    }
                    { applicants.attributes.applicant.account_type === 'recruiter' ? (
                    <div id="Applicants-role">
                      Recruiter
                    </div> ) : (null)
                    }
                    { applicants.attributes.applicant.account_type === 'hiring_manager' ? (
                    <div id="Applicants-role">
                      Hiring Manager
                    </div> ) : (null)
                    }
                    { applicants.attributes.applicant.account_type === 'student' ? (
                    <div id="Applicants-role">
                      Student
                    </div> ) : (null)
                    }
                    { applicants.attributes.applicant.account_type === 'entrepreneur' ? (
                    <div id="Applicants-role">
                      Entrepreneur
                    </div> ) : (null)
                    }
                  </React.Fragment>
                  <div className="myApplication-Job-documents">
                    Resume: <br />
                      <div id="myApplication-documents-title">
                      <a href={applicants.attributes.document} alt="resume" target="_blank" rel="noopener noreferrer">
                        { applicants.attributes.document_name }
                      </a>
                      </div>
                    { applicants.attributes.cover_letter && (
                    <React.Fragment>
                    Cover Letter:
                      <div id="myApplication-documents-title">
                        {applicants.attributes.cover_letter}
                      </div>
                    </React.Fragment>
                    )}
                    </div>
                    <hr />
                </div>
              </div>
            )
          })}
          </div>
        </React.Fragment>
      );
  }
}


export default (JobApplicants);


