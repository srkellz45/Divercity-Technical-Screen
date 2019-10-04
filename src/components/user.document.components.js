import React from 'react';
import Moment from 'moment';
const Documents = ({ data, onDelete, onAddResume, id }) => {
      return (
        <div className="Documents-Body">
          <div className="document-name">
            <a href={`${data.document}`} target="_blank" rel="noopener noreferrer" alt="resume">
              { data.name }
            </a>
          </div>
          <div className="document-created">
            added { Moment(data.created_at).fromNow() }
          </div>
          <div className="document-buttons">
            <a href={`${data.document}`} target="_blank" rel="noopener noreferrer" alt="resume">
              <button
                className="viewDocument-btn"
               >
                View
              </button>
            </a>
            <button
              id={ id }
              onClick={ onDelete }
              className="deleteDocument-btn"
             >
              Remove
            </button>
          </div>
        </div>
      )
}


export default Documents;