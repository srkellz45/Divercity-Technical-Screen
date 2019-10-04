import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class CompanySizeDropdown extends Component{
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

  selectItem(title, id){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.setState(title, id));
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
      <div className="dd-size-wrapper">
        <div className="dd-size-header" onClick={this.toggleList}>
          <div className="dd-size-header-title">
            {headerTitle}
          </div>
        </div>
        { listOpen && <ul className="dd-size-list">
          { list.map((item) => (
            <li
              className="dd-size-list-item"
              key={item.id}
              onClick={() => this.selectItem(item.attributes.name, item.id)}
            >
              { item.attributes.name }
            </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default onClickOutside(CompanySizeDropdown);