import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadIndustries } from '../../../actions/industry.actions';
import Downshift from 'downshift';

class IndustrySearch extends Component {
  constructor(props){
  super(props);
  this.state = {
    query: '',
    industry: []
  };
  this.handleIndustrySearch = this.handleIndustrySearch.bind(this);
  this.selectIndustry = this.selectIndustry.bind(this);
}

  handleIndustrySearch(evt) {
    this.setState({
      query: evt.target.value
    }, () => {
      if (this.state.query && this.state.query.length >= 1) {
          this.props.loadIndustries(this.state.query);
      } else if (!this.state.query.length) {
        this.setState ({
          query: '',
        });
      }
    });
  }
  selectIndustry(industry) {
    this.setState({
      industry: industry.attributes.name
    }, this.props.setState(industry));
  }

  render() {
    return (
      <React.Fragment>
        <Downshift
          onChange={this.selectIndustry}
          itemToString={item => (item ? `${item.attributes.name}` : '')}
        >

        {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
          <div className="Search-Input">
            <input
                { ...getInputProps({
                placeholder: this.props.defaultValue ? ( this.props.defaultValue ) : ( "e.g. Accountant"),
                onChange: this.handleIndustrySearch
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
                        backgroundColor: highlightedIndex === index ? '#D9DBE0' : 'white',
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
    results : state.industryList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadIndustries: (query) => {
      dispatch(loadIndustries(query))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndustrySearch);