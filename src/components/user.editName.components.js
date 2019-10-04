import React from 'react';
import CitySearch from '../containers/UserEdit/CitySearch';
import CountrySearch from '../containers/UserEdit/CountrySearch';
import CompanySearch from '../containers/UserEdit/CompanySearch';


const EditName = ({ user, id, handleChange, handleSelect, handleDropdown }) => {
  return (
    <div className="Edit-User-item" key={id}>
      <div className="Edit-User-name">
        <div id="Edit-User-Data">
          Name
        </div>
        <div className="edit-bio">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            defaultValue={ user.name }
            onChange={ handleChange }
          />
        </div>
      </div>
      <div id="Edit-User-Data">
        Headline
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
        Current Position
      </div>
      <div className="edit-bio">
        <input
          type="text"
          id="occupation"
          name="occupation"
          placeholder="Current Occupation"
          defaultValue={ user.occupation }
          onChange={ handleChange }
        />
      </div>
      <div id="Edit-User-Data">
        Current Company
      </div>
      <div className="Edit-CitySearch">
        <CompanySearch
          setState={handleDropdown.bind(this)}
          defaultValue={ user.company.name }
        />
      </div>
      <div id="Edit-User-Data">
        Country/Region
      </div>
      <div className="Edit-CitySearch">
        <CountrySearch
          setState={handleDropdown.bind(this)}
          defaultValue={ user.country }
        />
      </div>
      <div id="Edit-User-Data">
        Location
      </div>
      <div className="Edit-CitySearch">
        <CitySearch
          setState={handleDropdown.bind(this)}
          defaultValue={ user.city }
        />
      </div>
    </div>
    );
  }

export default EditName;
