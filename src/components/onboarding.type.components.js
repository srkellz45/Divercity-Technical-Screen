import React from 'react';
const OnboardingComponent = ({ title, picture, value, handler }) => {
  return (
      <div id="OnboardingType-body">
        <div id="OnboardingType-Image" onClick={ handler }>
            <img src={ picture }  id={value} alt="group"/>
            <div className="OnboardingType-title" id={value}>
                { title }
            </div>
        </div>
      </div>
  );
}

export default OnboardingComponent;
