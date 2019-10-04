import React, { Component } from 'react';

class AddExperienceModal extends Component {
  constructor(props){
    super(props);
  }
  render() {
    // Don't render if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // onClick={this.props.onClose}
    return (
      <div className="Modal-Backdrop">
        <div className="AddExperience-Modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AddExperienceModal;