import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCompanyLogos } from '../../../actions/company.actions';
import { createGroup } from '../../../actions/group.actions';
import { toast } from "react-toastify";
import Dropdown from '../../../components/Dropdown';
import UploadLogo from '../../../assets/icons/UploadLogo.png';
import ArrowLeft from '../../../assets/icons/ArrowLeft.png';
import LogoModal from '../../Company/LogoModal';
import Dropzone from 'react-dropzone';
import { privacyList } from '../../../lib/selectListData';
let ID = parseInt(localStorage.getItem('id'));

class AddGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      group_type: '',
      files: [],
      logo: null,
      selectedLogo: null,
      openLogoSearch: false,
      logoSearch: '',
      searching: false,
    };
    this.enterTitle = this.enterTitle.bind(this);
    this.enterDescription = this.enterDescription.bind(this);
    this.setPrivacy = this.setPrivacy.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogoSelect = this.handleLogoSelect.bind(this);
    this.clearLogo = this.clearLogo.bind(this);
    this.openLogoSearch = this.openLogoSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.searchLogo = this.searchLogo.bind(this);
    this.closeNewGroupModal = this.closeNewGroupModal.bind(this);
  }

  setPrivacy(title) {
    this.setState({
      group_type: title.toLowerCase()
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
    this.setState({
      selectedLogo: null,
      logoSearch: '',

    });
  }
  uploadFile(evt) {
    if (evt.target.files && evt.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var files = e.target.result;
        //resize image
        var img = document.createElement("img");
        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let MAX_WIDTH = 1080;
          let MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;
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
          ctx.drawImage(img, 0, 0, width, height);    
          let dataUrl = canvas.toDataURL("image/png");   
          this.setState({
            logo: dataUrl
          });
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

  enterTitle(evt) {
    this.setState({
      title: evt.target.value
    });
  }
  enterDescription(evt) {
    this.setState({
      description: evt.target.value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    let uploadLogo;
    if(this.state.logo) {
      uploadLogo = this.state.logo;
    }
    if(this.state.selectedLogo) {
      uploadLogo = this.state.selectedLogo;
    }
    let groupData = {
      title: this.state.title,
      group_type: this.state.group_type,
      description: this.state.description,
      picture: uploadLogo
    }
    this.props.createGroup(groupData);
    setTimeout(() => { this.props.closeNewGroupModal(); }, 2000);
  }
  handleLogoSelect(evt) {
    evt.preventDefault();
    this.setState({
      selectedLogo: evt.target.name,
      openLogoSearch: false
    });
  }
  clearLogo(evt) {
    evt.preventDefault();
    this.setState({
      selectedLogo: null,
      logo: null,
      files: [],
    })
  }
  openLogoSearch(evt) {
    evt.preventDefault();
    this.setState({
      openLogoSearch: true,
    })
  }
  closeModal(evt) {
    this.setState({
      openLogoSearch: false
    })
  }
  searchLogo(evt) {
    this.setState({
      logoSearch: evt.target.value,
    });
    if( !this.state.files.length && evt.target.value.length >= 1 ) {
      setTimeout(() => {
        this.props.getCompanyLogos(this.state.logoSearch);
        this.setState({ searching: true })
      }, 1500);
    }
  }
  closeNewGroupModal(evt) {
    this.props.closeNewGroupModal();
  }

  render() {
    const logos = this.props.logos.map((logo) => {
      return (
        <div id="company-thumb-logo">
          <img
            src={logo.url}
            alt="company-thumbs"
            name={logo.url}
            onClick={this.handleLogoSelect}
          />
        </div>) })
    const { files } = this.state;
    const thumbs = files.map(file => (
      <div className="company-upload-thumb" key="thumbs">
        <button
          className="Company-Close-btn"
          type="button"
          onClick={this.clearLogo}>
          X
        </button>
        <div id="company-thumbInner">
          <img
            src={file.preview}
            alt="upload"
          />
        </div>
      </div>
    ));
    const { selectedLogo } = this.state;
    const logoThumbs =
      <div className="company-upload-thumb" key="thumbs">
        <button
          className="Company-Close-btn"
          type="button"
          onClick={this.clearLogo}>
          X
        </button>
        <div id="company-thumbInner">
          <img
            src={ selectedLogo }
            alt="upload"
          />
        </div>
      </div>
    return (
      <div id="New-Group">
        <div className="Company-headline">
          Create a Group
        </div>
        <button
            className="New-Group-close-btn"
            type="button"
            onClick={ this.closeNewGroupModal } >
            X
        </button>
        <div className="NewGroup-Container">
          <div className="Company-Upload-Form">
            <Dropzone
              className="company-dropzone"
              accept="image/png, image/jpeg"
              maxSize={ 3000000 }
              onDrop={ this.onDrop }
              onChange={ this.uploadFile }
            >
              {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                if (rejectedFiles.length) {
                    if (rejectedFiles[0].size > 3000000) { // Less than 3MB
                      return <div className="company-error-upload">
                        Please make sure the<br />
                        file size is smaller than 3MB </div>
                    }
                  return <div className="company-error-upload">
                    Please upload JPEG or PNG format</div>
                } // Wrong file-type
                if (isDragAccept) {
                  return <div className="company-success-drag"> + </div>
                } // Show a PLUS sign in drag area if correct size & type
                if (isDragReject) {
                  return <div className="company-error-upload">
                  Please upload JPEG or PNG format</div>
                } // Show this if it's wrong format
                else {
                  return (
                  <React.Fragment>
                    { !this.state.selectedLogo && !this.state.files.length > 0 ? (
                    <div>
                      <div className="company-upload-background">
                        <div id="company-uploadLogo">
                          <img src={ UploadLogo } className="company-logo" alt="logo"/>
                        </div>
                      </div>
                      <div className="company-upload">
                        Click the camera icon to upload a Group Photo
                        <div className="Company-OR"><span> OR </span></div>
                          <div className="company-search-logo" onClick={ this.openLogoSearch }>
                            Search for the Group Photo online
                          </div>
                      </div>
                    </div>
                    ) : ( null ) }
                  </React.Fragment>
                  )
                }
              }}
            </Dropzone>
            <div className="Company-thumbsContainer">
              { thumbs }
            </div>
            <React.Fragment>
              { this.state.selectedLogo ? (
                <div className="Company-thumbsContainer">
                  { logoThumbs }
                </div>
              ) : ( null ) }
            </React.Fragment>
          <br />
          </div>
          <div className="company-select-form">
            <div id="company-select-title">
              Group Name
            </div>
            <div className="Company-input">
              <input
                type="title"
                id="title"
                autoComplete="title"
                placeholder="e.g. Women in Tech"
                defaultValue={this.state.title}
                onChange={this.enterTitle}
              />
            </div>
            <div id="company-select-title">
              Group Privacy
            </div>
            <div className="Company-input">
              <Dropdown
                title="Public/Private"
                list={ privacyList }
                setState={ this.setPrivacy }
              />
            </div>
            <div id="company-select-title">
              Group Description
            </div>
            <div className="Company-bio-input">
              <textarea
                className="company-bio-text"
                type="title"
                id="description"
                autoComplete="description"
                placeholder="Write a short description of your group."
                defaultValue={this.state.description}
                onChange={this.enterDescription}
              />
            </div>

          </div>

          <button // button useless since it gonna do all in one
            className="Company-Save-btn"
            type="submit"
            onClick={this.handleSubmit}>
            <strong>Create</strong>
          </button>
        </div>

        <LogoModal
          show={ this.state.openLogoSearch }
          onClose={ this.closeModal }
          className="Modal-Backdrop"
        >
          <div id="company-search-title">
            <div id="company-arrowLogo" onClick={ this.closeModal }>
              <img src={ ArrowLeft } className="company-logo" alt="logo"/>
            </div>
            Search for the Group Photo
          </div>

          <div className="Company-Logo-Search">
            <input
              type="name"
              id="logoSearch"
              placeholder="e.g. Women in Tech"
              defaultValue={this.state.logoSearch}
              onChange={this.searchLogo}
            />
          </div>
          { this.props.logos.length ? (
            <div className="company-thumb" key="thumbs">
              { logos }
            </div>
           ) : ( null ) }
           { !this.props.logos.length && this.state.searching ? (
            <div className="Company-Logo-Searching">
               <p className="loading">Searching<span>.</span><span>.</span><span>.</span></p>
            </div>
           ) : ( null ) }
        </LogoModal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    logos : state.companyLogosList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyLogos: (query) => {
      dispatch(getCompanyLogos(query))
    },
    createGroup: (group) => {
      dispatch(createGroup(group))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGroup);
