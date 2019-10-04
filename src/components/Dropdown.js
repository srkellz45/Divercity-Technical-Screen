import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class Dropdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      genderEmoji: null,
      emoji: null,
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

  selectItem(title, genderEmoji, emoji, id, stateKey){
    this.setState({
      headerTitle: title,
      genderEmoji: genderEmoji,
      emoji: emoji,
      listOpen: false
    }, this.props.setState(title, genderEmoji, emoji, id, stateKey));
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render(){
    const{ list } = this.props;
    const{ listOpen, headerTitle, genderEmoji, emoji } = this.state;
    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={this.toggleList}>
        { emoji || genderEmoji ? (
          <div className="dd-header-title">
            <img src={genderEmoji}/>{emoji}&nbsp;&nbsp;&nbsp;&nbsp;{headerTitle}
          </div>) : (
          <div className="dd-header-title">
            &nbsp;{headerTitle}
          </div>
          )}

        </div>
        { listOpen && <ul className="dd-list">
          { list.map((item) => (
            <li
              className="dd-list-item"
              key={item.id}
              onClick={() => this.selectItem(item.title, item.genderEmoji, item.emoji, item.id, item.key)}
            >
            { item.emoji || item.genderEmoji ? (
              <div className="dd-item">
                <img src={item.genderEmoji}/>{item.emoji}&nbsp;&nbsp;&nbsp;&nbsp;{item.title}
              </div>
              ) : (
            <div className="dd-header-title">
              &nbsp;{item.title}
            </div>
            )}

            </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default onClickOutside(Dropdown);