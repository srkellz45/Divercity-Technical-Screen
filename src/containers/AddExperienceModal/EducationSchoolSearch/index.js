import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSchools } from '../../../actions/onboard.actions';
import Downshift from 'downshift';


class EducationSchoolSearch extends Component {
  constructor(props){
  super(props);
  this.state = {
    query: '',
    school: []
  };
  this.handleSchoolSearch = this.handleSchoolSearch.bind(this);
  this.selectSchool = this.selectSchool.bind(this);
}

  handleSchoolSearch(evt) {
    this.setState({
      query: evt.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 2) {
          this.props.loadSchools(this.state.query);
      } else if (!this.state.query.length) {
        this.setState ({
          query: '',
        });
      }
    });
  }
  selectSchool(school) {
    this.setState({
      school: school.id
    }, this.props.setState(school));
  }

  render() {
    return (
      <React.Fragment>
        <Downshift
          onChange={this.selectSchool}
          itemToString={item => (item ? `${item.attributes.name}` : '')}
        >
        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="AddExperience-CitySearch">
            <input
              { ...getInputProps({
                placeholder: this.props.defaultValue ? ( this.props.defaultValue ) : ( "e.g. University of San Franscisco" ),
                onChange: this.handleSchoolSearch
              })}
            />

            { isOpen && !this.props.schools.length ? (
            <div className="AddExperience-downshift-dropdown">
              <div className="dropdown-item"style={{
                backgroundColor: 'white',
              }}>
                Loading...
              </div>
            </div>
            ) : null }

            { isOpen && this.props.schools.length ? (
              <div className="AddExperience-downshift-dropdown">
                {
                  this.props.schools.map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, item })}
                      style={{
                        backgroundColor: highlightedIndex === index ? '#75c2f6' : 'white',
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
    schools : state.schoolsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSchools: (query) => {
      dispatch(loadSchools(query))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationSchoolSearch);