import React from 'react';
import checkmark from '../assets/Checkmark.png';
const GroupOnboarding = ({ title, picture, id, select, deselect, state }) => {

  if(state.includes(parseInt(id))){
    return (
      <div id="OnboardingGroup-body">
        <div id="OnboardingGroup-Image" onClick={ deselect }>
          <img src={ picture }  id={id} alt="group"/>
          <div className="OnboardingGroup-title" id={id}>
              <img src={ checkmark } className="Selected-Group-Check" alt="checkmark" />
              <div style={{textAlign: "center"}}> { title } </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="OnboardingGroup-body">
        <div id="OnboardingGroup-Image" onClick={ select }>
          <img src={ picture }  id={id} alt="group"/>
            <div className="OnboardingGroup-title" id={id}>
              <div style={{textAlign: "center"}}> { title } </div>
            </div>
        </div>
      </div>
    );
  }
}

export default GroupOnboarding;
