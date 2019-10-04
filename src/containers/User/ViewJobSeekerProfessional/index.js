import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Flip, toast } from "react-toastify";
import Dropzone from 'react-dropzone';
import { NavLink } from 'react-router-dom';
import {
    getOtherUser,
    getExperience,
    getEducation,
    getUser,
    addFile,
    getDocuments,
    makeUserEditable,
    updateUserProfile,
    deleteResume,
    addExperience,
    updatePassword,
    setPassword
  } from '../../../actions/user.actions';
import {
    connectUser,
    getConnections,
    followUserConnections,
    unconnectUser,
    acceptConnection,
    disconnectUser
  } from '../../../actions/connection.actions';
import {
  loadFollowingGroups,
  getOtherUserGroups,
  requestGroupAccess,
  leaveGroup,
  followGroup } from '../../../actions/group.actions.js';
import { uploadProfilePicture, updateProfile } from '../../../actions/onboard.actions';
import { genderList, ethnicityList, ageRangeList } from '../../../lib/selectListData';

import Header from '../../../components/Header.js';
import EditModal from '../../EditModal';
import AddExperience from '../../AddExperience';
import EditExperience from '../../EditExperience';
import AddEducation from '../../AddEducation';
import EditEducation from '../../EditEducation';
import AddExperienceModal from '../../AddExperienceModal';
import DocumentsModal from '../../DocumentsModal';
import AddSkills from '../../AddSkills';
import JobSeekerProfile from '../../../components/user.jobSeeker.components';
import ManageAccount from '../../../components/user.manageAccount.components';
import Connections from '../../../components/user.connection.components.js';
import UserGroups from '../../../components/user.Groups.components.js';
import MyProfile from '../../../components/user.myProfile.components';
import Documents from '../../../components/user.document.components';
import EditName from '../../../components/user.editName.components';


