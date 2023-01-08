import React, { useEffect, useState } from 'react';
import logo from '../../img/logo.png';
import * as S from './Navbar.style';
import HamburgerMenu from './../HamburgerMenu/HamburgerMenu.component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { isUserAdmin, logout, getUserStatus } from '../../features/auth/authSlice';
import { userLogout } from '../../features/auth/authActions';
import { toast } from 'react-toastify';

const Navbar = ({ user }) => {
   const dispatch = useDispatch();
   const isAdmin = useSelector(isUserAdmin);
   const userStatus = useSelector(getUserStatus);

   const [width, setWidth] = useState(window.innerWidth);
   const updateWidth = () => setWidth(window.innerWidth);
   useEffect(() => {
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
   }, []);

   const logoutUser = async () => {
      try {
         const res = await dispatch(userLogout()).unwrap();
         toast.success('Successfully Logout');
         res && dispatch(logout());
      } catch (err) {
         toast.error('Logout Failed ❌');
      }
   };

   const userLinks = () =>
      user ? (
         width < 650 ? (
            <HamburgerMenu isAdmin={isAdmin} logoutUser={logoutUser} />
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
                  <S.NavLink to="/SignIn" onClick={() => logoutUser()}>
                     Logout
                  </S.NavLink>
               </S.li>
            </>
         )
      ) : (
         <S.li>
            <S.NavLink to="/SignIn">Sign in</S.NavLink>
         </S.li>
      );

   return (
      <S.NavbarContainer>
         <div>
            <S.NavLinkLogo to="/">
               <img src={logo} alt="Home" width="115" />
            </S.NavLinkLogo>
         </div>

         <S.ul>
            {userStatus === 'loading' ? (
               <S.li>
                  <S.PlaceHolder disabled={true}>Place holder</S.PlaceHolder>
               </S.li>
            ) : (
               userLinks()
            )}
         </S.ul>
      </S.NavbarContainer>
   );
};

export default Navbar;
