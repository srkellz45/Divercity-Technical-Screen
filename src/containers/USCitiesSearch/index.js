import React, { Component } from "react";
import Downshift from "downshift";
import ReactDOM from "react-dom";
import { cityList } from '../../lib/cities';

class USCitiesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cityList,
      city: "",
      state: "",
      cityQuery: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleCitySearch = this.handleCitySearch.bind(this);
  }

  onChange(data) {
    this.setState({
      city: data.city,
      state: data.state
    });
    this.props.setState(data);
  }
  handleCitySearch(evt) {
  this.setState({
      cityQuery: evt.target.value
    });
  }
  render() {
    return (
      <Downshift
        onChange={this.onChange}
        itemToString={items => (items ? items.city + "," + " " + items.state : "")}
      >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getLabelProps
      }) => (
        <div className="Search-Input">
            <input { ...getInputProps({
                placeholder: this.state.cityQuery ? ( this.state.cityQuery ) : ( this.props.defaultValue ),
                onChange: this.handleCitySearch,

              })}
            />
          { isOpen ? (
            <div className="downshift-dropdown">
              { this.state.cities.filter(
                  item =>
                    !inputValue ||
                    item.city.toLowerCase().includes(inputValue.toLowerCase())
                ).slice(0, 50).map((item, index) => (
                  <div
                    className="dropdown-item"
                    {...getItemProps({ key: index, item })}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : "white",
                      fontWeight: selectedItem === item ? "bold" : "normal"
                    }}
                  >
                    {item.city}, {item.state}
                  </div>
                ))}
            </div>
          ) : null }
        </div>
      )}
    </Downshift>
    );
  }
}

export default USCitiesSearch;
