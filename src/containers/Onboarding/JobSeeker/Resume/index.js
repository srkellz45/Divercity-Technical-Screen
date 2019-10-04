import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import history from '../../../../history';
import TempHeader from '../../../../components/TempHeader.js';
import {
    getUser,
    addFile,
    getDocuments } from '../../../../actions/user.actions';

import collage from '../../../../assets/ResumeUpload.png';
import check from '../../../../assets/Checkmark.png';
import decline from '../../../../assets/Decline.png';
import Modal from '../../../Modal';
import UploadProfilePhoto from '../../UploadProfilePhoto';

// {url}/:id/onboarding/resume/3

class JobSeekerResume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      files: [],
      document: [],
      successOpen: true,
      skipOpen: false,
      profilePhotoOpen: true,
    };
    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.openSkipModal = this.openSkipModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeSkipModal = this.closeSkipModal.bind(this);
  }
  openSkipModal (evt) {
    evt.preventDefault();
      this.setState({
        skipOpen: true,
      });
  }
  closeSkipModal () {
    this.setState({
      skipOpen: false,
    });
  }
  closeModal () {
    this.setState({
      successOpen: false,
      profilePhotoOpen: false
    });
  }

  componentDidMount() {
  // if do show/hide in here for authentication can also include redirect link to login
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      this.props.getUser(this.state.id);
      this.props.getDocuments();
    }
  }
  componentWillUnmount() {
    // Revoke the data uris to avoid memory leaks
    const { files } = this.state;
    if(files.length){
      for (let i = files.length; i >= 0; i--) {
        const file = files[0];
        URL.revokeObjectURL(file.preview);
      }
    }
  }
  uploadFile(evt) {
    if (evt.target.files && evt.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
      let name = this.state.files[0].name;
      let file = e.target.result;

      this.props.addFile(file, name);
      };
    reader.readAsDataURL(evt.target.files[0]);
   }
  }
  onDrop(files) {
    this.setState({
      files: files.map(file => ({
        ...file,
        name: file.name,
        size: file.size,
      }))
    });
  }
  render() {
    // const { files } = this.state;
    // const thumbs = files.map(file => (
    //   <div className="resume-thumb" key="thumbs">
    //       {file.name}
    //   </div>
    // ));
    return (
      <div className="UploadResume">
        <TempHeader />
        <div className="Upload-Form">
          <div className="Upload-body">
          <Dropzone
            className="resume-dropzone"
            accept="application/pdf"
            maxSize={ 3000000 }
            onDrop={ this.onDrop }
            onChange={ this.uploadFile }
          >
            {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
              // if (acceptedFiles.length) { // Passes all checks!
              //   return (
              //     <div className="success-upload">
              //       <div id="loading">
              //       <p className="loading">Uploading<span>.</span><span>.</span><span>.</span></p>
              //       </div>
              //     </div>
              // )}
              if (rejectedFiles.length) {
                  if (rejectedFiles[0].size > 3000000) { // Less than 3MB
                    return <div className="error-upload">
                      Please make sure the<br />
                      file size is smaller than 3MB <br /><br />
                      Click anywhere to Upload</div>
                  }
                return <div className="error-upload">
                  <h2>Please upload PDF format<br /><br />
                      Click anywhere to Upload</h2></div>
              } // Wrong file-type
              if (isDragAccept) {
                return <div className="success-drag"> + </div>
              } // Show a PLUS sign in drag area if correct size & type
              if (isDragReject) {
                return <div className="error-upload">
                <h2>Please upload PDF format<br /><br />
                      Click anywhere to Upload</h2></div>
              } // Show this if it's wrong format
              else {
                return (
                  <div>
                    <div className="resume-upload-headline">
                    Congratuations, your account has been created!
                    <div className="resume-upload-subline">
                    Upload your resume to find your dream job
                    </div>
                    </div>

                    <div className="resume-upload-background">
                      <img src={collage} alt="resume-upload" />
                    </div>
                    <div className="resume-upload">
                      <button
                        aria-label="Save Resume"
                        className="resume-btn"
                        type="submit"
                        >
                        <strong>Upload a Resume</strong>
                      </button>
                    </div>
                  </div>
                )
              }
            }}
          </Dropzone>
            <div className="Skip" onClick={this.openSkipModal}>
              Skip and add Resume later
            </div>
          </div>
          <br />

            <Modal   //////RESUME SKIP MODAL//////////
              show={this.state.skipOpen}
              onClose={this.closeSkipModal}
              className="Modal-Backdrop"
            >
            <div className="Resume-Skip">
             <img src={decline} alt="decline" />
             <div id="resume-skip-headline">
              Are you sure you want to skip?
              <div id="resume-skip-subline">
               Your resume will allow us match you with awesome roles. <br />
               You can add more resumes or update it later as well.
              </div>
            </div>
            <div>
            <button
              aria-label="Back"
              className="resume-back-btn"
              type="submit"
              onClick={this.closeSkipModal}
            >
              Okay sure. Let's do this!
            </button>

            { localStorage.type === "job_seeker" || localStorage.type === "entrepreneur" || localStorage.type === "professional" ? (
            <NavLink to={`/${this.state.id}/onboarding/js`} alt="ok" aria-label="ok">
              <button
                aria-label="Skip"
                className="resume-skip-btn"
                type="submit"
                onClick={this.closeSkipModal}
              >
                I still want to skip
              </button>
             </NavLink>
            ) : null }
            { localStorage.type === "student" ? (
            <NavLink to={`/${this.state.id}/onboarding/school`} alt="ok" aria-label="ok">
              <button
                aria-label="Skip"
                className="resume-skip-btn"
                type="submit"
                onClick={this.closeSkipModal}
              >
                I still want to skip
              </button>
             </NavLink>
            ) : null }
               </div>
              </div>
            </Modal>


          { this.props.modal.modalType ===  "RESUME_SUCCESS" ? (
            <Modal
            show={this.state.successOpen}
            onClose={this.closeModal}
            className="Modal-Backdrop"
            >
             <div className="Resume-Success">
                 <img src={check} alt="check" />
                 <div id="resume-success-headline">
                   Your resume has been uploaded!
                   <div id="resume-success-subline">
                     You can view it later in your profile
                   </div>
                 </div>
              { this.props.user.attributes.account_type === "job_seeker" || localStorage.type === "entrepreneur" || this.props.user.attributes.account_type === "professional" ? (
                <div>
                <NavLink to={`/${this.state.id}/onboarding/jobs/3`} alt="ok" aria-label="ok">
                  <button
                    aria-label="Save Resume"
                    className="resume-success-btn"
                    type="submit"
                    onClick={this.closeModal}
                  >
                    Ok
                  </button>
                 </NavLink>
                </div>
                ) : (null)
              }

              { this.props.user.attributes.account_type === "student" ? (
                <div>
                <NavLink to={`/${this.state.id}/onboarding/school`} alt="ok" aria-label="ok">
                  <button
                    aria-label="Save Resume"
                    className="resume-success-btn"
                    type="submit"
                    onClick={this.closeModal}
                    >
                      Ok
                  </button>
                  </NavLink>
                </div>
                ) : (null)
              }
             </div>
            </Modal>
           ) : (null)
          }
       </div>
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding`} alt="Back">
                Back
              </NavLink>
            </div>
        <div className="progress-dots">
          <span className="dot"></span>
          <span className="greydot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <Modal
          show={this.state.profilePhotoOpen}
          onClose={this.closeModal}
          className="Modal-Backdrop"
        >
          <UploadProfilePhoto
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userList,
    modal: state.modal,
    documents: state.documentsList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    addFile: (file, name) => {
      dispatch(addFile(file, name));
    },
    getDocuments: () => {
      dispatch(getDocuments());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobSeekerResume);



