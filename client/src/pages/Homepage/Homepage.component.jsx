import React, { useEffect, useState } from 'react';
import * as S from './Homepage.style';
import hero from '../../img/undraw_Coding_re_iv62.svg';
import waveinverse from '../../img/waveinverse.svg';
import Carousel from '../../components/Carousel/Carousel.component';

const Homepage = () => {
   const [width, setWidth] = useState(window.innerWidth);
   const updateWidth = () => setWidth(window.innerWidth);

   useEffect(() => {
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
   }, []);

   return (
      <S.Homepage>
         <S.HeroContainer>
            <S.WaveImg src={waveinverse} alt="wavetop" />
            <S.HeroContentTop>
               <h1>Online learning platform</h1>
               <p>
                  Build skills with courses, certificates, and degrees online from world-class
                  universities and companies
               </p>
               <a href="/" className="btn hero-btn fadeInLeft" style={{ color: '#86a6e4' }}>
                  Join for Free
               </a>
            </S.HeroContentTop>
            <S.HeroContentBottom>
               <img src={hero} alt="hero" />
            </S.HeroContentBottom>
         </S.HeroContainer>

         <h2>Top courses in Web Development</h2>
         <Carousel tag={'top'} width={width}></Carousel>
         <h2>Newest courses in JavaScript</h2>
         <Carousel tag={'top'} width={width}></Carousel>
      </S.Homepage>
   );
};

export default Homepage;
