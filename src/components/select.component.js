import React from 'react';

const Select = ({ list, name, label, handler, defaultValue }) => {
  return (
    <div className="select-options">
      <span>{ label }</span>
      <select
        name={ name }
        onChange={ handler }
        defaultValue={ defaultValue }
      >
      {
        list.map((option, idx) => {
          return(
            <option
              value={ option.attributes.name }
              key={ option.id } >
              { option.attributes.name }
            </option>
          )
        })
      }
      </select>
    </div>
  )
}

export default Select;