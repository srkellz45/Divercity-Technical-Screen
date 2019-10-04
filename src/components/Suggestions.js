import React from 'react';

const Suggestions = (data) => {
  const options = data.results.map(results => (
    <option key={results.id}>
      {results.attributes.name}
    </option>
  ))
  return (
    <div>
      <datalist id="suggestions">
        {options}
      </datalist>
    </div>
  );
}

export default Suggestions