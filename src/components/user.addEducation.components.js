import React from 'react';
import EducationDropdown from './EducationDropdown';
import EducationYearDropdown from './EducationYearDropdown';
import EducationSchoolSearch from '../containers/AddExperienceModal/EducationSchoolSearch';
import EducationMajorSearch from '../containers/AddExperienceModal/EducationMajorSearch';

import { workYear, degreeList, educationExpectedYear} from '../lib/selectListData';

const AddEducationComponent = ({ user, id, setSchool, setMajor, handleDegree, handleStartDates, handleEndDates }) => {
  return (
    <div className="AddExperience-item" key={id}>
      <div className="AddExperience-name">
        <div id="AddExperience-Data">
          School
        </div>
        <div className="addExperience-bio">
          <EducationSchoolSearch
            setState={ setSchool }
          />
        </div>
      </div>

      <div id="AddExperience-Data">
        Degree
      </div>
      <div className="addExperience-bio" style={{width: "455px"}}>
        <EducationDropdown
          title="BS / BA / BFA / MS / MA / PhD..."
          list={ degreeList }
          setState={ handleDegree }
        />
      </div>
      <div id="AddEducation-Data">
        Field of Study
      </div>
      <div className="addExperience-bio" style={{width: "455px"}}>
        <EducationMajorSearch
          setState={ setMajor }
        />
      </div>
      <div className="AddEducation-dates-container">
        <div id="AddEducation-Dates">
          From
          <div className="AddEducation-Year">
            <EducationYearDropdown
              title="Year"
              list={ workYear }
              setState={ handleStartDates }
            />
          </div>
        </div>
          <div id="AddEducation-To">
            To (or expected)
            <div className="AddEducation-Year">
              <EducationYearDropdown
                title="Year"
                list={ educationExpectedYear }
                setState={ handleEndDates }
              />
            </div>
          </div>
      </div>
    </div>
    );
  }

export default AddEducationComponent;
