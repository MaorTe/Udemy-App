import React, { useState } from 'react';
import * as S from './HamburgerMenu.style';
import { useDispatch } from 'react-redux';

export default function HamburgerMenu({ isAdmin, logoutUser }) {
   const dispatch = useDispatch();
   const [click, setClick] = useState(false);
   const closeMenu = () => setClick((prev) => !prev);

   return (
      <>
         <S.MenuLabel htmlFor="navi-toggle" onClick={closeMenu}>
            <S.Icon clicked={click}>&nbsp;</S.Icon>
         </S.MenuLabel>
         <S.NavBackground clicked={click}>&nbsp;</S.NavBackground>

         <S.Navigation clicked={click}>
            <S.List>
               <li>
                  <S.ItemLink onClick={closeMenu} to="/">
                     Home
                  </S.ItemLink>
               </li>
               <li>
                  <S.ItemLink onClick={closeMenu} to="/Profile">
                     Profile
                  </S.ItemLink>
               </li>
               {isAdmin && (
                  <li>
                     <S.ItemLink onClick={closeMenu} to="/Courses/AddCourse">
                        Add Course
                     </S.ItemLink>
                  </li>
               )}
               <li>
                  <S.ItemLink onClick={closeMenu} to="/Courses">
                     Courses
                  </S.ItemLink>
               </li>
               <li>
                  <S.ItemLink
                     onClick={() => {
                        closeMenu();
                        setTimeout(() => {
                           logoutUser();
                        }, 1000);
                     }}
                     to="/SignIn">
                     Logout
                  </S.ItemLink>
               </li>
            </S.List>
         </S.Navigation>
      </>
   );
}
