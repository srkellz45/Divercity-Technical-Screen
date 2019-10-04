import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class CommunityDropdown extends Component{
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

  selectItem(title, id, image){
    this.setState({
      headerTitle: 'Change Community',
      listOpen: false
    }, this.props.setState(title, id, image));
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
      <div className="dd-wrapper">
        <div className="dd-header" onClick={this.toggleList}>
          <div className="community-dd-header-title">
            {headerTitle}
          </div>
        </div>
        { listOpen && <ul className="dd-list">
          { list.map((item) => (
            <li
              className="dd-list-item"
              key={item.id}
              onClick={() => this.selectItem(item.attributes.title, item.id, item.attributes.picture_main)}
            >
              { item.attributes.title }
            </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default onClickOutside(CommunityDropdown);