import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import TempHeader from '../../../components/TempHeader.js';
import { getUser } from '../../../actions/user.actions';
import { uploadProfilePicture } from '../../../actions/onboard.actions';
import UserPhoto from '../../../assets/UserPhoto.png';
import Modal from '../../Modal';

class UploadProfilePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      document: [],
    };
  }
  componentDidMount() {
    this.props.getUser(localStorage.id);
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

  closeModal = () => {
    this.props.closeModal();
  }
  deletePhoto = (evt) => {
    evt.preventDefault();
    this.setState({
      files: [],
    });
  };
  uploadFile = (evt) => {
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
          this.props.uploadProfilePicture(dataUrl);
        }
        img.src = e.target.result;
      };
    reader.readAsDataURL(evt.target.files[0]);
   }
  };
  onDrop = (files) => {
    this.setState({
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file),
        size: file.size,
      }))
    });
  }
  render() {
    console.log(this.state.files);
    return (
        <div className="Photo-Upload-Form">
          <div className="Photo-Upload-image">
            <img src={ UserPhoto } alt="User Upload" />
          </div>
          <div className="Photo-Upload-headline">
            Please add a face to go <br />
            with your wonderful name
            <div className="Photo-Upload-subline">
              Profile Pics humanize your experience more.
            </div>
          </div>
          <Dropzone
            className="Photo-Upload-dropzone"
            accept="image/png, image/jpeg"
            maxSize={ 3000000 }
            onDrop={ this.onDrop }
            onChange={ this.uploadFile }
          >
            {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (acceptedFiles.length) { // Passes all checks!
                return(
                  <div className="Photo-Upload-success-upload">
                    <div className="Photo-Upload-sucess-text">
                      You look great!
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
                  <div className="photo-upload-buttons">
                    <button
                     className="Photo-Upload-btn"
                     type="button"
                    >
                     Add one now!
                    </button>
                  </div>
                )
              }
            }}
          </Dropzone>
          { this.state.files.length > 0 && (
            <div className="Photo-Upload-Preview">
              <div className="Photo-Upload-thumbsContainer">
                <div className="Photo-Upload-thumb">
                  <div id="Photo-Upload-thumbInner">
                    <img
                     src={this.state.files[0].preview}
                     alt="upload"
                    />
                  </div>
                </div>
              </div>
              <button
                 className="Photo-Upload-sucess-btn"
                 onClick={this.closeModal}
                 type="button"
                >
                 Done
              </button>
            </div>

          )}
          { !this.state.files.length && (
          <div className="Photo-Upload-skip" onClick={this.closeModal}>
            Maybe later
          </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    uploadProfilePicture: (image) => {
      dispatch(uploadProfilePicture(image))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadProfilePhoto);



