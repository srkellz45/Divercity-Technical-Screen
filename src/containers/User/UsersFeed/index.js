import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getUser } from '../../../actions/user.actions';
 import Header from '../../../components/Header';
// import Moment from 'moment';
 import StartSearch from '../../Job/StartSearch';
// //import StartConvo from '../StartConvo';
// //import Header from '../../components/Header';
// import Group from '../../../components/Group';
// import { ToastContainer, Flip } from "react-toastify";

class UsersFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupId: '',
      loading: false,
      page: 1,
    };
    //this.openModal = this.openModal.bind(this);
    //this.closeModal = this.closeModal.bind(this);
    //this.handleChange = this.handleChange.bind(this);

    //this.loadMore = this.loadMore.bind(this);
  }
  // openModal (evt) {
  //   this.setState({
  //     isOpen: true,
  //   });
  // }

  // closeModal () {
  //   this.setState({
  //     isOpen: false
  //   });
  // }

  componentDidMount() {
    window.scrollTo(0,0);
    //this.props.getUser(localStorage.id);
    //this.props.loadGroups();
    localStorage.setItem("pageLimit", 10);
  }

  // handleChange(evt) {
  //   evt.preventDefault();
  //   const target = evt.target;
  //   this.props.loadSingleJob(target.id);
  //   this.setState({
  //     jobId : target.id,
  //     isOpen: true,
  //     singleJob: this.props.singleJob
  //   });
  // }
  loadMore() {
    this.setState({
      page: this.state.page + 1
    });
    this.props.loadMoreJobs(this.state.page);
  }

  render() {
    return(
      <div id="main">
        <Header />
        <StartSearch />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // groups : state.groupsList, // makes it this.props.groups
    // user : state.userList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // loadGroups: () => {
    //   dispatch(loadGroups());
    // },
    // loadMoreJobs: (page) => {
    //   dispatch(loadMoreJobs(page));
    // },
    // getUser: (id) => {
    //   dispatch(getUser(id));
    // },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersFeed);