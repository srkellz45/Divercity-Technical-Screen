import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class EducationDropdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
    this.selectItem = this.selectItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  handleClickOutside(e){
    this.setState({
      listOpen: false
    });
  }

  selectItem(title){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.setState(title));
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render(){
    const{ list } = this.props;
    const{ listOpen, headerTitle } = this.state;
    return (
      <div className="dd-education-wrapper">
        <div className="dd-education-header" onClick={this.toggleList}>
          <div className="dd-education-header-title">
            {headerTitle}
          </div>
        </div>
        { listOpen && <ul className="dd-education-list">
          { list.map((item) => (
            <li
              className="dd-education-list-item"
              key={item.id}
              onClick={() => this.selectItem(item.title)}
            >
              { item.title }
            </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default onClickOutside(EducationDropdown);