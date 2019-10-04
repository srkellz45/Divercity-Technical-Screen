import React from 'react';
import Dropdown from './Dropdown';
import ExperienceCitySearch from '../containers/AddExperienceModal/ExperienceCitySearch';
import ExperienceCompanySearch from '../containers/AddExperienceModal/ExperienceCompanySearch';
import { dateOfBirthMonth, workYear } from '../lib/selectListData';

const AddExperienceComponent = ({ user, id, handleTitle, handleCheck, handleStartDates, handleEndDates, setCompany, setCity, isChecked }) => {
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
            defaultValue={ user.title }
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
          defaultValue="e.g. Divercity"
        />
      </div>
      <div id="AddExperience-Data">
        Location
      </div>
      <div className="AddExperience-CitySearch">
        <ExperienceCitySearch
          setState={ setCity }
          defaultValue='e.g. San Francisco, California'
        />
      </div>
      { isChecked ? (
      <React.Fragment>
        <div id="AddExperience-Data">
          From
        </div>
        <div className="AddExperience-Single-Month">
          <Dropdown
            title="Month"
            list={ dateOfBirthMonth }
            setState={ handleStartDates }
          />
        </div>
        <div className="AddExperience-Single-Year">
          <Dropdown
            title="Year"
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
              title="Month"
              list={ dateOfBirthMonth }
              setState={ handleStartDates }
            />
          </div>
          <div className="AddExperience-Year">
            <Dropdown
              title="Year"
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
                title="Month"
                list={ dateOfBirthMonth }
                setState={ handleEndDates }
              />
            </div>
            <div className="AddExperience-Year">
              <Dropdown
                title="Year"
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
        />
        <div id="AddExperience-current-work">
          I currently work here
        </div>
      </div>
    </div>
    );
  }

export default AddExperienceComponent;
