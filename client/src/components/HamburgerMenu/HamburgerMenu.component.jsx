import React, { useState } from 'react';
import * as S from './HamburgerMenu.style';

export default function HamburgerMenu({ logoutUser, userAdmin }) {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   return (
      <>
         <S.MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
            <S.Icon clicked={click}>&nbsp;</S.Icon>
         </S.MenuLabel>
         <S.NavBackground clicked={click}>&nbsp;</S.NavBackground>

         <S.Navigation clicked={click}>
            <S.List>
               <li>
                  <S.ItemLink onClick={handleClick} to="/">
                     Home
                  </S.ItemLink>
               </li>
               <li>
                  <S.ItemLink onClick={handleClick} to="/Profile">
                     Profile
                  </S.ItemLink>
               </li>
               {userAdmin && (
                  <li>
                     <S.ItemLink onClick={handleClick} to="/Courses/AddCourse">
                        Add Course
                     </S.ItemLink>
                  </li>
               )}
               <li>
                  <S.ItemLink onClick={handleClick} to="/Courses">
                     Courses
                  </S.ItemLink>
               </li>
               <li>
                  <S.ItemLink
                     onClick={() => {
                        logoutUser();
                        setClick(!click);
                     }}
                     to="/">
                     Logout
                  </S.ItemLink>
               </li>
            </S.List>
         </S.Navigation>
      </>
   );
}
