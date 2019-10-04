import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadOccupations } from '../../../actions/onboard.actions';
import Downshift from 'downshift';


class OccupationSearch extends Component {
  constructor(props){
  super(props);
  this.state = {
    query: '',
    occupation: []
  };
  this.handleOccupationSearch = this.handleOccupationSearch.bind(this);
  this.selectOccupation = this.selectOccupation.bind(this);
}

  handleOccupationSearch(evt) {
    console.log(evt.target.value);
    this.setState({
      query: evt.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
          this.props.loadOccupations(this.state.query);
      } else if (!this.state.query.length) {
        this.setState ({
          query: '',
        });
      }
    });
  }
  selectOccupation(occupation) {
    this.setState({
      occupation: occupation.attributes.name
    }, this.props.setState(occupation));
  }

  render() {
    return (
      <React.Fragment>
        <Downshift
          onChange={this.selectOccupation}
          itemToString={item => (item ? `${item.attributes.name}` : '')}
        >

        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="Search-Input">
            <input
                { ...getInputProps({
                placeholder: this.props.defaultValue ? ( this.props.defaultValue ) : ( "e.g. Accountant" ),
                onChange: this.handleOccupationSearch
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
    results : state.occupationsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOccupations: (query) => {
      dispatch(loadOccupations(query))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccupationSearch);