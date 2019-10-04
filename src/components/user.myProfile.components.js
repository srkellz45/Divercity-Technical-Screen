import React from 'react';
import { NavLink } from 'react-router-dom';

import Calendar from '../assets/icons/Calendar.png';
import Briefcase from '../assets/icons/Briefcase.png';
import Location from '../assets/icons/Location.png';
import Users from '../assets/icons/Users.png';
import Globe from '../assets/icons/Globe.png';
import Gift from '../assets/icons/Gift.png';
import Edit from '../assets/icons/Edit.png';
import Add from '../assets/icons/Add.png';
import Account from '../assets/icons/Account.png';
import Logout from '../assets/Logout.png';


const MyProfile = ({ data, experiences, education, groups, connections, profile, profileSelected, connectionsSelected, edit, addSkills, addEducation, addExperience, openLogout, openAccountManage, openEditExperience, openEditEducation, openDocuments }) => {
  let id = localStorage.id;
  let skills = data.skills.map(skill => <div id="userProfile-Skills-btn"> { skill } </div> )
  let experienceMap = experiences.map(experience => {
    return (
    <div className="userProfile-Experience-object" key={id}>
          <div id="userProfile-Edit-Experience">
            <img src={ Edit } className="userProfile-icon" alt="Edit" onClick={ openEditExperience } id={ experience.id } />
          </div>
      <div id="userProfile-Experience-image">
        <NavLink to={`/company/${experience.attributes.job_employer_info.id}`}>
          <img src={ experience.attributes.job_employer_info.picture_thumb } alt="experience" />
        </NavLink>
      </div>
      <div id="userProfile-Experience-headline">
        { experience.attributes.role }
      </div>
      <div id="userProfile-Experience-subline">
        <NavLink to={`/company/${experience.attributes.job_employer_info.id}`}>
          { experience.attributes.job_employer_info.name }
        </NavLink>
      </div>

      { experience.attributes.is_present ? (
        <div id="userProfile-Experience-subline">
          { experience.attributes.job_start } - Present
        </div>
          ) : (
        <div id="userProfile-Experience-subline">
          { experience.attributes.job_start } - { experience.attributes.job_end }
        </div> )}
    </div>
  ) })
  let educationMap = education.map(education => {
    return (
      <div className="userProfile-Experience-object">
            <div id="userProfile-Edit-Experience">
              <img src={ Edit } className="userProfile-icon" alt="Edit" onClick={ openEditEducation } id={ education.id } />
            </div>
        <div id="userProfile-Experience-headline">
          { education.attributes.school_info.id }
        </div>
        <div id="userProfile-Experience-subline">
          { education.attributes.qualification }
        </div>
        <div id="userProfile-Experience-subline">
            { education.attributes.start_year } - { education.attributes.end_year }
        </div>
      </div>
    )
  })
  let groupData = groups.map(group => {
    return (
      <div className="userProfile-Groups-grid" key={group.id}>
        <div className="userProfile-Groups-image">
          <NavLink to={`/groups/${group.id}`}>
            <img src={ group.attributes.picture_main } alt="Company-Image" />
          </NavLink>
        </div>
        <div className="userProfile-Groups-title">
          <NavLink to={`/groups/${group.id}`}>
            { group.attributes.title }
          </NavLink>
        </div>
        <div id="userProfile-Groups-members">
          { group.attributes.followers_count } Members
        </div>
      </div>
    );
  });

   return (
      <div className="userProfile-body" key={id}>
        <div className="userProfile-main">
          <div id="userProfile-Top">
            <button onClick={ profile } className="Job-Selector-btn" id={id} style={{cursor:'pointer'}}>
              <div id={id} className={profileSelected ? ("Selected") : (null)}> Profile </div>
            </button>
            <button onClick={ connections } className="Job-Selector-btn" id={id} style={{cursor:'pointer'}}>
              <div id={id} className={connectionsSelected ? ("Selected") : (null)}> Connections </div>
            </button>
          </div>
          { profileSelected && (
          <div className="userProfile-Experience-body">
            <div id="userProfile-Experience">
              <div id="userProfile-Add">
                <img src={ Add } className="userProfile-icon" alt="Add" onClick={ addExperience } />
              </div>
              Experience
            </div>
            <div id="userProfile-Experience-item">
              { experienceMap }
            </div>
            <div id="userProfile-Experience">
              <div id="userProfile-Add">
                <img src={ Add } className="userProfile-icon" alt="Add" onClick={ addEducation } />
              </div>
              Education
            </div>
            <div id="userProfile-Experience-item">
              { educationMap }
            </div>
            <div id="userProfile-Experience">
              <div id="userProfile-Add">
                <img src={ Add } className="userProfile-icon" alt="Add" onClick={ addSkills } />
              </div>
              Skills
            </div>
            <div id="userProfile-Skills-item">
              { skills }
            </div>
            <div id="userProfile-Experience">
              Groups
            </div>
            <div id="userProfile-Groups-item">
              { groupData }
            </div>
          </div>
            )}

        </div>

        <div className="userProfile-box">
          <div id="userProfile-Edit">
            <img src={ Edit } className="userProfile-icon" alt="Edit" onClick={ edit } />
          </div>
          <div id="userProfile-photo">
            <img src={ data.avatar_medium } alt="profile" />
          </div>
          <div id="userProfile-Name">
            { data.name }
          </div>
          { data.account_type === 'job_seeker' && (
            <div id="userProfile-Type">
              Job Seeker
            </div> )}
          { data.account_type === 'professional' && (
            <div id="userProfile-Type">
              Professional
            </div> )}
          { data.account_type === 'recruiter' && (
            <div id="userProfile-Type">
              Recruiter
            </div> )}
          { data.account_type === 'hiring_manager' && (
            <div id="userProfile-Type">
              Hiring Manager
            </div> )}
          { data.account_type === 'student' && (
            <div id="userProfile-Type">
              Student
            </div> )}
          { data.account_type === 'entrepreneur' && (
            <div id="userProfile-Type">
              Entrepreneur
            </div> )}

          <div id="userProfile-Info">
            { data.bio }
          </div>

          <div id="userProfile-Data" onClick={ openDocuments } style={{cursor:"pointer"}}>
            <img src={Calendar} className="userProfile-icon" alt="Calendar" />
            View Resume
          </div>
          { data.occupation && (
          <div id="userProfile-Data">
            <img src={Briefcase} className="userProfile-icon" alt="Briefcase" />
            { data.company.name ? (
            <div id="userProfile-Work">
             { data.occupation } at <a href={`/company/${data.company.id}`}>{ data.company.name }</a>
            </div>
            ) : (
            <div id="userProfile-Work">
             { data.occupation }
            </div>
            )}
          </div>
          )}

          { data.city && (
          <div id="userProfile-Data">
            <img src={Location} className="userProfile-icon" alt="Location" />
            { data.city }
          </div>
          )}

          { data.gender && (
          <div id="userProfile-Data">
            <img src={Users} className="userProfile-icon" alt="User" />
            { data.gender }
          </div>
          )}

          { data.ethnicity && (
          <div id="userProfile-Data">
            <img src={Globe} className="userProfile-icon" alt="Ethnicity" />
            { data.ethnicity }
          </div>
          )}

          { data.age_range && (
          <div id="userProfile-Data">
            <img src={Gift} className="userProfile-icon" alt="age range" />
            { data.age_range }
          </div>
          )}

          <div id="userProfile-Data" onClick={openAccountManage} style={{cursor:'pointer', marginLeft:"-3px"}}>
            <img src={Account} className="userProfile-icon" alt="manage account" />
            Manage Account
          </div>
          <div id="userProfile-Data" onClick={openLogout} style={{cursor:'pointer'}}>
            <img src={Logout} className="userProfile-icon" alt="logout" />
            Logout
          </div>
        </div>
      </div>
    );
  }

export default MyProfile;

