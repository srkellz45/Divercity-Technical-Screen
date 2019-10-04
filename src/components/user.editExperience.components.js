import React from 'react';
import Dropdown from './Dropdown';
import ExperienceCitySearch from '../containers/AddExperienceModal/ExperienceCitySearch';
import ExperienceCompanySearch from '../containers/AddExperienceModal/ExperienceCompanySearch';
import { dateOfBirthMonth, workYear } from '../lib/selectListData';

const EditExperienceComponent = ({ experience, id, handleTitle, handleCheck, handleStartDates, handleEndDates, setCompany, setCity, isChecked }) => {
  let startMonth = experience.job_start.split(",")[0];
  let startYear = experience.job_start.split(",")[1];
  let endMonth = experience.job_end.split(",")[0];
  let endYear = experience.job_end.split(",")[1];
  return (
    <div className="AddExperience-item" key={id}>
      <div className="AddExperience-name">
        <div id="AddExperience-Data">
          Title
        </div>
        <div className="addExperience-bio">
          <input
            type="text"
            id="addExperience"
            placeholder="Name"
            defaultValue={ experience.role }
            onChange={ handleTitle }
          />
        </div>
      </div>
      <div id="AddExperience-Data">
        Company
      </div>
      <div className="addExperience-bio">
        <ExperienceCompanySearch
          setState={ setCompany }
          defaultValue={ experience.job_employer_info.name }
        />
      </div>
      <div id="AddExperience-Data">
        Location
      </div>
      <div className="AddExperience-CitySearch">
        <ExperienceCitySearch
          setState={ setCity }
          defaultValue={ experience.location_words }
        />
      </div>
      { isChecked ? (
      <React.Fragment>
        <div id="AddExperience-Data">
          From
        </div>
        <div className="AddExperience-Single-Month">
          <Dropdown
            title={startMonth}
            list={ dateOfBirthMonth }
            setState={ handleStartDates }
          />
        </div>
        <div className="AddExperience-Single-Year">
          <Dropdown
            title={startYear}
            list={ workYear }
            setState={ handleStartDates }
          />
        </div>
      </React.Fragment>
      ) : (
      <div className="AddExperience-dates-container">
        <div id="AddExperience-Data">
          From
        </div>
        <div className="AddExperience-dates">
          <div className="AddExperience-Month">
            <Dropdown
              title={startMonth}
              list={ dateOfBirthMonth }
              setState={ handleStartDates }
            />
          </div>
          <div className="AddExperience-Year">
            <Dropdown
              title={startYear}
              list={ workYear }
              setState={ handleStartDates }
            />
          </div>
        </div>
          <div id="AddExperience-To">
            To
          </div>
          <div className="AddExperience-dates">
            <div className="AddExperience-Month">
              <Dropdown
                title={endMonth}
                list={ dateOfBirthMonth }
                setState={ handleEndDates }
              />
            </div>
            <div className="AddExperience-Year">
              <Dropdown
                title={endYear}
                list={ workYear }
                setState={ handleEndDates }
              />
            </div>
          </div>
      </div>
      )}
      <div className="AddExperience-checkbox">
        <input
          name="is_present"
          type="checkbox"
          onChange={ handleCheck }
          defaultChecked={ isChecked }
        />
        <div id="AddExperience-current-work">
          I currently work here
        </div>
      </div>
    </div>
    );
  }

export default EditExperienceComponent;
