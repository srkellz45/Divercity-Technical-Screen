import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/user.actions';
import { addCompany, getCompanySizes, getCompanyLogos } from '../../../actions/company.actions';
import { toast } from "react-toastify";
import USCitiesSearch from '../../USCitiesSearch';

import IndustrySearch from '../../Onboarding/IndustrySearch';
import CompanySizeDropdown from '../../../components/CompanySizeDropdown.js';
import UploadLogo from '../../../assets/icons/UploadLogo.png';
import ArrowLeft from '../../../assets/icons/ArrowLeft.png';
import LogoModal from '../LogoModal';
import Dropzone from 'react-dropzone';

let ID = parseInt(localStorage.getItem('id'));

class AddCompany extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      account_type: '',
      city: null,
      size: null,
      files: [],
      logo: null,
      selectedLogo: null,
      industry: null,
      openLogoSearch: false,
      logoSearch: '',
      searching: false,
    };
    this.enterName = this.enterName.bind(this);
    this.enterDescription = this.enterDescription.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setIndustry = this.setIndustry.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setSize = this.setSize.bind(this);
    this.handleLogoSelect = this.handleLogoSelect.bind(this);
    this.clearLogo = this.clearLogo.bind(this);
    this.openLogoSearch = this.openLogoSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.searchLogo = this.searchLogo.bind(this);
    this.closeNewCompanyModal = this.closeNewCompanyModal.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name] : value
    });
  }
  componentDidMount(){
    this.props.getUser(ID);
    this.props.getCompanySizes();
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
          let MAX_WIDTH = 160;
          let MAX_HEIGHT = 160;
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

  setIndustry(data) {
    this.setState({
      industry: data.id
    });
  }
  setLocation(data) {
    this.setState({
      location: data.city + ', ' + data.state
    });
  }
  setSize(name, id) {
    this.setState({
      size: id
    });
  }
  enterName(evt) {
    this.setState({
      name: evt.target.value
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
    let companyData = {
      name: this.state.name,
      description: this.state.description,
      size: this.state.size,
      location: this.state.location,
      industry: this.state.industry,
      logo: uploadLogo
    }
    if(this.state.name.length < 4) {
      toast.error("Please make your company name 4 characters or longer.", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    } else {
      console.log(companyData);
      this.props.addCompany(companyData, ID);
      setTimeout(() => { this.props.closeNewCompanyModal(); }, 2000);
    }
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
        this.props.getCompanyLogos(this.state.logoSearch + " " + "logo");
        this.setState({ searching: true })
      }, 1500);
    }
  }

  closeNewCompanyModal(evt) {
    this.props.closeNewCompanyModal();
  }
  render() {
    console.log(this.state.searching);
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
      <div id="Add-Company">
        <div className="Company-headline">
          Create a Profile for your Company
        </div>
        <button
            className="New-Group-close-btn"
            type="button"
            onClick={ this.closeNewCompanyModal } >
            X
        </button>
        <div className="AddCompany-Container">
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
                        Click or drag your company logo to upload.
                        <div className="Company-OR"><span> OR </span></div>
                          <div className="company-search-logo" onClick={ this.openLogoSearch }>
                            Search for the Company Logo Online
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
              Company Name
            </div>
            <div className="Company-input">
              <input
                type="name"
                id="name"
                autoComplete="name"
                placeholder="e.g. Divercity"
                defaultValue={this.state.name}
                onChange={this.enterName}
              />
            </div>
            <div id="company-select-title">
              Industry
            </div>
            <div className="Company-input">
              <IndustrySearch
                setState={this.setIndustry}
              />
            </div>
            <div id="company-select-title">
              Headquarters
            </div>
            <div className="Company-input">
              <USCitiesSearch
                setState={this.setLocation}
                defaultValue="e.g. San Francisco, CA"
              />
            </div>
            <div id="company-select-title">
              Company Size
            </div>
            <CompanySizeDropdown
              title="1-10 Employees/11-50 Employees/ ..."
              list={this.props.sizes}
              setState={this.setSize}
            />
            <div id="company-select-title">
              Company Description
            </div>
            <div className="Company-bio-input">
              <textarea
                className="company-bio-text"
                type="title"
                id="description"
                autoComplete="description"
                placeholder="Tell us about your company..."
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
            Search for the Company Logo
          </div>

          <div className="Company-Logo-Search">
            <input
              type="name"
              id="logoSearch"
              placeholder="e.g. Divercity"
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
    user : state.userList,
    sizes : state.companySizeList,
    logos : state.companyLogosList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    addCompany: (companyData, ID) => {
      dispatch(addCompany(companyData, ID))
    },
    getCompanySizes: () => {
      dispatch(getCompanySizes())
    },
    getCompanyLogos: (query) => {
      dispatch(getCompanyLogos(query))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompany);

  // handleSubmit(evt){
  //   evt.preventDefault();
  //   if (this.state.selectedGroupID) { // Don't allow empty submissions
  //     let joinGroups = {
  //       industry_ids: this.state.selectedGroupID
  //     };
  //   this.props.followGroup(joinGroups);
  //  } else {
  //   console.log("you gotta select atleast 3");
  //  }

  //   // this.setState({
  //   //   selectedGroupID: []
  //   // });
  // }