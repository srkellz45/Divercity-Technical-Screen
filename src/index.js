import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from "./history";
import thunk from 'redux-thunk';
import reducers from './reducers';
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import axios from 'axios';
//-----------------------------------------------------------
// PRIVACY POLICY //
import PrivacyPolicy from './containers/PrivacyPolicy';
// TERMS OF SERVICE //
import Terms from './containers/Terms';
// SIGNIN
import SignIn from './containers/SignIn';
// USERREGISTRATION
import UserRegistration from './containers/UserRegistration';
// ABOUT US //
import AboutUs from './containers/AboutUs';
// AUTH //
import Landing from './containers/Landing';
import Logout from './containers/Logout';
import PasswordReset from './containers/PasswordReset';
// ONBOARDING //
import OnboardingType from './containers/Onboarding/OnboardingType';
import UploadResume from './containers/Onboarding/UploadResume';
import JobSeeker from './containers/Onboarding/JobSeeker';
import CurrentCompany from './containers/Onboarding/CurrentCompany';
// STUDENT ONBOARDING //
import StudentSchool from './containers/Onboarding/Student/School';
// PROFESSIONAL ONBOARDING //
import CurrentWork from './containers/Onboarding/Professional/CurrentWork';
import PrivateInfo from './containers/Onboarding/Professional/PrivateInfo';
// RECRUITER ONBOARDING //
import RecruiterWork from './containers/Onboarding/RecruiterHiring/Work';
import RecruiterInfo from './containers/Onboarding/RecruiterHiring/PrivateInfo';
// JOB SEEKER ONBOARDING //
import JobSeekerResume from './containers/Onboarding/JobSeeker/Resume';
import JobSeekerJobs from './containers/Onboarding/JobSeeker/Jobs';
import JobSeekerCurrentWork from './containers/Onboarding/JobSeeker/Work';
import JobSeekerInfo from './containers/Onboarding/JobSeeker/Info';
// FEED //
import Feed from './containers/Feed';
import SearchResults from './containers/SearchResults';
// USER //
import UsersFeed from './containers/User/UsersFeed';
import ViewJobSeekerProfessional from './containers/User/ViewJobSeekerProfessional';
// NOTIFICATIONS //
import Notifications from './containers/Notifications';
// COMPANY //
import CompanyView from './containers/Company/CompanyView';
// JOBS //
import JobsFeed from './containers/Job/JobsFeed';
import SimilarJobsFeed from './containers/Job/SimilarJobsFeed';
import JobsByRecruiter from './containers/Job/JobsByRecruiter';
import EditJob from './containers/Job/EditJob';
// RECRUITER //
import RecruiterApplicants from './containers/Recruiter/RecruiterApplicants';
// GROUPS //
import PeopleFeed from './containers/Groups/PeopleFeed';
import GroupsFeed from './containers/Groups/GroupsFeed';
import SingleGroup from './containers/Groups/SingleGroup';
import SingleQuestion from './containers/Groups/SingleQuestion';
// DM //
import DirectMessage from './containers/Messages';
import NewMessages from './containers/NewMessages';
// ETC //
import SelectGroups from './containers/Onboarding/SelectGroups';
import LinkedInPopUp from './containers/LinkedIn/LinkedInPopUp';
import ATS from './containers/Job/ATS';
// Staffing
import Staffing from './containers/Staffing';

//-----------------------------------------------------------
import ReactGA from 'react-ga';

// ------STORE--------------------------
// const store = createStore(
//   reducers,
//   applyMiddleware(thunk)
// );
// Chrome only. Will crash app if enabled on any other browser.
const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose);
const store = createStore(reducers, compose(applyMiddleware(thunk), devTools));

axios.interceptors.response.use(response => {
  // edit request config
  return response;
}, error => {
  console.log(error);
  if(error.response.status === 401) {
    //redirect to login page
    localStorage.clear();
    history.push('/');
    store.dispatch({
     type: 'USER_LOGOUT'
    });
  }
  return Promise.reject(error);
});

// react ga
ReactGA.initialize('UA-138658203-1');
ReactGA.pageview(window.location.pathname + window.location.search);
// 1 is Professional
// 2 is Recruiter / Hiring Manager
// 3 is Job Seeker
// 4 is Student

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <div id="source">
        <Route exact path="/" component={ Landing } />
        <Route exact path="/signin" component={ SignIn } />
        <Route exact path="/user_registration" component={ UserRegistration } />
        <Route exact path="/about" component={ AboutUs } />
        <Route path="/password/" component={ PasswordReset } />
        <Route exact path="/feed" component={ Feed } />
        <Route exact path="/linkedin" component={ LinkedInPopUp } />
        <Route exact path="/logout" component={ Logout } />
        <Route exact path="/privacy" component={ PrivacyPolicy } />
        <Route exact path="/terms" component={ Terms } />
        <Route exact path="/staffing" component={ Staffing } />
        <Route exact path="/:id/onboarding" component={ OnboardingType } />
        <Route exact path="/:id/onboarding/school" component={ StudentSchool }/>
        <Route exact path="/:id/onboarding/work/1" component={ CurrentWork } />
        <Route exact path="/:id/onboarding/info/1" component={ PrivateInfo } />
        <Route exact path="/:id/onboarding/work/2" component={ RecruiterWork } />
        <Route exact path="/:id/onboarding/info/2" component={ RecruiterInfo } />
        <Route exact path="/:id/onboarding/resume/3" component={ JobSeekerResume } />
        <Route exact path="/:id/onboarding/jobs/3" component={ JobSeekerJobs } />
        <Route exact path="/:id/onboarding/work/3" component={ JobSeekerCurrentWork } />
        <Route exact path="/:id/onboarding/info/3" component={ JobSeekerInfo } />
        <Route exact path="/:id/onboarding/resume" component={ UploadResume } />
        <Route exact path="/:id/onboarding/js" component={ JobSeeker } />
        <Route exact path="/:id/onboarding/work" component={ CurrentCompany } />
        <Route exact path="/:id/onboarding/groups/" component={ SelectGroups } />

        <Route exact path="/:id/user" component={ ViewJobSeekerProfessional } />
        <Route exact path="/users" component={ UsersFeed } />
        <Route exact path="/users/:id" component={ ViewJobSeekerProfessional } />
        <Route exact path="/:id/user/jobs/applicants/:id" component={ RecruiterApplicants } />
        <Route exact path="/jobs" component={ JobsFeed } />
        <Route exact path="/jobs/similar/:id" component={ SimilarJobsFeed } />
        <Route exact path="/jobs/similar/user/:id" component={ JobsByRecruiter } />
        <Route exact path="/groups/:id" component={ SingleGroup } />
        <Route exact path="/questions/:id" component={ SingleQuestion } />
        <Route exact path="/company/:id" component={ CompanyView } />
        <Route exact path="/results/:query" component={ SearchResults }/>
        <Route exact path="/people" component={ PeopleFeed } />
        <Route exact path="/people/groups" component={ GroupsFeed } />
        <Route exact path="/notifications" component={ Notifications } />
        <Route path="/messages" component={ DirectMessage } />
        <Route exact path="/users/:id/chats/:id" component={ NewMessages } />
        <Route exact path="/ATS" component={ ATS } />
      </div>
    </Router>
  </Provider>, 

  document.getElementById('root')
);