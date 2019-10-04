import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addIntegration } from '../../../actions/greenhouse.actions';
import Credentials from '../../../assets/ATS/ATS-1.png';
import Description from '../../../assets/ATS/ATS-2.png';
import SelectAll from '../../../assets/ATS/ATS-3.png';
import Copy from '../../../assets/ATS/ATS-4.png';
import Back from '../../../assets/icons/ArrowLeft.png';
import { toast, ToastContainer, Flip } from "react-toastify";
import Modal from '../../Modal';
import check from '../../../assets/Checkmark.png';

class ATS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowClick: false,
      completedModal: false,
      api: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeATSModal = this.closeATSModal.bind(this);
  }

  handleInput(evt) {
    evt.preventDefault();
    this.setState({
      api: evt.target.value,
      allowClick: true
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if(this.state.api.length > 20) {
      this.props.addIntegration(this.state.api, this.props.user.attributes.company.id);
      this.setState({completedModal: true});
    } else {
      toast.error(`Please check your API Key`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  }
  closeATSModal (evt) {
    evt.preventDefault();
    this.props.closeModal();
  }
  render() {
    return (
      <div id="New-Job">
      <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
        <div id="Back-Button" >
          <img src={ Back } alt="Back" id="Back-btn" onClick={ this.closeATSModal } />
        </div>
        <div id="New-Job-headline">
          ATS Sync
          <div id="New-Job-subline">
            Connect Greenhouse to automatically import jobs<br />
            and export candidates (Lever and Workable coming soon!)
          </div>
        </div>

        <hr />

        <div id="ATS-second-line">
          Add Greenhouse API key
        </div>

        <hr />

        <div id="ATS-note">
          Note: You must be a site admin AND have the "Can manage ALL <br />
          organization's API Credentials" developer permission in order to <br />
          generate an API key.
        </div>

        <hr />
        <div className="ATS-instruction">
          <img src={ Credentials } alt="Credentials" id="ATS-image"/>
          <div id="ATS-instruction-text">
            Go to the <a href="https://app2.greenhouse.io/configure/dev_center/credentials" target="_blank" rel="noopener" >Greenhouse API Credentials page </a>and click on the Create New API Key button.
          </div>
        </div>
        <div className="ATS-instruction">
          <img src={ Description } alt="Credentials" id="ATS-image"/>
          <div id="ATS-instruction-text">
            Enter “Divercity” in the Description field and select Harvest in the Type dropdown.
          </div>
        </div>
        <div className="ATS-instruction">
          <img src={ SelectAll } alt="Credentials" id="ATS-image"/>
          <div id="ATS-instruction-text">
            On the Manage API Key Permissions screen, select the following:
            <br />
            - Applications&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Jobs <br />
            - Candidates &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sources <br />
            - Job Posts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Users <br />
            - Job Stages&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Office
          </div>
        </div>
        <div className="ATS-instruction">
          <img src={ Copy } alt="Credentials" id="ATS-image"/>
          <div id="ATS-instruction-text">
            Copy the newly created API key and paste it below.
          </div>
        </div>
        <div className="NewJob-container">
          <div id="new-job-select-title">
            API KEY
          </div>
          <div className="new-job-input">
            <input
              name="APIKEY"
              onChange={this.handleInput}
              placeholder="Paste Key Here"
              type="text"
              value={this.state.api}
            />
          </div>

          </div>
        { this.state.allowClick ? (
          <button
            className="New-Job-Save-btn"
            type="submit"
            onClick={this.handleSubmit}>
            <strong>Connect to Greenhouse</strong>
          </button>
        ) : (
          <button className="ATS-No-btn">
            <strong>Connect to Greenhouse</strong>
          </button>
        )}
        <Modal   ////// ONBOARDING SUCCESS MODAL //////////
          show={this.state.completedModal}
          onClose={this.closeModal}
          className="Modal-Backdrop"
        >
        <div className="ATS-Success">
          <img src={check} alt="check" />
            <div id="resume-success-headline">
               Success!
               <div id="resume-success-subline">
                 Your Greenhouse ATS was synced successfully! <br />
                 It will take a few moments for your jobs to be imported <br />directly into our feed.<br /><br />

                 If you don't see your jobs, please contact support at <a href="mailto:support@divercity.io"> support@divercity.io </a>
               </div>
            </div>
            <NavLink to={`/jobs`} alt="ok" aria-label="ok">
              <button
                aria-label="Close"
                className="resume-success-btn"
                type="submit"
                onClick={this.closeATSModal}
              >
                Ok
              </button>
             </NavLink>
        </div>
      </Modal>

      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user : state.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIntegration: (api, ID) => {
      dispatch(addIntegration(api, ID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ATS);
