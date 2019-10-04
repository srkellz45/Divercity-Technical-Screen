import React, { Component } from 'react';
import { connect } from 'react-redux';
import  glamorous  from 'glamorous';
import matchSorter from 'match-sorter';
import {
    getUser,
    addSkills,
  } from '../../actions/user.actions';
import MultiDownshift from '../Job/DownshiftJobSkills/MultiDownshift.js';
import { jobSkillsArray } from '../../lib/selectListData';
import { loadJobSkills } from '../../actions/job.actions';
import x from '../../assets/X.png';
const XButton = glamorous.span({
  cursor: 'pointer'
});
class AddSkills extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      educationAddOpen: false,
      skills: props.user.attributes.skills,
      items: jobSkillsArray,
      selectedItems: [],
    };
    this.handleAddSkills = this.handleAddSkills.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.getItems = this.getItems.bind(this);
    this.onRemoveSkill = this.onRemoveSkill.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getUser(localStorage.id);
    //this.props.loadJobSkills();
  }
  closeModal (evt) {
    this.props.closeSkills();
  }
  handleStateChange (changes, downshiftState) {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({
        items: this.getItems(changes.inputValue)
      });
    }
  }
  getItems (value) {
    return value ? matchSorter(jobSkillsArray, value) : jobSkillsArray;
  }
  onItemAdd (selectedItem) {
    this.setState({
      selectedItems: [ ...this.state.selectedItems, selectedItem ],
    });
  }
  onRemoveItem(item) {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1);
    this.setState({
      selectedItems: copy,
    });
  }
  onItemChanged (item) {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1, item.value);
    this.setState({
      selectedItems: copy
    });
  }
  itemToString(i) {
    return i ? i.name : '';
  }
  onRemoveSkill(item) {
    var skills = this.state.skills; // Test
    var removedSkill = item.target.id;

    for (var i = skills.length -1; i >= 0; i--) {
        if (skills[i] === removedSkill) {
            skills.splice(i, 1);
        }
    }
    this.setState({
      skills: skills,
    });
  }
  handleAddSkills (evt) {
    evt.preventDefault();
    let skillsToSend = [...this.state.selectedItems, ...this.state.skills];
    this.props.addSkills(skillsToSend, localStorage.id);
    this.props.closeSkills();
  }


  render() {
        console.log(this.state.skills);
    return (
      <React.Fragment>
        { this.props.user.length <= 0 ? (
          <div id="loading">
            <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
          </div>
        ) : (
        <div>
          <div className="AddSkills-Title">
            Your skills
          </div>
            <button
                className="AddSkills-close-btn"
                type="button"
                onClick={ this.closeModal } >
                X
            </button>
          <div id="AddSkills-Skills-item">
            { this.state.skills.map(skill => {
              return (
                <XButton onClick={this.onRemoveSkill}>
                  <div id="AddSkills-Skills-btn">
                  { skill }
                  <img src={ x } id={skill} alt="remove" style={{height:"13px", width:"13px", marginBottom:"-2px", marginLeft: "5px"}} />
                  </div>
                </XButton>
              )}
            )}
          </div>
          <div className="AddSkills-Title">
            Add Skills (Separate by comma or press TAB) <br />
          </div>
          <div className="AddSkills-input">
            <MultiDownshift
              selectedItem={this.state.selectedItems}
              onChangedState={this.handleStateChange}
              onChange={this.onItemAdd}
              onItemChanged={this.onItemChanged}
              onRemoveItem={this.onRemoveItem}
              items={this.state.items}
              itemToString={this.itemToString}
              defaultValue="Job Skills"
            />
          </div>

            <div className="AddSkills-buttons">
              <button
                className="removeEducation-btn"
                type="button"
                onClick={this.closeModal} >
                Cancel
              </button>
              <button
                className="addEducation-btn"
                type="button"
                onClick={this.handleAddSkills} >
                Save
              </button>

            </div>
        </div>)}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    addSkills: (data, id) => {
      dispatch(addSkills(data, id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSkills);