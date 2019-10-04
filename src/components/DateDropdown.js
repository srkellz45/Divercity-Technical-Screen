import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class DateDropdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      monthdayListOpen: false,
      dayListOpen: false,
      yearListOpen: false,
      dayTitle: 'Day',
      monthTitle: 'Month',
      yearTitle: 'Year'
    };
    this.selectDay = this.selectDay.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleDayList = this.toggleDayList.bind(this);
    this.toggleMonthList = this.toggleMonthList.bind(this);
    this.toggleYearList = this.toggleYearList.bind(this);
  }

  handleClickOutside(e){
    this.setState({
      monthListOpen: false,
      dayListOpen: false,
      yearListOpen: false,
    });
  }

  selectDay(title, id, stateKey){
    this.setState({
      dayTitle: title,
      monthListOpen: false,
      dayListOpen: false,
      yearListOpen: false,
    }, this.props.setDayState(title, id, stateKey));
  }
  selectMonth(title, id, stateKey){
    this.setState({
      monthTitle: title,
      monthListOpen: false,
      dayListOpen: false,
      yearListOpen: false,
    }, this.props.setMonthState(title, id, stateKey));
  }
  selectYear(title, id, stateKey){
    this.setState({
      yearTitle: title,
      monthListOpen: false,
      dayListOpen: false,
      yearListOpen: false,
    }, this.props.setYearState(title, id, stateKey));
  }

  toggleDayList() {
    this.setState(prevState => ({
      dayListOpen: !prevState.dayListOpen,
      monthListOpen: false,
      yearListOpen: false,
    }));
  }
  toggleMonthList() {
    this.setState(prevState => ({
      monthListOpen: !prevState.monthListOpen,
      dayListOpen: false,
      yearListOpen: false,
    }));
  }
  toggleYearList() {
    this.setState(prevState => ({
      yearListOpen: !prevState.yearListOpen,
      monthListOpen: false,
      dayListOpen: false,
    }));
  }

  render(){
    const{ monthList, dayList, yearList } = this.props;
    const{ dayListOpen,
           dayTitle,
           monthListOpen,
           monthTitle,
           yearListOpen,
           yearTitle,
          } = this.state;
    return (
      <div className="Date-DD">
        <div className="date-dd-wrapper">
          <div className="dd-header" onClick={this.toggleMonthList}>
            <div className="dd-header-title">
              {monthTitle}
            </div>
          </div>
          { monthListOpen && <ul className="date-dd-list">
            { monthList.map((item) => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.selectMonth(item.title, item.id, item.key)}
              >
                { item.title }
              </li>
            ))}
          </ul>}
        </div>
        <div className="date-dd-wrapper">
          <div className="dd-header" onClick={this.toggleDayList}>
            <div className="dd-header-title">
              {dayTitle}
            </div>
          </div>
          { dayListOpen && <ul className="date-dd-list">
            { dayList.map((item) => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.selectDay(item.title, item.id, item.key)}
              >
                { item.title }
              </li>
            ))}
          </ul>}
        </div>
        <div className="date-dd-wrapper">
          <div className="dd-header" onClick={this.toggleYearList}>
            <div className="dd-header-title">
              {yearTitle}
            </div>
          </div>
          { yearListOpen && <ul className="date-dd-list">
            { yearList.map((item) => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.selectYear(item.title, item.id, item.key)}
              >
                { item.title }
              </li>
            ))}
          </ul>}
        </div>
      </div>
    )
  }
}

export default onClickOutside(DateDropdown);