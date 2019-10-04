import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchJobs } from '../../../actions/job.actions';
import SearchModal from '../../SearchModal';

class StartConvo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      isOpen: false,
      page: 1,
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  openModal () {
    this.setState({
      isOpen: true,
    });
  }
  handleSearch() {
    this.setState({
      isOpen:false
    });
    this.props.searchJobs(this.state.page, this.state.searchInput);

  }
  closeModal () {
    this.setState({
      isOpen: false
    });
  }
  handleSearchInput(evt) {
    evt.preventDefault();
    this.setState({
      searchInput: (evt.target.value)
    });
  }

  render() {
    return (
      <div className="start-body">
        <div className="start-input-form">
          <button id="start-input" onClick={ this.openModal } >
            Search
          </button>
        </div>

        <SearchModal
          show={ this.state.isOpen }
          onClose={ this.closeModal }
          className="SearchModal-Backdrop"
        >
          <div className="modal-top">
            <button id="modal-button" onClick={ this.closeModal }> X </button>
          </div>
          <div className="search-input-body">
            <div id="search-input">
            Search For Your Dream Job
            </div>
            <div className="search-input-form">
              <div id="right-arrow">
                <div id="arrow">
                  &#10095;
                </div>
              </div>
            <div className="modal-bottom">
            <form className="searchForm" onSubmit={this.handleSearch}>
              <input
                value={ this.state.description }
                id="search-form"
                type="text"
                onChange={ this.handleSearchInput } />
              <button
              className="Register-btn"
              type="submit" >
                Search
              </button>
            </form>
          </div>
            </div>
          </div>

        </SearchModal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs : state.jobsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchJobs: (page, query) => {
      dispatch(searchJobs(page, query));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartConvo);

