import React, { Component } from 'react';
import { connect } from 'react-redux';
import TempHeader from '../../../components/TempHeader.js';
import { getUser, updateUserType } from '../../../actions/user.actions';

import OnboardingComponent from '../../../components/onboarding.type.components.js';
import job_seeker from '../../../assets/onboarding/job_seeker.png';
import student from '../../../assets/onboarding/student.png';
import entrepreneur from '../../../assets/onboarding/entrepreneur.png';
import professional from '../../../assets/onboarding/professional.png';
import hiring_manager from '../../../assets/onboarding/hiring_manager.png';
import recruiter from '../../../assets/onboarding/recruiter.png';


class OnboardingType extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0,0);
    this.props.getUser(this.state.id);
  }
  handleClick(evt) {
    evt.preventDefault();
    let typeID = evt.target.id;
    let id = localStorage.id;
    this.props.updateUserType(typeID, id);
  }


  render() {
    return (
      <div className="OnboardingType">
        <TempHeader />
        <div className="OnboardingType-body">
          <div className="OnboardingType-headline">
            What describes you best?<br />
            <div className="OnboardingType-subline">
              Don't worry, you can always change it later
            </div>
            <br />
            <br />
          </div>
            <div className="OnboardingType-wrapper">
              <OnboardingComponent
                title="Job Seeker"
                picture={ job_seeker }
                handler={ this.handleClick }
                value="job_seeker"
              />
              <OnboardingComponent
                title="Student"
                picture={ student }
                handler={ this.handleClick }
                value="student"
              />
              <OnboardingComponent
                title="Entrepreneur"
                picture={ entrepreneur }
                handler={ this.handleClick }
                value="entrepreneur"
              />
              <OnboardingComponent
                title="Professional"
                picture={ professional }
                handler={ this.handleClick }
                value="professional"
              />
              <OnboardingComponent
                title="Hiring Manager"
                picture={ hiring_manager }
                handler={ this.handleClick }
                value="hiring_manager"
              />
              <OnboardingComponent
                title="Recruiter"
                picture={ recruiter }
                handler={ this.handleClick }
                value="recruiter"
              />
            </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.userList,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    updateUserType: (type, id) => {
      dispatch(updateUserType(type, id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingType);
