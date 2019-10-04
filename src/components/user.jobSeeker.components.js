import React from 'react';
import { NavLink } from 'react-router-dom';

import Calendar from '../assets/icons/Calendar.png';
import Briefcase from '../assets/icons/Briefcase.png';
import Location from '../assets/icons/Location.png';
import Users from '../assets/icons/Users.png';
import Globe from '../assets/icons/Globe.png';
import Gift from '../assets/icons/Gift.png';


const JobSeekerProfile = ({ data, experiences, education, id, groups, connect, acceptConnect, disconnect, connections, profile, profileSelected, connectionsSelected, joinGroup, requestAccess }) => {

  let addDefaultSrc = (evt) => {
    evt.target.src = 'https://s3-us-west-2.amazonaws.com/pinc-backend/images/cdn/avatars/Profile2.png';
  };

  let skills = data.skills.map(skill => { return <div id="userProfile-Skills-btn"> { skill } </div> })
  let experienceMap = experiences.map(experience => { return (
    <div className="userProfile-Experience-object">
      <div id="userProfile-Experience-image" key={experience.id}>
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
  let educationMap = education.map(education => { return (
    <div className="userProfile-Experience-object">
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
  ) })
  let groupData = groups.map(group => {
    return (
      <div className="userProfile-Groups-grid" key={group.id}>
        <div className="userProfile-Groups-image">
         <NavLink to={`/groups/${group.id}/`}>
          <img src={ group.attributes.picture_main } alt="Company-Image" />
         </NavLink>
        </div>
        <NavLink to={`/groups/${group.id}/`}>
          <div className="userProfile-Groups-title">
            { group.attributes.title }
          </div>
        </NavLink>
        <div id="userProfile-Groups-members">
          { group.attributes.followers_count } Members
        </div>
        { group.attributes.is_followed_by_current ? (
          <button
            id={ group.id }
            className="userProfile-FollowingGroups-btn"
          >
            Member
          </button>
        ) : (
        <React.Fragment>
        { group.attributes.group_type === "private" ? (
          <button
            id={ group.id }
            onClick={ requestAccess }
            className="userProfile-Groups-btn"
          >
            Request Access
          </button>
        ) : (
          <button
            id={ group.id }
            onClick={ joinGroup }
            className="userProfile-Groups-btn"
          >
            Join
          </button>
        )}
        </React.Fragment>
        )}
      </div>
    ); } );

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
          { profileSelected ? (
          <div className="userProfile-Experience-body">
            { experienceMap.length ? (
            <React.Fragment>
            <div id="userProfile-Experience">
              Experience
            </div>
            <div id="userProfile-Experience-item">
              { experienceMap }
            </div>
            </React.Fragment>
            ) : null }

            { educationMap.length ? (
            <React.Fragment>
            <div id="userProfile-Experience">
              Education
            </div>
            <div id="userProfile-Experience-item">
              { educationMap }
            </div>
            </React.Fragment>
            ) : null }

            { skills.length ? (
            <React.Fragment>
            <div id="userProfile-Experience">
              Skills
            </div>
            <div id="userProfile-Skills-item">
              { skills }
            </div>
            </React.Fragment>
            ) : null }
            <div id="userProfile-Experience">
              Groups
            </div>
            <div id="userProfile-Groups-item">
              { groupData }
            </div>
          </div>
            ) : ( null )
          }

        </div>

        <div className="userProfile-box">
          <div id="userProfile-photo">
            <img src={ data.avatar_medium } onError={ addDefaultSrc } alt="profile" />
          </div>
          <div id="userProfile-Name">
            { data.name }
          </div>
          { data.account_type === 'job_seeker' ? (
            <div id="userProfile-Type">
              Job Seeker
            </div> ) : (null)
          }
          { data.account_type === 'professional' ? (
            <div id="userProfile-Type">
              Professional
            </div> ) : (null)
          }
          { data.account_type === 'recruiter' ? (
            <div id="userProfile-Type">
              Recruiter
            </div> ) : (null)
          }
          { data.account_type === 'hiring_manager' ? (
            <div id="userProfile-Type">
              Hiring Manager
            </div> ) : (null)
          }
          { data.account_type === 'student' ? (
            <div id="userProfile-Type">
              Student
            </div> ) : (null)
          }
          { data.account_type === 'entrepreneur' ? (
            <div id="userProfile-Type">
              Entrepreneur
            </div> ) : (null)
          }
          <div id="userProfile-Info">
            { data.bio }
          </div>


          { id !== localStorage.id ? ( // if this is you, don't show buttons
          <div className="userProfile-buttons">
            <React.Fragment>
              { data.connected === "connected" ? (
                <button id={ id } onClick={ disconnect } className="userProfile-btn-connected">
                  <span>Connected</span>
                </button>
              ) : ( null ) }
              { data.connected === "requested" ? (
                <button id={ id } onClick={ disconnect } className="userProfile-btn-requested">
                  <span>Request Pending</span>
                </button>
              ) : ( null ) }
              { data.connected === "not_connected" ? (
                <button id={ id } onClick={ connect } className="userProfile-btn">
                  connect
                </button>
              ) : ( null ) }
              { data.connected === "pending_approval" ? (
                <button id={ id } onClick={ acceptConnect } className="userProfile-btn">
                  Connect
                </button>
              ) : ( null ) }
              <button className="userProfile-btn">
                <NavLink to={`/users/${localStorage.id}/chats/${id}`} >
                  direct message
                </NavLink>
              </button>
            </React.Fragment>
          </div>
          ) : null }

          { data.occupation ? (
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
          ) : null }

          { data.city ? (
          <div id="userProfile-Data">
            <img src={Location} className="userProfile-icon" alt="Location" />
            { data.city }
          </div>
          ) : null }

          { data.gender ? (
          <div id="userProfile-Data">
            <img src={Users} className="userProfile-icon" alt="User" />
            { data.gender }
          </div>
          ) : null }

          { data.ethnicity ? (
          <div id="userProfile-Data">
            <img src={Globe} className="userProfile-icon" alt="Ethnicity" />
            { data.ethnicity }
          </div>
          ) : null }

          { data.age_range ? (
          <div id="userProfile-Data">
            <img src={Gift} className="userProfile-icon" alt="age range" />
            { data.age_range }
          </div>
          ) : null }

        </div>

      </div>
    );
  }

export default JobSeekerProfile;



   // <div id="userProfile-Data">
     //       <img src={Calendar} className="userProfile-icon" alt="Calendar" />
       //     View Resume
         // </div>



// <div id="userProfile-Experience-image">
//                 <img src={ data.avatar_medium } alt="experience" />
//               </div>
//               <div id="userProfile-Experience-headline">
//                 Software Developer
//               </div>
//               <div id="userProfile-Experience-subline">
//                 Divercity
//               </div>
//               <div id="userProfile-Experience-subline">
//                 Oct 2017 - Present
//               </div>




