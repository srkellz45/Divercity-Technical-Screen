import React, { Component } from 'react';
import PropTypes from 'prop-types';
import linkedin from '../../assets/LinkedIn.png';

export class LinkedIn extends Component {
  static propTypes = {
    className: PropTypes.string,
    onFailure: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    clientId: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage, false);
    if (this.popup && !this.popup.closed) this.popup.close();
  }

  getUrl = () => {
    const {redirectUri, clientId, state, scope} = this.props;
    // TODO: Support IE 11
    const scopeParam = (scope) ? `&scope=${encodeURI(scope)}` : '&scope=r_liteprofile%20r_emailaddress%20w_member_social'
    const linkedInAuthenLink = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}${scopeParam}&state=${state}`;
    return linkedInAuthenLink;
  }

  receiveMessage = (event) => {
    if (event.origin === window.location.origin) {
      if (event.data.errorMessage && event.data.from === 'Linked In') {
        this.props.onFailure(event.data);
        this.popup && this.popup.close();
      } else if (event.data.code && event.data.from === 'Linked In') {
        console.log(event.data.code)
        this.props.onSuccess({ code: event.data.code });
        this.popup && this.popup.close();
      }
    }
  };

  handleConnectLinkedInClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.props.onClick && this.props.onClick();
    this.popup = window.open(this.getUrl(), '_blank', 'width=600,height=650');
    window.removeEventListener('message', this.receiveMessage, false);
    window.addEventListener('message', this.receiveMessage, false);
  }


  render() {
    return (
      <div onClick={this.handleConnectLinkedInClick} className="LinkedIn-btn">
          <img src={ linkedin } alt="LinkedIn Login" aria-label="Login with LinkedIn"/>
      </div>

    );
  }
}

export default LinkedIn;