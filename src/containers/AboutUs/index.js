import React, { Component } from "react";

import TempHeader from "../../components/TempHeader.js";
import ShowMember from "./ShowMember"

import chuka from './../../assets/team/Chuka.png';
import williams from './../../assets/team/Williams.png';
import andreas from './../../assets/team/Andreas.png';
import ricky from './../../assets/team/Ricky.png';
import lucas from './../../assets/team/Lucas.png';
import joanna from './../../assets/team/Joanna.png';
import yiru from './../../assets/team/Yiru.png';
import alejo from './../../assets/team/Alejo.png';
import toyin from './../../assets/team/toyin.jpg';
import letty from './../../assets/team/Letty.png';
import vida from './../../assets/team/Vida.jpg';
import loquen from './../../assets/team/Loquen.jpg';
import catie from './../../assets/team/Catie.jpeg';

import company1 from './../../assets/companies/Amplitude.png';
import company2 from './../../assets/companies/College_Board.png';
import company3 from './../../assets/companies/exploding-kittens.png';
import company4 from './../../assets/companies/hs.png';
import company5 from './../../assets/companies/moz.png';
import company6 from './../../assets/companies/unity.png';
import company7 from './../../assets/companies/Warner_Bros.png';
import company8 from './../../assets/companies/Yelp.png';


const teamData = [
  {
    'name': 'Chuka Ikokwu',
    'image': chuka,
    'title': 'Chief Executive Officer',
    'linkedinUrl': 'https://www.linkedin.com/in/chuka-ikokwu-aa53587/'
  },
  {
    'name': 'Williams Isaac',
    'image': williams,
    'title': 'Lead Backend Engineer',
    'linkedinUrl': 'https://www.linkedin.com/in/wilforlan/'
  },
  {
    'name': 'Andreas Braun',
    'image': andreas,
    'title': 'Lead iOS Engineer',
    'linkedinUrl': 'https://www.linkedin.com/in/andreas-braun-75904bb0/'
  },
  {
    'name': 'Lucas Griotto',
    'image': lucas,
    'title': 'Lead Android Engineer',
    'linkedinUrl': 'https://www.linkedin.com/in/lucasgriotto/'
  },
  {
    'name': 'Catie Gutierrez',
    'image': catie,
    'title': 'Social Media Manager',
    'linkedinUrl': 'https://www.linkedin.com/in/catiegutierrez/'
  },
  {
    'name': 'Vida Chumbley',
    'image': vida,
    'title': 'Recuiting Manager',
    'linkedinUrl': 'https://www.linkedin.com/in/vchumbley/'
  },
  {
    'name': 'Toyin',
    'image': toyin,
    'title': 'Marketing Manager',
    'linkedinUrl': ''
  },
  {
    'name': 'Joanna Pyra',
    'image': joanna,
    'title': 'Lead UI/UX Designer',
    'linkedinUrl': 'https://www.linkedin.com/in/joanna-pyra/'
  },
  {
    'name': 'Loquen Jones',
    'image': loquen,
    'title': 'Lead Frontend Engineer',
    'linkedinUrl': 'https://www.linkedin.com/in/loquenjones/'
  },
  {
    'name': 'Alejo Pijuan',
    'image': alejo,
    'title': 'Machine Learning Lead',
    'linkedinUrl': 'https://www.linkedin.com/in/alejopijuan/'
  },
  {
    'name': 'Kirti Dhir',
    'image': '',
    'title': 'Data Engineer',
    'linkedinUrl': 'https://www.linkedin.com/in/kirtidhir/'
  },
  {
    'name': 'Letty Li',
    'image': letty,
    'title': 'Frontend Developer Intern',
    'linkedinUrl': 'https://www.linkedin.com/in/zheqingli/'
  },
  {
    'name': 'Yiru An',
    'image': yiru,
    'title': 'UI/UX Design Intern',
    'linkedinUrl': 'https://www.linkedin.com/in/yiru-an-20973011b/'
  },
]

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chukaOpen: false,
      williamsOpen: false,
      andreasOpen: false,
      lucasOpen: false,
      catieOpen: false,
      vidaOpen: false,
      toyinOpen: false,
      joannaOpen: false,
      loquenOpen: false,
      KirtiOpen: false,
      lettyOpen: false,
      yiruOpen: false,
      alejoOpen: false,
      showModal: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick = evt => {
    evt.preventDefault();
    let person = evt.target.name + "Open";
    console.log(person);
    this.setState({
      person: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  handleClick = (evt) => {
    console.log(evt);
    this.setState({
      showModal: true
    });
  };

  render() {
    return (
      <div className="AboutUs">
        <TempHeader />
        <div className="AboutUs-body">
          <div className="AboutUs-headline">
            About Us
            <div className="AboutUs-subline">
              Divercity is a job platform and online community that caters to
              diverse-minded companies, people of color, and women. We greatly
              value diversity and inclusion and understand that with it, the
              world is a better place, and companies can get so much more done.
              Join the Divercity community today and post or find your dream job
              at companies that actually care about you. In addition to our
              fully-functional website, you can download the mobile app on iOS
              or Android. Happy connecting!
            </div>
          </div>
        </div>
        <div className="AboutUs-team">
          <div className="AboutUs-headline">Divercity Team</div>
          <div className="AboutUs-team-container flex-container">
          {
            teamData.map(item => {
              return (
                <div className="AboutUs-item" key={item.name} onClick={this.handleClick}>
                <div id="AboutUs-image">
                  <img src={item.image !== '' ? item.image : "import logo from '../../assets/Logo.png'"} />
                </div>
                <div className="AboutUs-name">{item.name}</div>
                <div className="AboutUs-title">{item.title}</div>
                <div className="AboutUs-linkedin">
                  <a href={item.linkedinUrl} rel="noopener" target="_blank">
                    <img src="https://png.pngtree.com/svg/20150910/899e642a8b.png" />
                  </a>
                </div>
                {/* <ShowMember
                  show={this.state.showModal}
                  onClose={this.closeModal}
                  className="Modal-Backdrop">
                    <p>{item.name}</p>
                </ShowMember> */}
              </div>
              )
            })
          }
          </div>
        </div>
        <div className="AboutUs-brands">
          <div className="AboutUs-headline">Brand That Trusts Us</div>
          <div className="AboutUs-brands-container flex-container">
            <img className="AboutUs-brands-img1" src={company7} />
            <img className="AboutUs-brands-img2" src={company3} />
            <img className="AboutUs-brands-img3" src={company4} />
            <img className="AboutUs-brands-img4" src={company6} />
            <img className="AboutUs-brands-img5" src={company2} />
            <img className="AboutUs-brands-img6" src={company5} />
            <img className="AboutUs-brands-img7" src={company1} />
            <img className="AboutUs-brands-img8" src={company8} />
          </div>
        </div>
        <div className="AboutUs-help">
        <div className="AboutUs-headline">Need Help?</div>
        <div className="AboutUs-brands-container">
          <span className="AboutUs-help-email">
            Contact <a href="mailto:support@divercity.io" 
            target="_top">support@divercity.io</a>
          </span>
        </div>
      </div>
      </div>
    );
  }
}

export default AboutUs;