import Modal from '../../Modal';
import decline from '../../../assets/Decline.png';
import check from '../../../assets/Checkmark.png';
import { createContext } from 'vm';
/* {url}/users/:id */
class ViewJobSeekerProfessional extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: this.props.match.params.id,
      profile: true,
      connections: false,
      editOpen: false,
      deleteOpen: false,
      successOpen: false,
      documentsOpen: false,
      skillsAddOpen: false,
      manageAccount: false,
      logoutModal: false,
      genderItems: genderList,
      ethnicityItems: ethnicityList,
      ageRangeItems: ageRangeList,
      files: [],
      resume: [],
      avatar: [],
      skills: [],
      name: '',
      city: '',
      country: '',
      ethnicity: '',
      gender: '',
      age_range: '',
      account_type: '',
      school_id : '',
      job_employer_id : '',
      bio: '',
      occupation: '',
      resumeToBeDeleted: '',
      experienceAddOpen: false,
      experienceEditOpen: false,
      educationAddOpen: false,
      educationEditOpen: false,
      experienceToEdit: '',
      educationToEdit: '',
      personalSelected: true,
      manageSelected: false,
      oldPassword: '',
      newPassword: '',
      newPasswordCheck: '',
    };
    this.getProfile = this.getProfile.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.openDocuments = this.openDocuments.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.resumeDelete = this.resumeDelete.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onResumeDrop = this.onResumeDrop.bind(this);
    this.resumeUpload = this.resumeUpload.bind(this);
    this.closeSuccessModal = this.closeSuccessModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleAddSkills = this.handleAddSkills.bind(this);
    this.handleAddEducation = this.handleAddEducation.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openManageAccount = this.openManageAccount.bind(this);
    this.openLogoutModal = this.openLogoutModal.bind(this);
    this.openAddExperience = this.openAddExperience.bind(this);
    this.openEditExperience = this.openEditExperience.bind(this);
    this.openEditEducation = this.openEditEducation.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePersonalDetailsSubmit = this.handlePersonalDetailsSubmit.bind(this);
    this.getPersonalDetails = this.getPersonalDetails.bind(this);
    this.getManageAccount = this.getManageAccount.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.requestAccess = this.requestAccess.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);

    this.connectWithUser = this.connectWithUser.bind(this);
    this.acceptConnect = this.acceptConnect.bind(this);
    this.connectWithOtherUserConnections = this.connectWithOtherUserConnections.bind(this);
    this.unconnectUser = this.unconnectUser.bind(this);
    this.unconnectWithOtherUserConnections = this.unconnectWithOtherUserConnections.bind(this);
    this.unconnectWithMyConnections = this.unconnectWithMyConnections.bind(this);
    this.getConnections = this.getConnections.bind(this);


  }
  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getOtherUser(this.props.match.params.id);
    this.props.getOtherUserGroups(this.props.match.params.id);
    this.props.getExperience(this.state.user_id);
    this.props.getEducation(this.state.user_id);
    this.props.getUser(localStorage.id);
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      this.props.loadFollowingGroups();
      localStorage.removeItem('type');
      localStorage.removeItem('error');
    }
  }
  openDocuments (evt) {
    this.props.getDocuments();
    this.setState({
      documentsOpen: true,
    });
  }
  openManageAccount (evt) {
    this.setState({
      manageAccount: true,
    });
  }
  openLogoutModal (evt) {
    this.setState({
      logoutModal: true,
    });
  }
  closeModal (evt) {
    this.setState({
      logoutModal: false,
      experienceAddOpen: false,
      experienceEditOpen: false,
      educationAddOpen: false,
      educationEditOpen: false,
      skillsAddOpen: false,
      manageAccount: false,
      documentsOpen: false,
    });
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
    this.props.makeUserEditable(this.state.user_id, false);
  }
  uploadFile(evt) {
    if (evt.target.files && evt.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var files = e.target.result;
        //use canvas to resize the image
        var img = document.createElement("img");
        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let MAX_WIDTH = 160;
          let MAX_HEIGHT = 160;
          let width = img.width;
          let height = img.height;
          // modify width and height
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          //draws resized image
          console.log(width, height);
          ctx.drawImage(img, 0, 0, width, height);    
          let dataUrl = canvas.toDataURL("image/png");  
          console.log(dataUrl); 
          this.props.uploadProfilePicture(dataUrl);
        }
        img.src = e.target.result;
      };
    reader.readAsDataURL(evt.target.files[0]);
   }
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
      resume: files.map(file => ({
        ...file,
        name: file.name,
        size: file.size,
      }))
    });
  }
  resumeUpload(evt) {
    this.setState({
      successOpen: true,
    });
    if (evt.target.files && evt.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
      let name = this.state.resume[0].name;
      let file = e.target.result;

      this.props.addFile(file, name);
      };
    reader.readAsDataURL(evt.target.files[0]);
   }
  }
  handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name] : value
    });
  }
  handleSelect(title, genderEmoji, emoji, id, key) {
    if(key === "account_type") {
      switch (title) {
        case 'Entrepreneur':
          this.setState({
            "account_type": 'entrepreneur'
          });
        break;
        case 'Job Seeker':
          this.setState({
            "account_type": 'job_seeker'
          });
        break;
        case 'Student':
          this.setState({
            "account_type": 'student'
          });
        break;
        case 'Recruiter':
          this.setState({
            "account_type": 'recruiter'
          });
        break;
        case 'Hiring Manager':
          this.setState({
            "account_type": 'hiring_manager'
          });
        break;
        default:
        break;
      }
    } else {
    let value = JSON.parse(JSON.stringify(title));
    this.setState({
      [key]: value
    });
    }
  }
  handleDropdown(data) {
    if(data.type === 'schools') {
      this.setState({
        school_id: data.id
      })
    }
    if(data.type === 'world_countries') {
      this.setState({
        country: data.attributes.name
      })
    }
    if(data.type === 'world_cities') {
      this.setState({
        city: data.attributes.name
      })
    }
    if(data === 'None') {
      this.setState({
        job_employer_id: "None"
      });
    }
    if(data.type === 'job_employers') {
      this.setState({
        job_employer_id: data.id
      })
    }
  }

  connectWithUser(evt) { // connect with OTHER user button below profile photo
    evt.preventDefault();
    this.props.connectUser(evt.target.id);
  }
  acceptConnect(evt) { // if OTHER user has sent request, connect with them button below profile photo
    evt.preventDefault();
    this.props.acceptConnection(evt.target.id, localStorage.id);
  }
  connectWithOtherUserConnections(evt){ // connect with OTHER user's connections
    evt.preventDefault();
    this.props.followUserConnections(evt.target.id, this.state.user_id, 'otherUserProfile');
  }
  unconnectUser(evt) { // unconnect OTHER user button below profile photo
    console.log(evt.target.id);
    evt.preventDefault();
    this.props.disconnectUser(evt.target.id);
  }
  unconnectWithOtherUserConnections(evt){ // if it's another USER profile, THEIR connections
    evt.preventDefault();
    this.props.disconnectUser(evt.target.id, this.state.user_id, 'otherUserProfile');
  }
  unconnectWithMyConnections(evt){ // if it's MY Profile, MY Connections
    evt.preventDefault();
    this.props.disconnectUser(evt.target.id, localStorage.id, 'myProfile');
  }

  getConnections(evt) {
    evt.preventDefault();
    this.props.getConnections(evt.target.id);
    this.setState({
      connections: true,
      profile: false
    });
  }

  getProfile(evt) {
    evt.preventDefault();
    this.setState({
      connections: false,
      profile: true
    });
  }
  openEdit(user, edit) {
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      this.props.makeUserEditable(this.state.user_id, edit);
      this.setState({
        city: user.city,
        country: user.country,
        school_id : user.school_id,
        job_employer_id : user.job_employer_id,
      });
    }
    // When edit is toggled off, clear Avatar state (unmount)
    if(!edit) {
      this.setState({
        avatar: [],
        files: []
      });
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      let profileData = { "user": { } };
      if(this.state.school_id) {
        Object.assign(profileData.user, {school_id: this.state.school_id});
      }
      if(this.state.city) {
        Object.assign(profileData.user, {city: this.state.city});
      }
      if(this.state.country) {
        Object.assign(profileData.user, {country: this.state.country});
      }
      if(this.state.bio) {
        Object.assign(profileData.user, {bio: this.state.bio});
      }
      if(this.state.job_employer_id) {
        Object.assign(profileData.user, {job_employer_id: this.state.job_employer_id});
      }
      if(this.state.job_employer_id === "None") {
        Object.assign(profileData.user, {job_employer_id: null});
      }
      if(this.state.skills.length) {
        Object.assign(profileData.user, {skills: this.state.skills.split(', ')})
      }
      if(this.state.occupation) {
        Object.assign(profileData.user, {occupation: this.state.occupation})
      }
      if(this.state.name) {
        let name = { "user": {} };
        let capitalizedName = this.state.name.split(' ').map(function(word) {return word[0].toUpperCase() + word.slice(1)}).join(' ');
        Object.assign(name.user, { name: capitalizedName })
        this.props.updateUserProfile(name, this.state.user_id)
      }
      this.props.updateUserProfile(profileData, this.state.user_id);
      this.props.makeUserEditable(this.state.user_id);
    }
  }
  handlePersonalDetailsSubmit(evt) {
    evt.preventDefault();
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      let profileData = { "user": { } };
      if(this.state.age_range) {
        Object.assign(profileData.user, {age_range: this.state.age_range});
      }
      if(this.state.ethnicity) {
        Object.assign(profileData.user, {ethnicity: this.state.ethnicity});
      }
      if(this.state.gender) {
        Object.assign(profileData.user, {gender: this.state.gender});
      }
      if(this.state.account_type) {
        Object.assign(profileData.user, {account_type: this.state.account_type});
      }
      this.props.updateUserProfile(profileData, this.state.user_id);
      this.closeModal();
    }
  }
  resumeDelete(evt) {
    this.props.deleteResume(this.state.resumeToBeDeleted);
    this.setState({
      deleteOpen: false,
      resumeToBeDeleted: '',
    });
  }
  openDeleteModal (evt) {
    this.setState({
      deleteOpen: true,
      resumeToBeDeleted: evt.target.id
    });
  }
  closeDeleteModal () {
    this.setState({
      deleteOpen: false,
      experienceAddOpen: false,
    });
  }
  closeSuccessModal () {
    this.setState({
      successOpen: false,
      editOpen: false,
      deleteOpen: false,
      resumeToBeDeleted: '',
    });
    this.props.getDocuments();
  }
  deletePhoto (evt) {
    evt.preventDefault();
    this.setState({
      files: []
    })
    this.props.uploadProfilePicture(null);
  }
  handleAddSkills (evt) {
    evt.preventDefault();
    this.setState({
      skillsAddOpen: true,
    });
  }
  handleAddEducation (evt) {
    evt.preventDefault();
    this.setState({
      educationAddOpen: true,
    });
  }
  openAddExperience (evt) {
    evt.preventDefault();
    this.setState({
      experienceAddOpen: true,
    });
  }
  openEditExperience (evt) {
    evt.preventDefault();
    this.setState({
      experienceEditOpen: true,
      experienceToEdit: evt.target.id
    });
    this.props.getExperience(localStorage.id);
  }
  openEditEducation (evt) {
    evt.preventDefault();
    this.setState({
      educationEditOpen: true,
      educationToEdit: evt.target.id
    });
    this.props.getEducation(localStorage.id);
  }
  getPersonalDetails(evt) {
    evt.preventDefault();
    this.setState({
      manageSelected: false,
      personalSelected: true
    });
  }
  getManageAccount(evt) {
    evt.preventDefault();
    this.setState({
      personalSelected: false,
      manageSelected: true
    });
  }
  handleSetPassword(evt) {
    evt.preventDefault();
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      if(this.state.newPassword.length >= 8 ) {
        if(this.state.newPassword === this.state.newPasswordCheck) {
          this.props.setPassword(this.state.newPassword);
          this.closeModal();
          this.setState({
            newPassword: '',
            newPasswordCheck: ''
          });
        } else {
          toast.error(`Please make sure the password entries match`, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
        }
      } else {
        toast.error(`Please create a password that is at least 8 characters long`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    }
  }
  handleChangePassword(evt) {
    evt.preventDefault();
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      let newPassword = { "password": { } };
      if(this.state.oldPassword) {
        Object.assign(newPassword.password, {old: this.state.oldPassword});
      }
      if(this.state.newPassword) {
        Object.assign(newPassword.password, {new: this.state.newPassword});
      }
      if(this.state.newPasswordCheck) {
        Object.assign(newPassword.password, {new_confirmation: this.state.newPasswordCheck});
      }
      if(this.state.newPassword === this.state.newPasswordCheck) {
        this.props.updatePassword(newPassword, this.state.user_id);
        this.closeModal();
        this.setState({
          oldPassword: '',
          newPassword: '',
          newPasswordCheck: ''
        });
      } else {
        toast.error(`Password entries don't match`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    }
  }
  joinGroup(evt) {
    evt.preventDefault();
    this.props.followGroup(evt.target.id, "userProfile", this.state.user_id);
  }
  leaveGroup(evt) {
    evt.preventDefault();
    this.props.leaveGroup(evt.target.id);
  }
  requestAccess(evt) {
    evt.preventDefault();
    this.props.requestGroupAccess(evt.target.id, "userProfile", this.state.user_id);
  }
  render() {
  if(this.props.match && localStorage.id === this.props.match.params.id){
    return (
      <div className="Profile-View">
        <Header />
        <ToastContainer autoClose={3000} transition={Flip} />
        <div className="Profile-Body">
        { this.props.user.length <= 0 ? (
          <div id="loading">
            <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
          </div>
          ) : (
          <React.Fragment>
          { this.state.connections ? (
              <div className="Connections-User">
              { this.props.connections.length <= 0 ? (
                null
                ) : (
                <Connections
                  data={ this.props.connections }
                  connect={ this.reconnectWithMyConnections }
                  disconnect={ this.unconnectWithMyConnections }
                />
                )}
              </div>
              ) : ( null )
            }
            { !this.props.user.isEditing &&
              <div key={this.props.user.id} >
                <MyProfile
                  data={ this.props.user.attributes }
                  experiences={ this.props.experience }
                  education={ this.props.education }
                  groups={ this.props.groups }
                  connections={ this.getConnections }
                  profile={ this.getProfile }
                  profileSelected={ this.state.profile }
                  connectionsSelected={ this.state.connections }
                  edit={ this.openEdit.bind(this, this.props.user, true) }
                  addSkills={ this.handleAddSkills }
                  addEducation={ this.handleAddEducation }
                  addExperience={ this.openAddExperience }
                  openLogout={ this.openLogoutModal }
                  openAccountManage={ this.openManageAccount }
                  openEditExperience={ this.openEditExperience }
                  openEditEducation={ this.openEditEducation }
                  openDocuments={ this.openDocuments }
                />
              </div>
            }

            <AddExperienceModal // Add a new Experience on My Profile
              show={ this.state.experienceAddOpen }
              onClose={ this.closeModal }
              className="Modal-Backdrop"
            >
              <AddExperience
                closeExperience={ this.closeModal } />

            </AddExperienceModal>

            <AddExperienceModal // Edit an experience on My Profile
              show={ this.state.experienceEditOpen }
              onClose={ this.closeModal }
              className="Modal-Backdrop"
            >
              <EditExperience
                closeExperience={ this.closeModal }
                experienceID={ this.state.experienceToEdit } />

            </AddExperienceModal>

            <AddExperienceModal // Add Education on My Profile
              show={ this.state.educationAddOpen }
              onClose={ this.closeModal }
              className="Modal-Backdrop"
            >
              <AddEducation
                closeEducation={ this.closeModal }
              />

            </AddExperienceModal>

            <AddExperienceModal
              show={ this.state.educationEditOpen }
              onClose={ this.closeModal }
              className="Modal-Backdrop"
            >
              <EditEducation // Edit an Education on My Profile
                closeEducation={ this.closeModal }
                educationID={ this.state.educationToEdit } />

            </AddExperienceModal>

            <AddExperienceModal // Add SKILLS to My Profile
              show={ this.state.skillsAddOpen }
              onClose={ this.closeModal }
              className="Modal-Backdrop"
            >
              <AddSkills
                closeSkills={ this.closeModal }
              />

            </AddExperienceModal>

            <Modal // DOUBLE CHECK LOGOUT MODAL
              show={ this.state.logoutModal }
              onClose={ this.closeModal }
              className="Modal-Backdrop"
            >
            <div className="Logout-Modal">
              <div className="Logout-Check">
                Are you sure you want to logout?
              </div>
                <NavLink to={`/logout`} id="Logout-button"> Log me out! </NavLink>
                <div className="Logout-Check-close" onClick={this.closeModal}>
                  Close
                </div>
            </div>
            </Modal>


            <AddExperienceModal // Manage Account (password, account type, etc)
              show={ this.state.manageAccount }
              onClose={ this.closeModal }
              className="Modal-Backdrop"
            >
              <ManageAccount
                user={ this.props.user }
                close={ this.closeModal }
                handleSelect={ this.handleSelect }
                save={ this.handlePersonalDetailsSubmit }
                personal={ this.getPersonalDetails }
                manage={ this.getManageAccount }
                personalSelected={ this.state.personalSelected }
                manageSelected={ this.state.manageSelected }
                oldPassword={ this.state.oldPassword }
                newPassword={ this.state.newPassword }
                newPasswordCheck={ this.state.newPasswordCheck }
                handleChange={ this.handleChange }
                setPassword={ this.handleSetPassword }
                changePassword={ this.handleChangePassword }
              />

            </AddExperienceModal>


            <EditModal // Edit My Profile Data (image, name, location, etc.)
              show={ this.props.user.isEditing }
              onClose={ this.openEdit.bind(this, this.props.user, false) }
              className="Modal-Backdrop"
            >
              <div className="Editing-User-Container">
                <div className="Edit-Upload-Form">
                  <Dropzone
                    className="dropzone"
                    accept="image/png, image/jpeg"
                    maxSize={ 3000000 }
                    onDrop={ this.onDrop }
                    onChange={ this.uploadFile }
                  >
                    {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                      if (acceptedFiles.length) { // Passes all checks!
                        return(
                          <div className="success-upload">
                            <div className="uploadNewPhoto">
                              <button
                               className="uploadPhoto-btn"
                               type="button"
                              >
                               Upload New Photo
                              </button>
                              <button
                               className="deletePhoto-btn"
                               onClick={this.deletePhoto}
                               type="button"
                              >
                               Delete
                              </button>
                            </div>
                          </div>
                        )}
                      if (rejectedFiles.length) {
                          if (rejectedFiles[0].size > 3000000) { // Less than 3MB
                            return <div className="error-upload">
                              Please make sure the<br />
                              file size is smaller than 3MB </div>
                          }
                        return <div className="error-upload">
                          Please upload JPEG or PNG format</div>
                      } // Wrong file-type
                      if (isDragAccept) {
                        return <div className="success-drag"> + </div>
                      } // Show a PLUS sign in drag area if correct size & type
                      if (isDragReject) {
                        return <div className="error-upload">
                        Please upload JPEG or PNG format</div>
                      } // Show this if it's wrong format
                      else {
                        return (
                          <div className="updatePhoto">
                            <button
                             className="uploadPhoto-btn"
                             type="button"
                            >
                             Update Profile Photo
                            </button>
                            <button
                             className="deletePhoto-btn"
                             onClick={this.deletePhoto}
                             type="button"
                            >
                             Delete
                            </button>
                          </div>
                        )
                      }
                    }}
                  </Dropzone>

                    <div className="thumbsContainer">
                      { !this.state.files.length ? ( // If there's an avatar already, show that
                        <div className="thumb">
                          <div id="thumbInner">
                          { this.props.user ? (
                            <img
                             src={this.props.user.attributes.avatar_medium}
                             alt="upload"
                            />
                          ) : null }
                          </div>
                        </div>
                        ) : ( // Otherwise show the preview for the new upload
                        <div className="thumb">
                          <div id="thumbInner">
                            <img
                             src={this.state.files[0].preview}
                             alt="upload"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                </div>
              <div className="Editing-User">
                <EditName
                  user={ this.props.user.attributes }
                  id={ this.props.user.id }
                  handleChange={ this.handleChange }
                  handleSelect={ this.handleSelect }
                  handleDropdown={ this.handleDropdown }
                />
              </div>
              <button
                className="Edit-Close-btn"
                type="button"
                onClick={this.openEdit.bind(this, this.props.user, false)} >
                X
              </button>
              <div className="Editing-Save-btn">
                <button
                  className="uploadPhoto-btn"
                  type="button"
                  onClick={this.handleSubmit.bind(this)} >
                  Save
                </button>
              </div>
            </div>
          </EditModal>

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
                  return  <div className="document-success-upload"> { acceptedFiles[0].name }</div>;
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

            <div className="Documents-Container">
            { this.props.documents.map((documents) => {
              let resumes = documents.attributes;
              return (
                <div key={documents.id}>
                  <Documents
                    data={resumes}
                    onDelete={this.openDeleteModal}
                    id={documents.id}
                  />
                </div>
            )})}
            </div>
          <br />
          { this.props.modal.modalType ===  "RESUME_SUCCESS" && (
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
            )}

              <Modal   //////DELETE RESUME MODAL////////
                show={this.state.deleteOpen}
                onClose={this.closeDeleteModal}
                className="Modal-Backdrop"
              >
              <div className="Resume-Skip">
               <img src={decline} alt="decline" />
               <div id="resume-skip-headline">
                Are you sure you want to Delete this Resume?
                <div id="resume-skip-subline">
                 Any job you have applied to with this resume <br />
                 Your application will be deleted as well <br />
                </div>
              </div>
              <div>
              <button
                aria-label="Back"
                className="resume-back-btn"
                type="submit"
                onClick={this.closeDeleteModal}
              >
                Oops, I don't wanna do that!
              </button>

                <button
                  aria-label="Skip"
                  className="resume-skip-btn"
                  type="submit"
                  onClick={this.resumeDelete}
                >
                  I uploaded the wrong Resume
                  Delete It!
                </button>
                 </div>
                </div>
              </Modal>
            </DocumentsModal>
           </React.Fragment>
          )}

          </div>
        </div>
  ) }
  else { // If this user is NOT me // Other User Profile
    return (
      <div className="Profile-View">
        <Header />
        <div className="Profile-Body">
        { this.props.otherUser.length <= 0 ? (
          <div id="loading">
            <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
          </div>
          ) : (
        <React.Fragment>
          { this.state.connections ? (
              <div className="Connections-User">
              { this.props.connections.length <= 0 ? (
                null
                ) : (
                  <Connections
                    data={ this.props.connections }
                    connect={ this.connectWithOtherUserConnections }
                    disconnect={ this.unconnectWithOtherUserConnections }
                  />
                )}
              </div>
              ) : ( null )
            }
          <JobSeekerProfile
            data={ this.props.otherUser[0].attributes }
            experiences={ this.props.experience }
            education={ this.props.education }
            id={ this.props.otherUser[0].id }
            groups={ this.props.otherUserGroups }
            connect={ this.connectWithUser }
            acceptConnect={ this.acceptConnect }
            disconnect={ this.unconnectUser }
            connections={ this.getConnections }
            profile={ this.getProfile }
            profileSelected={ this.state.profile }
            connectionsSelected={ this.state.connections }
            myData={ this.props.user }
            joinGroup={ this.joinGroup }
            requestAccess={ this.requestAccess }
          />
        </React.Fragment>
          )
        }
        </div>
      </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.userList,
    otherUser: state.otherUserList,
    otherUserGroups : state.otherUserGroupsList,
    connections: state.connectionsList,
    experience: state.experienceList,
    education: state.educationList,
    documents: state.documentsList,
    groups: state.groupsList,
    modal: state.modal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    getOtherUser: (id) => {
      dispatch(getOtherUser(id));
    },
    getOtherUserGroups: (id) => {
      dispatch(getOtherUserGroups(id))
    },
    getExperience: (id) => {
      dispatch(getExperience(id));
    },
    getEducation: (id) => {
      dispatch(getEducation(id));
    },
    connectUser: (id) => {
      dispatch(connectUser(id));
    },
    unconnectUser: (id, userID, where) => {
      dispatch(unconnectUser(id, userID, where));
    },
    getConnections: (id) => {
      dispatch(getConnections(id));
    },
    followUserConnections: (id, userID) => {
      dispatch(followUserConnections(id, userID));
    },
    makeUserEditable: (id, edit) => {
      dispatch(makeUserEditable(id, edit))
    },
    updateUserProfile: (data, ID) => {
      dispatch(updateUserProfile(data, ID))
    },
    uploadProfilePicture: (image) => {
      dispatch(uploadProfilePicture(image))
    },
    deleteResume: (id) => {
      dispatch(deleteResume(id))
    },
    loadFollowingGroups: () => {
      dispatch(loadFollowingGroups())
    },
    addExperience: (id) => {
      dispatch(addExperience(id))
    },
    getDocuments: () => {
      dispatch(getDocuments());
    },
    addFile: (file, name) => {
      dispatch(addFile(file, name));
    },
    updatePassword: (password, id) => {
      dispatch(updatePassword(password, id));
    },
    setPassword: (password) => {
      dispatch(setPassword(password));
    },
    acceptConnection: (userID, myID) => {
      dispatch(acceptConnection(userID, myID));
    },
    followGroup: (id, where, userID) => {
      dispatch(followGroup(id, where, userID));
    },
    requestGroupAccess: (id) => {
      dispatch(requestGroupAccess(id));
    },
    leaveGroup: (id) => {
      dispatch(leaveGroup(id));
    },
    updateProfile: (data, id) => {
      dispatch(updateProfile(data, id));
    },
    disconnectUser: (id, userID, where) => {
      dispatch(disconnectUser(id, userID, where));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewJobSeekerProfessional);