/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import * as S from './VideoMenu.style';

const VideoMenu = ({ videoComments, courseContent, courseAbout }) => {
   const [active, setActive] = useState(1);

   return (
      <>
         <S.NavbarContainer>
            <S.ul>
               <S.Marginer active={active === 0}>
                  <S.NavLink active={active === 0} onClick={() => setActive(0)}>
                     <S.li>Course Content</S.li>
                  </S.NavLink>
               </S.Marginer>

               <S.Marginer active={active === 1}>
                  <S.NavLink active={active === 1} onClick={() => setActive(1)}>
                     <S.li>Overview</S.li>
                  </S.NavLink>
               </S.Marginer>

               <S.Marginer active={active === 2}>
                  <S.NavLink active={active === 2} onClick={() => setActive(2)}>
                     <S.li>Comments</S.li>
                  </S.NavLink>
               </S.Marginer>
            </S.ul>
         </S.NavbarContainer>
         <div>
            {active === 0 && courseContent()}
            {active === 1 && courseAbout()}
            {active === 2 && videoComments()}
         </div>
      </>
   );
};

export default VideoMenu;
