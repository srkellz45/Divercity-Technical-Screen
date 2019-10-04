import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMajor } from '../../../actions/onboard.actions';
import Downshift from 'downshift';


class MajorSearch extends Component {
  constructor(props){
  super(props);
  this.state = {
    query: '',
    major: []
  };
  this.handleMajorSearch = this.handleMajorSearch.bind(this);
  this.selectMajor = this.selectMajor.bind(this);
}

  handleMajorSearch(evt) {
    console.log(evt);
    this.setState({
      query: evt.target.value
    }, () => {
      if (this.state.query && this.state.query.length >= 1) {
          this.props.searchMajor(this.state.query);
      } else if (!this.state.query.length) {
        this.setState ({
          query: '',
        });
      }
    });
  }
  selectMajor(major) {
    console.log(major);
    this.setState({
      major: major.attributes.name
    }, this.props.setState(major));
  }

  render() {
    return (
      <React.Fragment>
        <Downshift
          onChange={this.selectMajor}
          itemToString={item => (item ? `${item.attributes.name}` : '')}
        >

        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="Search-Input">
            <input
                { ...getInputProps({
                placeholder: "e.g. Biology",
                onChange: this.handleMajorSearch
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
    results : state.majorList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchMajor: (query) => {
      dispatch(searchMajor(query))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MajorSearch);