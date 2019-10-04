import React from 'react';
const RecommendedJobs = ({ image, title, employer, location, id, handler, applied, close, removed }) => {
  let hacksaw = (title.substring(0, 20) + '...');
    return (
      <div className="Recommended-grid" key={id}>
        <button id={id} name="Job" className="Recommended-X-button" onClick={close}> X </button>
        <div className="Recommended-image">
          <img src={ image } alt="Company-Image" />
        </div>
        <button className="Recommended-title" id={ id }onClick={ handler }>
          { title.length < 10 ? // basically if the job title is too long, cut it off based on string length
          ( <div> { title } </div> ) :  hacksaw }
        </button>
        <div id="Recommended-item">
          <div id="Recommended-company">
            <a href={`/company/${employer.id}`}>
              { employer.name }
                <br />
              { location }
            </a>
          </div>
        </div>
          <button
            id={ id }
            onClick={ handler }
            className="recommended-btn"
          >
            View
          </button>
      </div>
    );
}

export default RecommendedJobs;
