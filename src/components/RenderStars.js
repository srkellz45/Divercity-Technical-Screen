import React from 'react';
import { NavLink } from 'react-router-dom';

import RateSmGrey from '../assets/RateSmGrey.png';
import RateMdGrey from '../assets/RateMdGrey.png';
import RateSmGold from '../assets/RateSmGold.png';
import RateMdGold from '../assets/RateMdGold.png';

const RenderStars = ({ rating, large}) => {
    let stars = new Array(rating).fill(1);
    console.log("rating is");
    console.log(rating);
    let greys = new Array(5-rating).fill(1);
    
    return (
        <React.Fragment>
            { rating ? (
                large ?(
                    <div className="Large-Stars">
                    { 
                        stars.map((i) => {
                            return (
                                <img key={i} src={RateMdGold} className="Company-rate" alt="Star" />
                            );
                        })
                    }
                    { 
                        greys.map((i) => {
                            return (
                                <img key={i} src={RateMdGrey} className="Company-rate" alt="Star" />
                            );
                        })
                    }
                    <span className="Rating-value">{ rating }</span>
                    </div>
                ) : (
                    <div className="Stars">
                    { 
                        stars.map((el, i) => {
                            return (
                                <img key={i} src={RateSmGold} className="Company-rate" alt="Star" />    
                            );
                        })
                    }
                    { 
                        greys.map((i) => {
                            return (
                                <img key={i} src={RateSmGrey} className="Company-rate" alt="Star" />
                            );
                        })
                    }
                    <span id="Company-Rating-Value">{ rating }</span>
                    </div>
                )
            ) : ( null )}
        </React.Fragment>
    )
}

export default RenderStars;
