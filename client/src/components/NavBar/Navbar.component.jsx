/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import logo from '../../img/logo.png';
import * as S from './Navbar.style';
import HamburgerMenu from './../HamburgerMenu/HamburgerMenu.component';

const Navbar = ({ getUser, isLoggedIn, user, userAdmin }) => {
   const [width, setWidth] = useState(window.innerWidth);
   const updateWidth = () => setWidth(window.innerWidth);
   useEffect(() => {
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
   }, []);
   const logoutUser = () => {
      localStorage.removeItem('token');
      getUser({
         isAuthenticated: false,
         user: null,
         isAdmin: false,
      });
   };

   return (
      <S.NavbarContainer>
         {/* <span>Welcome {user && user.name}!</span> */}
         <div>
            <S.NavLinkLogo to="/">
               <img src={logo} alt="Home" width="115" />
            </S.NavLinkLogo>
         </div>

         <S.ul>
            {isLoggedIn ? (
               width < 650 ? (
                  <HamburgerMenu logoutUser={logoutUser} userAdmin={userAdmin} />
               ) : (
                  <>
                     <S.li>{/* <span>Welcome {user && user.name}!</span> */}</S.li>
                     <S.li>
                        <S.NavLink to="/Profile">Profile</S.NavLink>
                     </S.li>
                     {userAdmin && (
                        <S.li>
                           <S.NavLink to="/Courses/AddCourse">Add Course</S.NavLink>
                        </S.li>
                     )}
                     <S.li>
                        <S.NavLink to="/Courses">My Courses</S.NavLink>
                     </S.li>
                     <S.li>
                        <S.NavLink to="/" onClick={() => logoutUser()}>
                           Logout
                        </S.NavLink>
                     </S.li>
                  </>
               )
            ) : (
               <S.li>
                  <S.NavLink to="/SignIn">Sign in</S.NavLink>
               </S.li>
            )}
         </S.ul>
      </S.NavbarContainer>
   );
};

export default Navbar;
