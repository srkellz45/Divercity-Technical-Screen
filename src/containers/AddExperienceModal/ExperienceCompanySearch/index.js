import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Flip } from "react-toastify";
import { loadCompanies } from '../../../actions/company.actions';
import Modal from '../../Modal';
import AddCompany from '../../Company/AddCompany';
import Downshift from 'downshift';

class ExperienceCompanySearch extends Component {
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
          this.props.loadCompanies(this.state.query);
      } else if (!this.state.query.length) {
        this.setState ({
          query: '',
        });
      }
    });
  }
  selectCompany(company) {
    if (company.attributes.name){
      this.setState({
        company: company.attributes.name
      }, this.props.setState(company));
    }
  }
  render() {
    return (
      <React.Fragment>
        <Downshift
          onStateChange={this.handleStateChange}
          onChange={this.selectCompany}
          //itemToString={item => (item ? `${item.attributes.name}` : '')}
          selectedItem={this.state.company}
        >
        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="AddExperience-CitySearch">
            <input id="addExperience"
                { ...getInputProps({
                placeholder: this.state.company ? ( this.state.company ) : ( this.props.defaultValue ),
                onChange: this.handleCompanySearch
              })}
            />

            { isOpen && !this.props.results.length ? (
            <div className="AddExperience-downshift-dropdown">
              <div className="dropdown-item"style={{
                backgroundColor: 'white',
              }}>
                { !this.state.noResults ? ( <div>Loading...</div> ) : ( null ) }
              </div>
              { this.state.showCompany ? (
                <React.Fragment>
                  <div className="dropdown-add-company" onClick={this.openModal}>
                    Add a new Company? <br />
                  </div>
                </React.Fragment>
                ) : null }
            </div>
            ) : null }

            { isOpen && this.props.results.length ? (
              <div className="AddExperience-downshift-dropdown">
                <div className="dropdown-add-company" onClick={this.openModal}>
                  Add a new Company? <br />
                </div>
                {
                  this.props.results.map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, item })}
                      style={{
                        backgroundColor: highlightedIndex === index ? '#d9dbe0' : 'white',
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
                    <Modal //// DOCUMENTS / RESUME MODAL
              show={this.state.isOpen}
              onClose={this.closeModal}
            >
              <AddCompany
                dataSent={ this.closeModal }
              />
            </Modal>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    results : state.companiesList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCompanies: (query) => {
      dispatch(loadCompanies(query))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceCompanySearch);