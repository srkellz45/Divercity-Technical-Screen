import React, { Component } from 'react';
import RateMdGrey from '../../../assets/RateMdGrey.png';
import RateMdGold from '../../../assets/RateMdGold.png';

class SubmitRateCompany extends Component {
  constructor(props){
    super(props);

    this.state = {
        value: "Add an optional anonymous diversity review to your rating"
    }

   this.starsArray = this.starsArray.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.submit = this.submit.bind(this);
  }

  handleChange(evt){
      this.setState({ value: evt.target.value });
  }

  submit(evt){
    evt.preventDefault();
    this.props.submitRating(this.state.value, this.props.data[0].id);
  }

  // Create array of rating stars to be displayed
  starsArray(){
    let stars = [];
    for(let i = 0; i < this.props.rating; i++){
        stars.push(RateMdGold);
      }
      // For Grey Stars
    for(let i = this.props.rating; i < 5; i++){
        stars.push(RateMdGrey);
    }

    return stars;
  }

  render() {
    let stars = this.starsArray();
    return (
      <div className="Rate-Company-Modal">
        <div className="cancel-btn">
          <button
            aria-label="Close Modal"
            className="close-btn"
            type="submit"
            onClick={this.props.onClose}
          >
            x
          </button>
        </div>
        <div className="Rate-company-grid">
            <div className="Company-logo">
                <img src={this.props.data[0].attributes.photo} className="Company-photo" alt={this.props.data[0].attributes.name} />
                <div className="Company-name">{this.props.data[0].attributes.name}</div>
            </div>
            <div className="Rating-stars">
                { 
                    stars.map((star) => {
                        return (
                            <img src={star} className="Company-rate" alt="Star" />
                        );
                    }) 
                }
            </div>
            
            <div className="Rate-text">
                <form>
                    <textarea className="Rate-text-box" placeholder={this.state.value}  onChange={this.handleChange} rows="7" cols="35"/>
                    <button className="Submit-btn" onClick={ this.submit } >Done</button>
                </form>
            </div>
        </div>  
      </div>
    );
  }
}

export default SubmitRateCompany;
