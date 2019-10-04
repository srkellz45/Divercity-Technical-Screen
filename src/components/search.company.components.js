import React from 'react';

const CompanyResults = ({ data }) => {
  const CompanyResults = data.map((company) => {
      return (
        <div className="Connections-body" key={company.id}>
          <div id="connections-profile-photo">
            <a href={`/company/${company.id}`}>
              <img src={company.attributes.photo} alt="Company" />
            </a>
          </div>
          <div id="connections-item">
            <div id="connections-Name">
            <a href={`/company/${company.id}`}>
             { company.attributes.name }
            </a>
            </div>
            <div id="connections-Data">
            { company.attributes.headquarters }
            </div>
            <div id="connections-Data">
            { company.attributes.description }
            </div>
          </div>
        </div>
      );
    });

  return (
    <div>
    { CompanyResults }
    </div>
  )
}
export default CompanyResults;
