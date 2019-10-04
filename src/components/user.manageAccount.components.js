import React from 'react';
import Dropdown from './Dropdown';
import EducationDropdown from './EducationDropdown';

import { ageRangeList, ethnicityList, genderList, accountTypeList } from '../lib/selectListData';

const ManageAccount = ({ user, close, handleSelect, save, personal, manage, personalSelected, manageSelected, oldPassword, newPassword, newPasswordCheck, handleChange, setPassword, changePassword }) => {
  return (
    <div className="ManageAccount-item" key={3}>
      <div id="userProfile-Top">
         <button onClick={ personal } className="Job-Selector-btn" style={{cursor:'pointer'}}>
           <div className={personalSelected ? ("Selected") : (null)}> Personal Details </div>
         </button>
         <button onClick={ manage } className="Job-Selector-btn" style={{cursor:'pointer'}}>
           <div className={manageSelected ? ("Selected") : (null)}> Manage Account </div>
         </button>
      </div>
      { personalSelected ? ( // if Personal Details (default) is selected
        <React.Fragment>
          <div id="Manage-Account-Title">
            Personal Details
          </div>
            <button
              className="ManageAccount-close-btn"
              type="button"
              onClick={ close } >
              X
            </button>
          <div className="ManageAccount-container">
            <div id="Manage-Account-Data">
              Account Type
            </div>
              <div className="IndustrySearch">
                <Dropdown
                title="Select"
                list={accountTypeList}
                setState={handleSelect}
                />
              </div>
            <div id="Manage-Account-Data">
              Gender Identifier
            </div>
            { user.attributes.gender ? (
              <div className="IndustrySearch">
                <Dropdown
                title={user.attributes.gender}
                list={genderList}
                setState={handleSelect}
                />
              </div>
              ) : (
              <div className="IndustrySearch">
                <Dropdown
                title="Select"
                list={genderList}
                setState={handleSelect}
                />
              </div>
              )}
              <div id="Manage-Account-Data">
                Ethnicity
              </div>
              { user.attributes.ethnicity ? (
              <div className="IndustrySearch">
                <Dropdown
                title={user.attributes.ethnicity}
                list={ethnicityList}
                setState={handleSelect}
                />
              </div>
              ) : (
              <div className="IndustrySearch">
                <Dropdown
                title="Select"
                list={ethnicityList}
                setState={handleSelect}
                />
              </div>
              )}
            <div id="Manage-Account-Data">
              Age
            </div>
            { user.attributes.age_range ? (
              <div className="IndustrySearch">
                <Dropdown
                title={user.attributes.age_range}
                list={ageRangeList}
                setState={handleSelect}
                />
              </div>
              ) : (
              <div className="IndustrySearch">
                <Dropdown
                title="Select"
                list={ageRangeList}
                setState={handleSelect}
                />
              </div>
            )}
          </div>

          <div className="AddSkills-buttons">
            <button
              className="removeExperience-btn"
              type="button"
              onClick={close} >
              Cancel
            </button>
            <button
              className="addExperience-btn"
              type="button"
              onClick={save} >
              Save
            </button>
          </div>
        </React.Fragment>
      ) : ( null ) }

      { manageSelected ? ( // if Manage Account is selected
        <React.Fragment>
          <div id="Manage-Account-Title">
            Manage Account
          </div>
            <button
              className="ManageAccount-close-btn"
              type="button"
              onClick={ close } >
              X
            </button>
          { user.attributes.no_password_set ? ( // if they login via Social Media with no password set
            <div className="ManageAccount-container">
              <div id="Manage-Account-SetPassword">
                Since you logged in via Social Media, let's set a password for your account. <br />
                That way you will be able to log in with your email address next time.
              </div>
            <form onSubmit={ setPassword }>
              <div id="Manage-Account-Password">
                <input
                  value={newPassword}
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div id="Manage-Account-Password">
                <input
                  value={newPasswordCheck}
                  type="password"
                  name="newPasswordCheck"
                  onChange={handleChange}
                  placeholder="Re-Enter Password"
                />
              </div>
            </form>
              <div className="AddSkills-buttons">
                <button
                  className="Password-btn"
                  type="button"
                  onClick={close} >
                  Cancel
                </button>
                <button
                  className="Password-Save-btn"
                  type="button"
                  onClick={setPassword} >
                  Set Password
                </button>
              </div>
            </div>
            ) : (

            <div className="ManageAccount-container" >
              <div id="Manage-Account-SetPassword">
                Change Your Account Password. <br /><br />
                Be sure to make it long and complicated!
              </div>
            <form onSubmit={ changePassword }>
              <div id="Manage-Account-Password">
                <input
                  value={oldPassword}
                  type="password"
                  name="oldPassword"
                  onChange={handleChange}
                  placeholder="Current Password"
                  required
                />
              </div>
              <div id="Manage-Account-Password">
                <input
                  value={newPassword}
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  placeholder="New Password"
                  required
                />
              </div>
              <div id="Manage-Account-Password">
                <input
                  value={newPasswordCheck}
                  type="password"
                  name="newPasswordCheck"
                  onChange={handleChange}
                  placeholder="Re-Enter New Password"
                  required
                />
              </div>
            </form>
              <div className="AddSkills-buttons">
                <button
                  className="Password-btn"
                  type="button"
                  onClick={close} >
                  Cancel
                </button>
                <button
                  className="Password-Save-btn"
                  type="button"
                  onClick={changePassword} >
                  Save
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      ) : ( null ) }
    </div>
    );
  }

export default ManageAccount;
