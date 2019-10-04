import React, { Component } from 'react';

import apple from '../assets/app-store-badge.png';
import logo from '../assets/dLogo.png';
import phones from '../assets/iPhones2.png';
import check from '../assets/check.png';
import TempHeader from './TempHeader.js';

class NewTemp extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return (
          <div className="Temp">
            <TempHeader />
            <div className="Temp-Body">
              <div className="temp-phone-image">
                <img className="temp-phones" src={phones} alt="img" />
              </div>
              <div className="temp-right">
                <img className="check" src={check} alt="check" />
                  <div id="temp-text">
                    Create and fill opportunities for diverse candidates.
                  </div>
                <img className="check" src={check} alt="check" />
                  <div id="temp-text">
                    Discover opportunities at diverse-minded companies.
                  </div>
                <img className="check" src={check} alt="check" />
                  <div id="temp-text">
                    Connect with like-minded underrepresented professionals and students.
                  </div>
                <div className="Mobile-Link">
                  <div id="Temp-Mobile-Header">
                    <strong> Download the mobile app </strong>
                  </div>
                  <br />
                  <div id="Temp-Mobile-Subline">
                    (Coming soon for Android and web!)
                  </div>
                  <a href="https://itunes.apple.com/us/app/pinc-chat/id1082955432">
                    <img className="Apple-Button" src={apple} alt="apple-button" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default NewTemp;
