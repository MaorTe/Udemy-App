import React, { useState, useEffect } from 'react';
import { LoginForm } from './loginForm';
import { SignUpForm } from './signupForm';
import { useLocation } from 'react-router-dom';
import * as S from './index.style';

export function AccountBox() {
   const location = useLocation();
   const [active, setActive] = useState(null);
   const [preActive, setPreActive] = useState(null);

   //animation
   const [isExpanded, setExpanded] = useState(false);
   useEffect(() => {
      const type = location.pathname.slice(1);
      setActive(type);
   }, []);

   //animation functions
   const playExpandingAnimation = async () => {
      await setExpanded(true);
      setTimeout(() => {
         setExpanded(false);
      }, S.expandingTransition.duration * 1000 - 1500);
   };

   const switchToSignIn = () => {
      const type = location.pathname.slice(1);
      setPreActive(type);
   };

   useEffect(() => {
      playExpandingAnimation();
      const type = location.pathname.slice(1);
      setTimeout(() => {
         setActive(type);
      }, 4000);
   }, [preActive]);

   return (
      <S.BoxContainer>
         <S.TopContainer>
            <S.BackDrop
               initial={false}
               animate={isExpanded ? 'expanded' : 'collapsed'}
               variants={S.backdropVariants}
               transition={S.expandingTransition}
            />
            <S.HeaderContainer>
               <S.HeaderText>{active === 'SignIn' ? 'Welcome' : 'Create'}</S.HeaderText>
               <S.HeaderText>{active === 'SignIn' ? 'Back' : 'Account'}</S.HeaderText>
               <S.SmallText>
                  {active === 'SignIn'
                     ? 'Please sign in to continue!'
                     : 'Please sign up to continue!'}
               </S.SmallText>
            </S.HeaderContainer>
         </S.TopContainer>
         <S.InnerContainer>
            {active === 'SignIn' ? (
               <LoginForm switchToSignIn={switchToSignIn} />
            ) : active === 'SignUp' ? (
               <SignUpForm />
            ) : (
               ''
            )}
         </S.InnerContainer>
      </S.BoxContainer>
   );
}
