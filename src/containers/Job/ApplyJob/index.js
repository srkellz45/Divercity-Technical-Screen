import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { loadSingleJob, applyJob } from '../../../actions/job.actions';
import { getUser, deleteResume, addFile, getDocuments } from '../../../actions/user.actions';
import ResumeDropdown from './ResumeDropdown';
import DocumentsModal from '../../DocumentsModal';
import Documents from '../../../components/user.document.components';
import Modal from '../../Modal';
import decline from '../../../assets/Decline.png';
import check from '../../../assets/Checkmark.png';
import Moment from 'moment';
class ApplyJob extends Component {
  constructor(props){
  super(props);
  this.state = {
    isOpen: false,
    jobId: props.singleJob.id,
    employer: props.singleJob.attributes.employer.name,
    title: props.singleJob.attributes.title,
    documentsOpen: false,
    resume: null,
    cover_letter: '',
    error: false,
    files: [],
  };
    this.closeModal = this.closeModal.bind(this);
    this.closeApplyModal = this.closeApplyModal.bind(this);
    this.setResume = this.setResume.bind(this);
    this.handleJobApply = this.handleJobApply.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadResume = this.uploadResume.bind(this);


    this.onDrop = this.onDrop.bind(this);
    this.onResumeDrop = this.onResumeDrop.bind(this);
    this.resumeUpload = this.resumeUpload.bind(this);
    this.closeSuccessModal = this.closeSuccessModal.bind(this);
  }
  onDrop(files) {
    this.setState({
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file),
        size: file.size,
      }))
    });
  }
  onResumeDrop(files) {
    this.setState({
      files: files.map(file => ({
        ...file,
        name: file.name,
        size: file.size,
      }))
    });
  }
  closeSuccessModal () {
    this.setState({
      successOpen: false,
      editOpen: false,
      deleteOpen: false,
      resumeToBeDeleted: '',
      documentsOpen: false,
    });
    this.props.getDocuments();
  }
  resumeUpload(evt) {
    this.setState({
      successOpen: true,
    });
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
  handleChange(evt) {
    this.setState({
      cover_letter: evt.target.value
    });
  }
  componentDidMount(){
    this.props.getDocuments();
  }

  closeModal () {
    this.setState({
      isOpen: false,
      error: false,
      documentsOpen: false,
    });
  }
  closeApplyModal () {
    this.setState({
      applyOpen: false,
      isOpen: false,
      error: false,
      documentsOpen: false,
    });
  }
  setResume(title, id) {
    this.setState({
      resume: id,
      error: false
    });
  }
  uploadResume() {
    this.setState({
      documentsOpen: true,
    });
  }
  handleJobApply() {
    let job = this.state.jobId;
    let resume = this.state.resume;
    let cover = this.state.cover_letter;
    if(this.state.resume) {
    this.props.applyJob(job, resume, cover);
    this.props.onClose();
    this.setState({
      applyOpen: false,
      isOpen: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }

  }

  render() {
    return (
      <div className="Apply-Modal">
        <div className="cancel-btn">
          <button
            aria-label="Close Modal"
            className="close-btn"
            type="submit"
            onClick={this.props.onClose}
          >
            x
          </button>
        </div>

        { this.state.error ? (<div id="Apply-error">Oops try selecting a resume to send! </div>) : null }
      <div className="Apply-Job-grid">
        <div id="Apply-Job-view-photo">
            <img src={ this.props.singleJob.attributes.employer.photos.medium } alt="Job Logo" />
          </div>
        <div className="Apply-Job-title">
          { this.props.singleJob.attributes.title }
        </div>
        <div id="Apply-Job-company">
          <a href={`/company/${this.props.singleJob.attributes.employer.id}`}>
            { this.props.singleJob.attributes.employer.name }
            &nbsp;&nbsp;&sdot;&nbsp;&nbsp;
            { this.props.singleJob.attributes.location_display_name }
          </a>
        </div>
        <div className="Apply-Job-date">
        Posted { Moment(this.props.singleJob.attributes.published_on).fromNow() }
        </div>
        <div className="Select-Resume">
          <div id="select-title">
            Select Resume to Apply With
          </div>
          <ResumeDropdown
            title="Select"
            list={this.props.documents}
            uploadResume={this.uploadResume}
            setState={this.setResume}
          />
        </div>
        <div id="select-title" >
          Include Cover Letter? (optional)
        </div>
        <div className="Cover-Letter">
          <textarea placeholder={`Dear ${this.props.singleJob.attributes.employer.name}, you will find me perfect for this job because...`} value={this.state.cover_letter} onChange={this.handleChange} />
        </div>
        { !this.props.singleJob.attributes.is_applied_by_current ? (
          <button
            aria-label="Submit Application"
            className="Apply-Job-btn"
            type="submit"
            onClick={this.handleJobApply}
            style={{marginTop: "50px"}}
            >
            <strong>Submit Application</strong>
          </button>
          ) : ( <div> You've already applied </div>
        )}

      </div>
          <DocumentsModal //// DOCUMENTS / RESUME MODAL
            show={this.state.documentsOpen}
            onClose={this.closeModal}
            className="Modal-Backdrop"
          >
            <Dropzone // THIS IS FOR RESUME UPLOAD IN THE VIEW DOCUMENTS MODAL
              className="document-dropzone"
              accept="application/pdf"
              maxSize={ 3000000 }
              onDrop={ this.onResumeDrop }
              onChange={ this.resumeUpload }
            >
              {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                if (acceptedFiles.length) { // Passes all checks!
                  return(
                  <div className="resume-uploading">
                    Uploading your Resume...
                  </div>);
                }
                if (rejectedFiles.length) {
                    if (rejectedFiles[0].size > 3000000) { // Less than 3MB
                      return <div className="error-upload">
                        Please make sure the<br />
                        file size is smaller than 3MB </div>
                    }
                  return <div className="error-upload">
                    Please upload PDF format</div>
                } // Wrong file-type
                if (isDragAccept) {
                  return <div className="success-drag"> + </div>
                } // Show a PLUS sign in drag area if correct size & type
                if (isDragReject) {
                  return <div className="error-upload">
                  Please upload PDF format</div>
                } // Show this if it's wrong format
                else {
                  return (
                    <div>
                      <div className="document-upload-background">
                        Upload a New Document
                      </div>
                      <div className="document-upload">
                        Click Here to Upload
                      </div>
                    </div>
                  )
                }
              }}
            </Dropzone>

        <br />

          { this.props.modal.modalType ===  "RESUME_SUCCESS" ? (
            <Modal // RESUME SUCCESSFULLY UPLOADED MODAL
              show={this.state.successOpen}
              onClose={this.closeSuccessModal}
              className="Modal-Backdrop"
            >
             <div className="Resume-Success">
                 <img src={check} alt="check" />
                 <div id="resume-success-headline">
                   Your resume has been uploaded successfully!
                   <div id="resume-success-subline">
                     You can view it in your profile
                   </div>
                 </div>
                <div>
                  <button
                    aria-label="Save Resume"
                    className="resume-success-btn"
                    type="submit"
                    onClick={this.closeSuccessModal}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </Modal>
            ) : (null)
          }
          </DocumentsModal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    singleJob : state.singleJobList,
    user : state.userList,
    documents: state.documentsList,
    modal: state.modal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleJob: (id) => {
      dispatch(loadSingleJob(id));
    },
    getUser: (id) => {
      dispatch(getUser(id));
    },
    getDocuments: () => {
      dispatch(getDocuments());
    },
    applyJob: (job, resume, cover) => {
      dispatch(applyJob(job, resume, cover));
    },
    addFile: (file, name) => {
      dispatch(addFile(file, name));
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyJob);
