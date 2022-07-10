import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const COLORS = {
   primaryDark: '#115b4c',
   primaryLight: '#B6EDC8',
};

export const MenuLabel = styled.label`
   background-color: transparent;
   border-radius: 50%;
   height: 3rem;
   width: 3rem;
   cursor: pointer;
   z-index: 1000;
   text-align: center;
`;

export const NavBackground = styled.div`
   position: fixed;
   background-image: radial-gradient(#2e3440, #274785);
   height: 6rem;
   width: 6rem;
   border-radius: 50%;
   z-index: 600;
   transform: ${(props) => (props.clicked ? 'scale(80)' : 'scale(0)')};
   transition: transform 0.8s;
`;

export const Icon = styled.span`
   position: relative;
   background-color: ${(props) => (props.clicked ? 'transparent' : '#fff')};
   width: 2rem;
   height: 2px;
   display: inline-block;
   margin-top: 1.5rem;
   transition: all 0.3s;
   &::before,
   &::after {
      content: '';
      background-color: #fff;
      width: 2rem;
      height: 2px;
      display: inline-block;
      position: absolute;
      left: 0;
      transition: all 0.3s;
   }
   &::before {
      top: ${(props) => (props.clicked ? '0' : '-0.6rem')};
      transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
   }
   &::after {
      top: ${(props) => (props.clicked ? '0' : '0.6rem')};
      transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
   }
   ${MenuLabel}:hover &::before {
      top: ${(props) => (props.clicked ? '0' : '-1rem')};
   }
   ${MenuLabel}:hover &::after {
      top: ${(props) => (props.clicked ? '0' : '1rem')};
   }
`;

export const Navigation = styled.nav`
   height: 100vh;
   position: fixed;
   top: 0;
   right: 0;
   z-index: 600;
   width: ${(props) => (props.clicked ? '100%' : '0')};
   opacity: ${(props) => (props.clicked ? '1' : '0')};
   transition: width 0.8s, opacity 0.8s;
`;

export const List = styled.ul`
   position: absolute;
   list-style: none;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   text-align: center;
   width: 100%;
`;
export const ItemLink = styled(Link)`
   display: inline-block;
   font-size: 3rem;
   font-weight: 300;
   text-decoration: none;
   color: #fff;
   padding: 1rem 2rem;
   background-image: linear-gradient(120deg, transparent 0%, transparent 50%, #fff 50%);
   background-size: 240%;
   transition: all 0.4s;
   &:hover,
   &:active {
      background-position: 100%;
      color: ${COLORS.primaryDark};
      transform: translateX(1rem);
   }
`;
