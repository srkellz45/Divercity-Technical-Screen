import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchCity } from '../../../actions/onboard.actions';
import Downshift from 'downshift';


class CitySearch extends Component {
  constructor(props){
  super(props);
  this.state = {
    cityQuery: '',
    city: []
  };
  this.handleCitySearch = this.handleCitySearch.bind(this);
  this.selectCity = this.selectCity.bind(this);
}

  handleCitySearch(evt) {
    this.setState({
      cityQuery: evt.target.value
    }, () => {
      if (this.state.cityQuery && this.state.cityQuery.length > 3) {
          this.props.searchCity(this.state.cityQuery);
      } else if (!this.state.cityQuery.length) {
        this.setState ({
          cityQuery: '',
        });
      }
    });
  }
  selectCity(city) {
    console.log(city);
    this.setState({
      city: city
    }, this.props.setState(city));
  }

  render() {
    return (
      <React.Fragment>
        <Downshift
          onChange={this.selectCity}
          itemToString={item => (item ? `${item.attributes.name}, ${item.attributes.country_name}` : '')}
        >

        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="Search-Input">
            <input { ...getInputProps({
                placeholder: this.props.defaultValue ? ( this.props.defaultValue ) : ( "e.g. San Francisco, US" ),
                onChange: this.handleCitySearch,

              })}
            />

            { isOpen && !this.props.results.length ? (
            <div className="downshift-dropdown">
              <div className="dropdown-item"style={{
                backgroundColor: 'white',
              }}>
                Loading...
              </div>
            </div>
            ) : null }

            { isOpen && this.props.results.length ? (
              <div className="downshift-dropdown">
                {
                  this.props.results.map((item, index) => (

                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, item })}
                      style={{
                        backgroundColor: highlightedIndex === index ? '#d9dbe0' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      }}>
                      {item.attributes.name}, {item.attributes.country_name}
                    </div>
                  ))
                }
              </div>
              ) : null }
          </div>
        )}
        </Downshift>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    results : state.cityList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchCity: (item) => {
      dispatch(searchCity(item))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitySearch);