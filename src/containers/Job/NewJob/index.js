import React, { Component } from 'react';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import Dropzone from 'react-dropzone';
import { addJob, loadJobTypes, loadJobs, loadJobSkills } from '../../../actions/job.actions';
import { getUser } from '../../../actions/user.actions';
import ATS from '../ATS';
import NewJobModal from '../../NewJobModal';
import RTEditor from '../RTEditor';
import USCitiesSearch from '../../USCitiesSearch';
import NewJobCompanySearch from './NewJobCompanySearch';
import NewJobAPIDropdown from './NewJobAPIDropdown';
import NewJobDropdown from './NewJobDropdown';
import NewJobMultiDownshift from './NewJobMultiDropshift/NewJobMultiDownshift';
import { jobSkillsArray, requiredExperienceList } from '../../../lib/selectListData';

class NewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredExperience: requiredExperienceList,
      title: '',
      description: '',
      location: '',
      job_employer_id: '',
      job_type: '',
      required_experience: '',
      showJobForm: false,
      items: jobSkillsArray,
      selectedItems: [],
      files: [],
      logo: [],
      ATSopen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.setJobType = this.setJobType.bind(this);

    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);

    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.clearLogo = this.clearLogo.bind(this);
    this.setCity = this.setCity.bind(this);
    this.openATS = this.openATS.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleHTML = this.handleHTML.bind(this);
    this.closeNewJobModal = this.closeNewJobModal.bind(this);
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
    let job;
    if(this.state.title.length){
      job = {
        title: this.state.title,
        description: this.state.description,
        image: this.state.logo,
        job_employer_id: this.state.job_employer_id,
        job_type_id: this.state.job_type,
        location_display_name: this.state.location,
        skills_tag: this.state.selectedItems,
        required_experience: this.state.required_experience
      };
    }
    this.props.addJob(job, localStorage.id);
    this.props.closeNewJobModal();
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
      selectedItems: [ ...this.state.selectedItems, selectedItem ]
    });
  }
  onUserInput (selectedItem) {
    this.setState({
      selectedItems: [...this.state.selectedItems, selectedItem]
    });
  }
  onRemoveItem(item) {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1);
    this.setState({
      selectedItems: copy
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
  clearLogo(evt) {
    evt.preventDefault();
    this.setState({
      logo: null,
      files: [],
    })
  }
  setCity(data) {
    console.log(data);
    this.setState({
      location: data.city + ', ' + data.state
    });
  }

  handleHTML(html) {
    console.log(html);
    this.setState({
      description: html
    });
  }
  openATS(evt) {
  evt.preventDefault();
    this.setState({
      ATSopen: true
    });
  }
  closeModal(evt) {
    this.setState({
      ATSopen: false
    });
  }
  closeNewJobModal (evt) {
    this.props.closeNewJobModal();
  }
  render() {
    return (
      <div id="New-Job">
        <div id="New-Job-headline">
          Create a Job Posting
        </div>
        <div id="New-Job-subline">
            Save time by syncing your Application Tracking System so <br />
            your company's open roles can be ingested instantly.
        </div>
        <button
            className="New-Job-close-btn"
            type="button"
            onClick={ this.closeNewJobModal } >
            X
        </button>
        <center>
          <button className="PublishJob-btn" onClick={ this.openATS } >
            Sync Your ATS
          </button>
        </center>
        <div className="NewJob-container">
          <div id="new-job-select-title">
            Job Title
          </div>
          <div className="new-job-input">
            <input
              name="title"
              onChange={this.handleInputChange}
              placeholder="Job Title"
              type="text"
              value={this.state.title}
            />
          </div>
          <div id="new-job-select-title">
            Employer
          </div>
          <div className="new-job-input">
            <NewJobCompanySearch
              setState={this.setCompany}
              defaultValue="e.g. Divercity"
            />
          </div>
          <div id="new-job-select-title">
            location
          </div>
          <div className="new-job-input">
            <USCitiesSearch
              setState={this.setCity}
              defaultValue="e.g. San Francisco"
            />
          </div>
          <div id="new-job-select-title">
              Job Type
          </div>
          <div className="new-job-input">
            <NewJobAPIDropdown
              title="Full Time/ Part Time/ Internship..."
              list={this.props.jobTypes}
              setState={this.setJobType}
            />
          </div>
          <div id="new-job-select-title">
              required experience
           </div>
           <div className="new-job-input">
             <NewJobDropdown
               title="0-2 Years/ 3-5 Years/ 6-10Years/ ..."
               list={this.state.requiredExperience}
               setState={this.handleDropdownChange}
             />
          </div>
          <div id="new-job-select-title">
            job Skills
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
            defaultValue="Job Skills"
          />
          </div>
          <div id="new-job-select-title">
            job description
          </div>
          <div className="new-job-bio-input">

            <RTEditor
              htmlToState={this.handleHTML}
            />

          </div>
          </div>
        <button
          className="New-Job-Save-btn"
          type="submit"
          onClick={this.handleSubmit}>
          <strong>Submit Job</strong>
        </button>

        <NewJobModal // ATS Modal
          show={this.state.ATSopen}
          //onClose={this.closeNewJobModal}
          className="Modal-Backdrop"
        >
          <ATS
            closeModal={this.closeModal}
          />

        </NewJobModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobTypes : state.jobTypeList,
    jobs : state.jobsList,
    user : state.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addJob: (job, ID) => {
      dispatch(addJob(job, ID))
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
)(NewJob);



