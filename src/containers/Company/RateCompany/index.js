import React, { Component } from 'react';
import RateMdGrey from '../../../assets/RateMdGrey.png';
import RateMdGold from '../../../assets/RateMdGold.png';

class RateCompany extends Component {
  constructor(props){
    super(props);

    this.state = {
      rate: 0
    }

  }

  render() {
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
            <div className="Rate-instructions">
                <p>How Diverse-minded and Inclusive is {this.props.data[0].attributes.name} in your humble opinion?</p> 
                <p className="Rate-anonymous">All ratings will be anonymous</p>
            </div>
            <div className="Company-logo">
                <img src={this.props.data[0].attributes.photo} className="Company-photo" alt={this.props.data[0].attributes.name} />
                <div className="Company-name">{this.props.data[0].attributes.name}</div> 
            </div>
            <div className="Rating-stars">
                <img src={RateMdGrey} className="Rate-company-star" id="1" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="2" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="3" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="4" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="5" alt="Star" role="button" onClick={this.props.onRate}/>
                {/* <img src={RateMdGrey} className="Rate-company-star" id="6" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="7" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="8" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="9" alt="Star" role="button" onClick={this.props.onRate}/>
                <img src={RateMdGrey} className="Rate-company-star" id="10" alt="Star" role="button" onClick={this.props.onRate}/> */}
            </div>
            
            <div className="Rate-anonymous">
                <p>This anonymous rating will help us suggest companies that care about diversity and inclusion to other candidates.</p>
            </div>

        </div>
        
      </div>
    );
  }
}

export default RateCompany;
