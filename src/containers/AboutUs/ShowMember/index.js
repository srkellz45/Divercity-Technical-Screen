import React, { Component } from 'react';

class ShowMember extends Component {
  constructor(props){
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose();
    }
  }
  render() {
    // Don't render if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // onClick={this.props.onClose}
    return (
      <div className="Modal-Backdrop">
        <div className="AboutUs-team-member" ref={this.setWrapperRef}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ShowMember;