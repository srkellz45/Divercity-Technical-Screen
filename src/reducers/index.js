// A reducer takes in action and current state
import { combineReducers } from 'redux';
import auth from './Ricky/auth';
import groupsList from './Ricky/groupsList';
import otherUserList from './Ricky/otherUserList';
import otherUserGroupsList from './Ricky/otherUserGroupsList';
import groupAdminsList from './Ricky/groupAdminsList';
import groupMembersList from './Ricky/groupMembersList';
import jobsList from './Ricky/jobsList';
import recommendedJobsList from './Ricky/recommendedJobsList';
import recommendedGroupsList from './Ricky/recommendedGroupsList';
import recommendedUsersList from './Ricky/recommendedUsersList';
import trendingGroupsList from './Ricky/trendingGroupsList';
import similarJobsList from './Ricky/similarJobsList';
import singleJobList from './Ricky/singleJobList';
import singleApplicationList from './Ricky/singleApplicationList';
import singleGroupList from './Ricky/singleGroupList';
import singleGroupQuestionsList from './Ricky/singleGroupQuestionsList';
import singleQuestionList from './Ricky/singleQuestionList';
import jobTypeList from './Ricky/jobTypeList';
import jobSkillsList from './Ricky/jobSkillsList';
import industryList from './Ricky/industryList';
import companiesList from './Ricky/companiesList';
import occupationsList from './Ricky/occupationsList';
import schoolsList from './Ricky/schoolsList';
import majorList from './Ricky/majorList';
import userList from './Ricky/userList';
import allUsersList from './Ricky/allUsersList';
import peopleList from './Ricky/peopleList';
import experienceList from './Ricky/experienceList';
import educationList from './Ricky/educationList';
import searchUserList from './Ricky/searchUserList';
import searchGroupsList from './Ricky/searchGroupsList';
import searchJobsList from './Ricky/searchJobsList';


import cityList from './Ricky/cityList';
import countryList from './Ricky/countryList';
import checkEmail from './Ricky/checkEmail';
import checkUsername from './Ricky/checkUsername';
import documentsList from './Ricky/documentsList';
import applySuccess from './Ricky/applySuccess';
import applicationsList from './Ricky/applicationsList';
import applicantsList from './Ricky/applicantsList';
import employeesList from './Ricky/employeesList';
import companySizeList from './Ricky/companySizeList';
import savedJobsList from './Ricky/savedJobsList';
import myJobsList from './Ricky/myJobsList';
import recruiterJobsList from './Ricky/recruiterJobsList';
import questionsList from './Ricky/questionsList';
import connectionsList from './Ricky/connectionsList';
import companyLogosList from './Ricky/companyLogosList';
import companyRatingsList from './Ricky/companyRatingsList';
import singleCompanyList from './Ricky/singleCompanyList';
import singleCompanyJobList from './Ricky/singleCompanyJobList';
import myCompaniesList from './Ricky/myCompaniesList';
import answersList from './Ricky/answersList';
import modal from './Ricky/modal';

import notificationsList from './Ricky/notificationsList';
import groupRequestsList from './Ricky/groupRequestsList';
import allNotificationsList from './Ricky/allNotificationsList';
import chatID from './Ricky/chatID';
import chatList from './Ricky/chatList';
import allChatsList from './Ricky/allChatsList';

import companyAdminList from './Ricky/companyAdminList';
import deselectedRecommendedUsersList from './deselectedRecommendedUsersList';

const rootReducer = combineReducers({
  auth: auth,
  groupsList,
  otherUserGroupsList,
  groupAdminsList,
  groupMembersList,
  jobsList,
  recommendedJobsList,
  recommendedGroupsList,
  recommendedUsersList,
  trendingGroupsList,
  similarJobsList,
  singleJobList,
  singleApplicationList,
  singleGroupList,
  singleGroupQuestionsList,
  singleQuestionList,
  jobTypeList,
  jobSkillsList,
  industryList,
  companiesList,
  occupationsList,
  schoolsList,
  majorList,
  experienceList,
  educationList,
  userList,
  allUsersList,
  searchUserList,
  searchGroupsList,
  searchJobsList,
  peopleList,
  otherUserList,
  cityList,
  countryList,
  checkEmail,
  checkUsername,
  documentsList,
  applySuccess,
  applicationsList,
  applicantsList,
  employeesList,
  companySizeList,
  savedJobsList,
  myJobsList,
  recruiterJobsList,
  questionsList,
  connectionsList,
  companyLogosList,
  companyRatingsList,
  singleCompanyList,
  singleCompanyJobList,
  myCompaniesList,
  answersList,
  modal,
  groupRequestsList,
  notificationsList,
  allNotificationsList,
  chatID,
  chatList,
  allChatsList,
  companyAdminList,
  deselectedRecommendedUsersList
});

export default (state, action) => (
  action.type === 'USER_LOGOUT'
    ? rootReducer(undefined, action)
    : rootReducer(state, action)
);
// ugh-lee but basically has a default empty state for RootReducer
// and if you LOGOUT, it sets state on all to original empty state
// for security (Dan Abramov explains it here
// (https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992)

