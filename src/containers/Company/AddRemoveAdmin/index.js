import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Flip } from "react-toastify";
import { addCompanyAdmin } from '../../../actions/company.actions.js';
import AdminConnections from '../../../components/company.admin.connections.components.js';
import CompanyAdmin from '../../../components/company.admin.components.js';

class AddRemoveAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      admin: [],
      companyID: props.companyID
    };
    this.selectAdmin = this.selectAdmin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectAdmin(evt) {
    console.log(evt);
    evt.preventDefault();
    let list = this.state.checked;

    let index = list.indexOf(parseInt(evt.target.id));
    if( !isNaN(evt.target.id) && index === -1 ) { // if it's not a part of the Selected array, add it
      this.setState({
        checked: [ ...list, parseInt(evt.target.id) ],
      });
    } else { // otherwise if it's in the array, remove it
      this.setState({
        checked: [ ...list.slice(0, index), ...list.slice(index + 1) ]
      });
    }
  }
  handleSubmit (evt) {
    evt.preventDefault();
    let companyID = this.state.companyID;
    for (var i = 0; i < this.state.checked.length; i++) {
      let userID = this.state.checked[i];
      if( !isNaN(userID) ) {
        this.props.addCompanyAdmin(companyID, userID);
        this.props.onClose();
      }
    }
  }
  render() {
   return(
      <div className="AddAdmin-body">
        <div className="AddAdmin-headline">
          Add/Remove Admin
        </div>
        <button
          className="AddAdmin-close-btn"
          type="button"
          onClick={e => { e.preventDefault(); this.props.onClose() }} >
          X
        </button>
        <div className="AddAdmin-components">
          <AdminConnections
            data={ this.props.connections }
            select={ this.selectAdmin }
            checked={ this.state.checked }
            admin={ this.props.admin }
          />
          <CompanyAdmin
            data={ this.props.admin }
            selected={ this.state.checked }
            connections={ this.props.connections }
            select={ this.selectAdmin }
          />
        </div>
        <div className="AddAdmin-button">
          <button
              onClick={ this.handleSubmit }
              aria-label="Save"
              className="AddAdmin-btn"
            >
            Save
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connections : state.connectionsList,
    admin: state.companyAdminList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCompanyAdmin: (companyID, userID) => {
      dispatch(addCompanyAdmin(companyID, userID));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddRemoveAdmin);