import React, {Component} from 'react';
import '../../styles/Staffing.css';

import { Link } from 'react-router-dom';

// Staff members
import alejo from '../../assets/staff/alejo.png';
import andreas from '../../assets/staff/andreas.png';
import chuka from '../../assets/staff/chuka.png';
import joanna from '../../assets/staff/joanna.png';
import lucas from '../../assets/staff/lucas.png';
import karina from '../../assets/staff/karina.png';
import etse from '../../assets/staff/etse.png';

class Staffing extends Component {
	constructor() {
		super();

		this.state = {
			staff: [chuka, joanna, lucas, andreas, alejo, karina, etse]
		}
	}

	setTimer() {
		this.timer = setInterval(() => {
			var {staff} = this.state;

			// Remove first element of staff array
			var firstStaff = staff.shift();

			// Push it to the back of the array, then update the state
			staff.push(firstStaff);
			this.setState(staff);
		}, 5000);
	}

	render() {
		if (!this.timer) this.setTimer();  // If timer is not set for carousal, then set it

		return (
			<div id="Staffing">
				<div className="Staffing-Navbar">
					<Link to="/"><img src={"/Logo_design.png"} className="Staffing-Navbar-Logo" alt="Divercity Logo"/></Link>
				</div>

				<div className="Staffing-Top">
					<div className="Staffing-Header">
						<img src={"/collage.png"} alt="Collage"/>
					</div>

					<div className="Staffing-SubHeader">
						<h2>Did you know that companies with as many men as women are 41% more profitable? - MIT</h2>

						<h3>Let's help you find diverse talent!</h3>

						<button className="Staffing-Message-Button" onClick={() => alert("Click The Lower-Right Icon to directly message us!!!")}>
							<img src={"/icons/mail.png"} alt="Mail Icon"/>
							Message Us Now
						</button>
					</div>
				</div>

				<div className="Staffing-Body">
					<p>Our tech & media recruiting team specializes in finding you the right talent, and we take pride in sourcing you with <b>diverse candidates</b> as our research proves they will add more value than homogenous teams.</p>

					<h3>Our super diverse and inclusive team</h3>

					<ul className="Staffing-Staff-List">
						{this.state.staff.map((member, i) => <li key={i}><img src={member} alt={member}/></li>)}
					</ul>
				</div>
			</div>
		);
	}
}

export default Staffing;