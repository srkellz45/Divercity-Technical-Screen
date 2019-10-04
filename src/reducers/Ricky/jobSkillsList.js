import { GET_JOB_SKILLS } from '../../actions/job.actions';

const initialState = [];

// NEED TO RETURN AS AN ARRAY OF OBJECT VALUES

const jobSkillsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_JOB_SKILLS:
    let jobSkillsArray = [];
    Object.keys(action.jobSkills).forEach(function(key) {
      jobSkillsArray.push(action.jobSkills[key].attributes.name);
    });
    return [...jobSkillsArray];
    default:
      return state;
  }
};

export default jobSkillsList;