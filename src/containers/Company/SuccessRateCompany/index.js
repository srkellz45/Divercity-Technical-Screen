import React, { Component } from 'react';
import Checkmark from '../../../assets/Checkmark.png';

class SuccessRateCompany extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="Rate-Company-Modal">
        <div className="cancel-btn">
          <button
            aria-label="Close Modal"
            className="close-btn"
            type="submit"
            onClick={this.props.onClose}
          >
            x
          </button>
        </div>
        <div className="Rate-company-grid">
            <img src={Checkmark} className="GreenCheckMark"/>
            <div className="Title">Thank You!</div>
            <div className="Success">Your rating has been recorded.</div>
            <div className="Rate-text">
                <button
                    className="Submit-btn"
                    type="submit"
                    onClick={this.props.onClose}
                    >
                    OK
                </button>
            </div>
        </div>       
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     singleJob : state.singleJobList,
//     user : state.userList,
//     documents: state.documentsList,
//     modal: state.modal,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadSingleJob: (id) => {
//       dispatch(loadSingleJob(id));
//     },
//     getUser: (id) => {
//       dispatch(getUser(id));
//     },
//     getDocuments: () => {
//       dispatch(getDocuments());
//     },
//     applyJob: (job, resume, cover) => {
//       dispatch(applyJob(job, resume, cover));
//     },
//     addFile: (file, name) => {
//       dispatch(addFile(file, name));
//     },
//   }
// }


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RateCompany);
export default SuccessRateCompany;
