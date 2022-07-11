import styled, { keyframes } from 'styled-components';

export const Line = styled.div`
   clip-path: polygon(0 0, 100% 0, 100% 25%, 0 100%);
   background: #4973ff;
   height: 20vh;
   /* img {
		width: 300px;
		height: 300px;
		object-fit: cover;
		z-index: 10;
	} */
`;
export const HeroContainer = styled.div`
   position: relative;
`;
// export const HeroHeader = styled.h1`
// 	margin-bottom: 20px;
// `;
// export const HeroParagraph = styled.p`
// 	font-size: 24px;
// `;

export const HeroContentBottom = styled.div`
   bottom: 40px;
   right: 120px;
   position: absolute;
   img {
      width: 500px;
      margin: 0 1rem;
   }
   @media all and (max-width: 650px) {
      bottom: 33px;
      img {
         width: 130%;
      }
   }
`;
export const WaveImg = styled.img`
   transform: rotate(180deg) scaleX(-1) translateY(1px);
   width: 100%;
   @media all and (max-width: 650px) {
      top: 120px;
      width: 500%;
      /* width: 800px; */
   }
   /* background: #29303b; */
`;
/* text animation */
const fadeInLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(0);
	}
	to {
		opacity: 1;
		transform: translateX(50px);
	}
	`;

export const Homepage = styled.div`
   color: #2e3440;
   h2 {
      margin-bottom: 15px;
      margin-left: 15px;
      font-weight: 500;
      font-size: 26px;
   }
   @media all and (max-width: 650px) {
      h2 {
         font-size: 18px;
         margin-top: 10px;
      }
   }
`;
export const HeroContentTop = styled.div`
   animation: ${fadeInLeft} 2s linear;
   color: #e6e6e6;
   text-overflow: ellipsis;
   transform: translateX(50px);
   left: -7px;
   top: 30px;
   position: absolute;
   p {
      width: 550px;
      font-size: 20px;
   }
   h1 {
      margin-bottom: 20px;
      font-size: 50px;
      font-weight: 300;
   }
   @media all and (max-width: 650px) {
      p {
         width: 85%;
      }
      h1 {
         font-size: 30px;
      }
   }
`;
