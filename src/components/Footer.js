import React from 'react';
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';
import styled, { css } from 'styled-components';
import check from '../assets/Checkmark.png';
const Footer = () => {
const Container = styled.div`

  overflow: hidden;
  width: 1000px;
  height: 60px;
`;
const CarouselUI = ({ children }) => <Container>{children}</Container>;
const Carousel = makeCarousel(CarouselUI);
  return (
    <div id="footer">
      <div className="footer-details">
      <Carousel defaultWait={5000} /*wait for 1000 milliseconds*/ >
        <Slide right>
          <div>
            <img src={check} alt="check"/> <a href="https://divercity.io/slack">Easily post jobs through Slack in seconds.</a>
          </div>
        </Slide>
        <Slide right>
          <div>
            <img src={check} alt="check"/> Create and fill opportunities for diverse candidates.
          </div>
        </Slide>
        <Slide right>
          <div>
           <img src={check} alt="check"/> Discover opportunities at diverse-minded companies.
          </div>
        </Slide>
        <Slide right>
          <div>
           <img src={check} alt="check"/> Connect with like-minded underrepresented professionals and students.
          </div>
        </Slide>
        <Slide right>
          <div>
           <img src={check} alt="check"/> Increase your revenue 41% by hiring more Women.
          </div>
        </Slide>
      </Carousel>
        </div>
    </div>
  );
}

export default Footer;