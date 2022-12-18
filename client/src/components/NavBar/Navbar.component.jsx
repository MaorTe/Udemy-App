import React, { useEffect, useState } from 'react';
import logo from '../../img/logo.png';
import * as S from './Navbar.style';
import HamburgerMenu from './../HamburgerMenu/HamburgerMenu.component';
import { useDispatch } from 'react-redux';
import { isLoggedIn, isUserAdmin, logout } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const Navbar = ({ user, userToken }) => {
   const dispatch = useDispatch();
   const isAdmin = useSelector(isUserAdmin);
   const isLogged = useSelector(isLoggedIn);

   const [width, setWidth] = useState(window.innerWidth);
   const updateWidth = () => setWidth(window.innerWidth);
   useEffect(() => {
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
   }, []);

   return (
      <S.NavbarContainer>
         <div>
            <S.NavLinkLogo to="/">
               <img src={logo} alt="Home" width="115" />
            </S.NavLinkLogo>
         </div>

         <S.ul>
            {isLogged ? (
               width < 650 ? (
                  <HamburgerMenu isAdmin={isAdmin} userToken={userToken} />
               ) : (
                  <>
                     <S.li>
                        <span>Welcome {user && user.name}!</span>
                     </S.li>
                     <S.li>
                        <S.NavLink to="/Profile">Profile</S.NavLink>
                     </S.li>
                     {isAdmin && (
                        <S.li>
                           <S.NavLink to="/Courses/AddCourse">Add Course</S.NavLink>
                        </S.li>
                     )}
                     <S.li>
                        <S.NavLink to="/Courses">My Courses</S.NavLink>
                     </S.li>
                     <S.li>
                        <S.NavLink to="/" onClick={() => dispatch(logout())}>
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
