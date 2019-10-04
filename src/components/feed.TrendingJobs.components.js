import React from 'react';

const TrendingJobs = ({ title, employer, location, id, handler }) => {
    return (
      <div className="Trending-grid" key={id}>
        <button className="Trending-title" id={ id }onClick={ handler }>
          { title }
        </button>
          <div id="Trending-company">
            <a href={`/company/${employer.id}`}>
              { employer.name }
                <br />
              <div id="Trending-location">
                { location }
              </div>
            </a>
          </div>
      </div>
    );
}

export default TrendingJobs;
