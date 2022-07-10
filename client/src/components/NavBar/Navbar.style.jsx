import styled from 'styled-components';
import { Link } from 'react-router-dom';
/* -------------NavBar------------- */
export const NavbarContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 100px;
   /* background: #3a497d; */
   /* background: #3498db; */
   /* background: #2980b9; */
   background: #29303b;
   /* background: rgb(241, 196, 15);
	background: linear-gradient(
		58deg,
		rgba(241, 196, 15, 1) 20%,
		rgba(243, 172, 18, 1) 100%
	); */
   @media all and (max-width: 650px) {
      padding: 0 5px;
   }
   height: auto;
   z-index: 5;
`;
export const ul = styled.ul`
   display: flex;
   justify-content: center;
   align-items: center;
   color: #fff;
`;
export const li = styled.li`
   list-style-type: none;
   span {
      font-size: 22px;
      font-weight: 500;
      margin-right: 200px;
   }
`;

export const NavLink = styled(Link)`
   display: block;
   padding: 20px;
   text-decoration: none;
   color: #fff;
   font-size: 1rem;
   font-size: 22px;
   font-weight: 300;
   &:hover {
      color: #bbbbc1;
      background: #303a62;
   }
   &:focus {
      color: #bbbbc1;
      background: #201f32;
   }
`;

export const NavLinkLogo = styled(Link)`
   display: block;
   text-decoration: none;
   color: #fff;
   font-family: sans-serif;
   font-size: 1rem;

   &:hover {
      /* color: #bbbbc1; */
      /* background: rgba(255, 255, 249, 0.376); */
      transform: scale(1.2);
   }
   &:focus {
      /* color: #bbbbc1;
		background: #201f32; */
   }
   @media screen and (max-width: 650px) {
      margin-top: 5px;
      font-size: 0rem;
   }
`;
