import React from 'react';
import { NavLink } from 'react-router-dom';
import Calendar from '../assets/icons/Calendar.png';
import Briefcase from '../assets/icons/Briefcase.png';
import Location from '../assets/icons/Location.png';
import Users from '../assets/icons/Users.png';
import Globe from '../assets/icons/Globe.png';
import Gift from '../assets/icons/Gift.png';

const SingleUser = ({ data, id, edit, documents }) => {
  let skills = data.skills.toString();
   return (
      <div className="singleUser-grid" key={id}>
        <div id="profile-photo">
          <img src={ data.avatar_medium } alt="profile" />
        </div>
        <div id="singleUser-item">
          <div id="singleUser-name">
            { data.name }
          </div>
          { data.account_type === 'job_seeker' ? (
            <div id="singleUser-Type">
              Job Seeker
            </div> ) : (null)
          }
          { data.account_type === 'recruiter' ? (
            <div id="singleUser-Type">
              Recruiter
            </div> ) : (null)
          }
          { data.account_type === 'hiring_manager' ? (
            <div id="singleUser-Type">
              Hiring Manager
            </div> ) : (null)
          }
          { data.account_type === 'student' ? (
            <div id="singleUser-Type">
              Student
            </div> ) : (null)
          }
          { data.account_type === 'entrepreneur' ? (
            <div id="singleUser-Type">
              Entrepreneur
            </div> ) : (null)
          }
          { data.account_type === 'professional' ? (
            <div id="singleUser-Type">
              Professional
            </div> ) : (null)
          }
          <div id="singleUser-Info">
            { data.bio }
          </div>
          <div className="singleUser-buttons">
              <NavLink to={`/users/${id}`} className="singleUser-btn" style={{paddingTop: "7px"}}>
               View Public Profile
              </NavLink>
            { (data.account_type) === "student" || (data.account_type) === "job_seeker" ? (
                <NavLink to={`/${id}/user/applications`} className="singleUser-btn" style={{paddingTop: "7px"}}>
                  my applications
                </NavLink>
            ) : ( null )}
            { (data.account_type) === "recruiter" || (data.account_type) === "hiring_manager" ? (
                <NavLink to={`/${id}/user/jobs`} className="singleUser-btn" style={{paddingTop: "7px"}}>
                  See Jobs Posted
                </NavLink>
            ) : ( null )}

              <NavLink to={`/${id}/user/saved`} className="singleUser-btn" style={{paddingTop: "7px"}}>
               My Saved Jobs
              </NavLink>

            <button
              className="singleUser-btn"
              type="button"
              onClick={edit}>
              Edit Profile
            </button>
            <button
              className="singleUser-btn"
              type="button"
              onClick={documents}>
              view documents
            </button>
          </div>
          <div id="userProfile-Data">
            <img src={Briefcase} className="userProfile-icon" />
            { data.occupation && data.company ? ( `${data.occupation} at ${ data.company.name}` ) : ( null ) }
            { !data.occupation && data.company ? ( `${data.company.name}` ) : ( null ) }
            { data.occupation && !data.company ? ( `${data.occupation}` ) : ( null ) }
            { !data.occupation && !data.company ? ( 'No Company Listed' ) : ( null ) }
          </div>
          <div id="userProfile-Data">
            <img src={Location} className="userProfile-icon" />
            { data.city }
          </div>
          <div id="userProfile-Data">
            <img src={Users} className="userProfile-icon" />
            { data.gender }
          </div>
          <div id="userProfile-Data">
            <img src={Globe} className="userProfile-icon" />
            { data.ethnicity }
          </div>
          <div id="userProfile-Data">
            <img src={Gift} className="userProfile-icon" />
            { data.age_range }
          </div>
          <div id="userProfile-Data">
            <img src={Calendar} className="userProfile-icon" />
            { skills.replace(/,/g, ", ") }
          </div>
        </div>
      </div>
    );
  }

export default SingleUser;

// <input
//           name="city"
//           onChange={handleChange}
//           placeholder="price"
//           defaultValue={`${data.city}`} /> </div> <div>
//         <input
//           name="manufacturer"
//           onChange={handleChange}
//           placeholder="manufacturer"
//           defaultValue={singleItem.manufacturer} />city: { data.city }, &nbsp;