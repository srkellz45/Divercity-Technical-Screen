import React from 'react';
import RenderStars from './RenderStars.js';
import RateMdGold from '../assets/RateMdGold.png';
import Moment from 'moment';

const Diversity = ({ rating, count,reviews, rate, userCanRate}) => {
    //console.log(reviews[0][0].attributes);
    return (
        <div className="Diversity-container">
            <div className="Rating-top">
            { rating != null ? ( 
                <div className="Stars">
                    <RenderStars rating={rating} large={true}></RenderStars> 
                    <React.Fragment>    
                    { count > 1 ? ( 
                        <div className="Rating-count">{count} Ratings</div>                        
                    ) : ( 
                        <div className="Rating-count">{count} Rating</div>  
                    )}           
                    </React.Fragment>
                </div>
                ) : ( <div>Be the first to rate!</div> ) }           
                <React.Fragment>   
                    { userCanRate ? ( 
                        <div className="Rate-button">
                            <button 
                                className="Rate-company-btn"
                                onClick={ rate }
                            >
                                Rate Company
                            </button>
                        </div>                        
                    ) : ( null ) }           
                </React.Fragment>
            </div>
            
            { rating != null ? ( 
                <React.Fragment>
                    <hr className="Line"></hr>
                    <div className="Title">
                    Employee Diversity Reviews
                    </div>
                    { 
                    reviews[0].map((review) => {
                        return (
                            <React.Fragment>
                                <div className="Date">{Moment(review.attributes.created_at).format("MMMM Do, YYYY")}</div>
                                <div className="Rating">
                                    <img src={RateMdGold} className="Image-align"></img>
                                    <span className="Rating-value">{review.attributes.rate}</span>
                                </div>
                                <div className="Review">
                                    <div className="Review-title">Review</div>
                                    <div className="Review-text">
                                        <p>{review.attributes.review}</p>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    }) 
                    }
                </React.Fragment>
                ) : ( null ) }
        </div>  
    )
}

export default Diversity;
