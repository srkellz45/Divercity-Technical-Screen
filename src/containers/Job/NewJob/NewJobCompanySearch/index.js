import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Flip } from "react-toastify";
import { loadCompanies, getMyCompanies } from '../../../../actions/company.actions';
import Modal from '../../../Modal';
import AddCompany from '../../../Company/AddCompany';
import Downshift from 'downshift';

class NewJobCompanySearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      company: '',
      isOpen: false,
      showCompany: false,
      noResults: false,
    };
    this.handleCompanySearch = this.handleCompanySearch.bind(this);
    this.selectCompany = this.selectCompany.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal (evt) {
    this.setState({
      isOpen: true,
    });
  }
  closeModal (evt) {
    this.setState({
      isOpen: false
    });
  }
  handleCompanySearch(evt) {
    // if Search returns empty, allow option to add new company
    setTimeout(() => { this.setState({noResults: true}); }, 1500);
    setTimeout(() => { this.setState({showCompany: true}); }, 1500);
    this.setState({
      query: evt.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
          this.props.getMyCompanies(this.state.query);
      } else if (!this.state.query.length) {
        this.setState ({
          query: '',
        });
      }
    });
  }
  selectCompany(company) {
    if(!company.attributes){
      this.setState({
        company: 'None',
      }, this.props.setState('None'));
    }
    else if (company.attributes.name){
      this.setState({
        company: company.attributes.name
      }, this.props.setState(company));
    }
  }
  render() {
    return (
      <React.Fragment>
      <ToastContainer autoClose={3000} transition={Flip} />
        <Downshift
          onStateChange={this.handleStateChange}
          onChange={this.selectCompany}
          //itemToString={item => (item ? `${item.attributes.name}` : '')}
          selectedItem={this.state.company}
        >
        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="Search-Input">
            <input
                { ...getInputProps({
                placeholder: this.state.company ? ( this.state.company ) : ( this.props.defaultValue ),
                onChange: this.handleCompanySearch
              })}
            />

            { isOpen && !this.props.results.length ? (
            <div className="newJob-downshift-dropdown">
              <div className="dropdown-item"style={{
                backgroundColor: 'white',
              }}>
                { !this.state.noResults ? ( <div>Loading...</div> ) : ( null ) }
              </div>
            </div>
            ) : null }

            { isOpen && this.props.results.length ? (
              <div className="newJob-downshift-dropdown">
                {
                  this.props.results.map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, item })}
                      style={{
                        backgroundColor: highlightedIndex === index ? '#ebebeb' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      }}>
                      {item.attributes.name}
                    </div>
                  ))
                }
              </div>
              ) : null }
          </div>
        )}
        </Downshift>

      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    results : state.myCompaniesList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyCompanies: () => {
      dispatch(getMyCompanies())
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewJobCompanySearch);