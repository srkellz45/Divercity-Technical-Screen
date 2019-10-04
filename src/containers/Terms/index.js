import React, { Component } from 'react';
import TempHeader from '../../components/TempHeader.js';

class Terms extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <div className="Temp">
        <TempHeader />
        <div className="PrivacyPolicy">
          DiverCity Terms Of Service
        </div>
      </div>
    );
  }
}

export default Terms;
