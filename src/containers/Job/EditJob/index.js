import React, { Component } from 'react';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import Dropzone from 'react-dropzone';
import { loadJobTypes, loadJobs, loadJobSkills, loadSingleJob } from '../../../actions/job.actions';
import { editJob } from '../../../actions/recruiter.actions';
import { getUser } from '../../../actions/user.actions';
import NewJobCompanySearch from '../NewJob/NewJobCompanySearch';
import RTEditor from '../RTEditor';
import USCitiesSearch from '../../USCitiesSearch';
//import Dropdown from '../../components/Dropdown.js';
import NewJobAPIDropdown from '../NewJob/NewJobAPIDropdown';
import NewJobDropdown from '../NewJob/NewJobDropdown';
import NewJobMultiDownshift from '../NewJob/NewJobMultiDropshift/NewJobMultiDownshift';
import { jobSkillsArray, requiredExperienceList } from '../../../lib/selectListData';

class EditJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: props.singleJob.id,
      requiredExperience: requiredExperienceList,
      title: '',
      description: '',
      location: '',
      job_employer_id: '',
      job_type_id: '',
      required_experience: '',
      skills_tag: [],
      showJobForm: false,
      items: jobSkillsArray,
      selectedItems: props.singleJob.attributes.skills_tag,
      files: [],
      logo: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.setJobType = this.setJobType.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);

    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.clearLogo = this.clearLogo.bind(this);
    this.setCity = this.setCity.bind(this);

    this.handleHTML = this.handleHTML.bind(this);
  }

  componentDidMount(){
    this.props.getUser(localStorage.id);
    this.props.loadJobTypes();
    this.props.loadJobs();
  }
  handleDropdownChange(title, id, emoji, idk, key) {
    let titleString = JSON.parse(JSON.stringify(title));
    this.setState({
      [key] : titleString
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    let jobData = { "job": { } };
      if(this.state.title) {
        Object.assign(jobData.job, {title: this.state.title});
      }
      if(this.state.description) {
        Object.assign(jobData.job, {description: this.state.description});
      }
      if(this.state.job_employer_id) {
        Object.assign(jobData.job, {job_employer_id: this.state.job_employer_id});
      }
      if(this.state.job_type_id) {
        Object.assign(jobData.job, {job_type_id: this.state.job_type_id});
      }
      if(this.state.location) {
        Object.assign(jobData.job, {location_display_name: this.state.location});
      }
      if(this.state.skills_tag.length) {
        Object.assign(jobData.job, {skills_tag: this.state.skills_tag});
      }
      if(this.state.required_experience) {
        Object.assign(jobData.job, {required_experience: this.state.required_experience});
      }
    this.props.editJob(jobData, this.state.jobID);
    this.props.close();
  }

  uploadFile(evt) {
    if (evt.target.files && evt.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          logo: e.target.result
        });
      };
    reader.readAsDataURL(evt.target.files[0]);
   }
  }
  onDrop(files) {
    this.setState({
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file),
        size: file.size,
      }))
    });
  }
  setJobType(title, id) {
    this.setState({
      job_type: id
    });
  }
  setCompany(data) {
    if(data === 'No Company') {
      this.setState({
        job_employer_id: null
      });
    }
    let companyID = data.id;
    this.setState({
      job_employer_id: companyID
    });
  }

  NewJobDisplay(evt) {
    evt.preventDefault();
    this.setState({showJobForm: !this.state.showJobForm});
  }
  handleInputChange(evt) {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleStateChange (changes, downshiftState) {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({
        items: this.getItems(changes.inputValue)
      });
    }
  }
  handleChange(selectedItem, downshiftState) {
    this.setState({
      items: jobSkillsArray
    });
  }
  getItems (value) {
    return value ? matchSorter(jobSkillsArray, value) : jobSkillsArray;
  }
  onItemAdd (selectedItem) {
    this.setState({
      selectedItems: [ ...this.state.selectedItems, selectedItem ],
      skills_tag: [ ...this.state.selectedItems, selectedItem ]
    });
  }
  onRemoveItem(item) {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1);
    this.setState({
      selectedItems: copy,
      skills_tag: copy
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
  onUserInput (selectedItem) {
    this.setState({
      selectedItems: [...this.state.selectedItems, selectedItem]
    });
  }
  clearLogo(evt) {
    evt.preventDefault();
    this.setState({
      logo: null,
      files: [],
    })
  }
  setCity(data) {
    this.setState({
      location: data.city + ', ' + data.state
    });
  }
  handleHTML(html) {
    this.setState({
      description: html
    });
  }
  render() {
    return (
      <div id="New-Job">
        <div id="New-Job-headline">
          Edit Job Posting
        </div>
        <div className="NewJob-container">
          <div id="new-job-select-title">
            Job Title
          </div>
          <div className="new-job-input">
            <input
              name="title"
              onChange={this.handleInputChange}
              placeholder={this.state.title}
              type="text"
              defaultValue={ this.props.singleJob.attributes.title }
            />
          </div>
          <div id="new-job-select-title">
            Employer
          </div>
          <div className="new-job-input">
            <NewJobCompanySearch
              setState={this.setCompany}
              defaultValue={ this.props.singleJob.attributes.employer.name }
            />
          </div>
          <div id="new-job-select-title">
            Location
          </div>
          <div className="new-job-input">
            <USCitiesSearch
              setState={this.setCity}
              defaultValue={ this.props.singleJob.attributes.location_display_name }
            />
          </div>
          <div id="new-job-select-title">
            Job Type
          </div>
          <div className="new-job-input">
            <NewJobAPIDropdown
              title={ this.props.singleJob.attributes.job_type_info.name }
              list={this.props.jobTypes}
              setState={this.setJobType}
            />
          </div>
          <div id="new-job-select-title">
            Required Experience
           </div>
           <div className="new-job-input">
             <NewJobDropdown
               title={ this.props.singleJob.attributes.required_experience }
               list={this.state.requiredExperience}
               setState={this.handleDropdownChange}
             />
          </div>
          <div id="new-job-select-title">
            Skills
          </div>
          <div id="new-job-skills">
            <NewJobMultiDownshift
              selectedItem={this.state.selectedItems}
              onChangedState={this.handleStateChange}
              onChange={this.onItemAdd}
              onItemChanged={this.onItemChanged}
              onRemoveItem={this.onRemoveItem}
              onUserInput={this.onUserInput}
              items={this.state.items}
              itemToString={this.itemToString}
              defaultValue=' '
            />
          </div>
          <div id="new-job-select-title">
            Job Description
          </div>
          <div className="new-job-bio-input">
            <RTEditor
              htmlToState={this.handleHTML}
              defaultValue={ this.props.singleJob.attributes.description }
            />
          </div>

          </div>
        <div className="EditJob-btn">
          <button
            className="PublishJob-btn"
            type="submit"
            onClick={this.handleSubmit}>
            <strong>Save</strong>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobTypes : state.jobTypeList,
    jobs : state.jobsList,
    user : state.userList,
    singleJob : state.singleJobList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editJob: (job, ID) => {
      dispatch(editJob(job, ID))
    },
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    loadJobTypes: () => {
      dispatch(loadJobTypes())
    },
    loadJobSkills: (query) => {
      dispatch(loadJobSkills(query))
    },
    loadJobs: () => {
      dispatch(loadJobs())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditJob);

