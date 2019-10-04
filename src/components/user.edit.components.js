import React from 'react';
import Dropdown from './Dropdown';
import SchoolSearch from '../containers/Onboarding/SchoolSearch';
import CitySearch from '../containers/Onboarding/CitySearch';
import CompanySearch from '../containers/Onboarding/CompanySearch';

const EditUser = ({ user, id, handleChange, handleSelect, handleDropdown, genderItems, ethnicityItems, ageRangeItems }) => {
  let skills = user.skills.toString();
    return (
        <div className="Edit-User-item" key={id}>
          <div id="Edit-User-Data">
            Bio
          </div>
          <div className="edit-bio">
            <input
              type="text"
              id="bio"
              name="bio"
              placeholder="Bio"
              defaultValue={ user.bio }
              onChange={ handleChange }
            />
          </div>
          <div id="Edit-User-Data">
            Gender
          </div>
          { user.gender ? (
          <div className="IndustrySearch">
            <Dropdown
            title={user.gender}
            list={genderItems}
            setState={handleSelect.bind(this)}
            />
          </div>
          ) : (
          <div className="IndustrySearch">
            <Dropdown
            title="Select"
            list={genderItems}
            setState={handleSelect.bind(this)}
            />
          </div>
          )}
          <div id="Edit-User-Data">
            Ethnicity
          </div>
          { user.ethnicity ? (
          <div className="IndustrySearch">
            <Dropdown
            title={user.ethnicity}
            list={ethnicityItems}
            setState={handleSelect.bind(this)}
            />
          </div>
          ) : (
          <div className="IndustrySearch">
            <Dropdown
            title="Select"
            list={ethnicityItems}
            setState={handleSelect.bind(this)}
            />
          </div>
          )}
          <div id="Edit-User-Data">
              School
          </div>
          <div className="CitySearch">
            <SchoolSearch
              setState={handleDropdown.bind(this)}
              defaultValue={ user.school_name }
            />
          </div>
          <div id="Edit-User-Data">
            Location
          </div>
          <div className="CitySearch">
            <CitySearch
              setState={handleDropdown.bind(this)}
              defaultValue={ user.city }
            />
          </div>
          <div id="Edit-User-Data">
            Age
          </div>
          { user.age_range ? (
          <div className="IndustrySearch">
            <Dropdown
            title={user.age_range}
            list={ageRangeItems}
            setState={handleSelect.bind(this)}
            />
          </div>
          ) : (
          <div className="IndustrySearch">
            <Dropdown
            title="Select"
            list={ageRangeItems}
            setState={handleSelect.bind(this)}
            />
          </div>
          )}
          <div id="Edit-User-Data">
            Company
          </div>
          <div className="IndustrySearch">
            <CompanySearch
              setState={handleDropdown.bind(this)}
              defaultValue={ user.company.name }
            />
          </div>
          <div id="Edit-User-Data">
            Skills (Separate by comma) <br />
          </div>
          <div className="edit-bio">
            <input
              name="skills"
              onChange={ handleChange }
              placeholder="e.g. Javascript, React, HTML"
              type="text"
              defaultValue={ skills.replace(/,/g, ", ") }
            />
          </div>
        </div>
    );
  }

export default EditUser;
