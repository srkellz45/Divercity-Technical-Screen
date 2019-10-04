import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth.actions';

class Logout extends Component {
  constructor() {
    super();

    this.state = {
      redirect: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.logout();

  }

  componentDidMount(){
    this.props.logout();
  }

  render(){
    if(!localStorage.loggedIn) {
      return <Redirect to="/"/>
    }
    return (
      <div id="logout-container">

        <h2>See you later, alligator!</h2>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);