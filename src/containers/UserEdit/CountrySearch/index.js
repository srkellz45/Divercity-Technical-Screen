import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchCountry } from '../../../actions/onboard.actions';
import Downshift from 'downshift';


class CountrySearch extends Component {
  constructor(props){
  super(props);
  this.state = {
    countryQuery: '',
    country: []
  };
  this.handleCountrySearch = this.handleCountrySearch.bind(this);
  this.selectCountry = this.selectCountry.bind(this);
}

  handleCountrySearch(evt) {
    this.setState({
      countryQuery: evt.target.value
    }, () => {
      if (this.state.countryQuery && this.state.countryQuery.length > 3) {
          this.props.searchCountry(this.state.countryQuery);
      } else if (!this.state.countryQuery.length) {
        this.setState ({
          countryQuery: '',
        });
      }
    });
  }
  selectCountry(country) {
    this.setState({
      country: country
    }, this.props.setState(country));
  }

  render() {
    return (
      <React.Fragment>
        <Downshift
          onChange={this.selectCountry}
          itemToString={item => (item ? `${item.attributes.name}` : '')}
        >

        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="Search-Input">
            <input { ...getInputProps({
                placeholder: this.props.defaultValue ? ( this.props.defaultValue ) : ( "e.g. United States" ),
                onChange: this.handleCountrySearch,

              })}
            />

            { isOpen && !this.props.results.length ? (
            <div className="edit-downshift-dropdown">
              <div className="dropdown-item"style={{
                backgroundColor: 'white',
              }}>
                Loading...
              </div>
            </div>
            ) : null }

            { isOpen && this.props.results.length ? (
              <div className="edit-downshift-dropdown">
                {
                  this.props.results.map((item, index) => (

                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, item })}
                      style={{
                        backgroundColor: highlightedIndex === index ? '#d9dbe0' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      }}>
                      {item.attributes.name}
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
    results : state.countryList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchCountry: (item) => {
      dispatch(searchCountry(item))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySearch);