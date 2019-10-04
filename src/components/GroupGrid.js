import React from 'react';

const GroupGrid = ({ body, picture_main, id }) => {
  return (
      <div id="OnboardingType-body">
        <div id="OnboardingType-Image">
          <label>
            <img src={ picture_main } id={ id } alt="group"/>
            <div id="OnboardingType-Title">
                { body }
            </div>
          </label>
        </div>
      </div>
  );
}

export default GroupGrid;
