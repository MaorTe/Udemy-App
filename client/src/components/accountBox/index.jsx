/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { LoginForm } from './loginForm';
import { AccountContext } from './accountContext';
import { SignUpForm } from './signupForm';
import { useHistory } from 'react-router-dom';
import api from '../../API/api';
import * as S from './index.style';

export function AccountBox({ getUser }) {
   const { location } = useHistory();
   const history = useHistory();

   //animation
   const [isExpanded, setExpanded] = useState(false);
   useEffect(() => {
      const type = location.pathname.slice(1);
      setActive(type);
   }, []);

   // create new user
   const [userData, setUserData] = useState([]);
   const [userInfo, setUserInfo] = useState({
      name: '',
      age: '',
      email: '',
      password: '',
   });
   const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: '',
   });
   const createUser = async () => {
      try {
         const { data } = await api.post('users', userInfo);
         setUserData([data]);
         //redirect to SignIn
         history.push('/SignIn');
      } catch (e) {
         console.dir(e);
      }
   };

   const loginUser = async () => {
      try {
         const { data } = await api.post('users/login', loginInfo);
         setUserInfo([data]);
         //set profile name on navbar and redirect to homepage
         localStorage.setItem('token', data.token);
         getUser({
            isAuthenticated: true,
            user: data.user,
            isAdmin: data.user.userRole === 'admin',
         });
         history.push('/');
      } catch (e) {
         console.dir(e);
      }
   };

   //animation functions
   const playExpandingAnimation = async () => {
      await setExpanded(true);
      setTimeout(() => {
         setExpanded(false);
      }, S.expandingTransition.duration * 1000 - 1500);
   };

   const [active, setActive] = useState(null);
   const [preActive, setPreActive] = useState(null);
   // const switchToSignUp = () => {
   // 	setActive('')
   // 	playExpandingAnimation();
   // 	setTimeout(() => {
   // 		const type = location.pathname.slice(1);
   // 		// replace(`/SignUp`);
   // 		setActive(type);
   // 	}, expandingTransition.duration * 1000 - 1500);
   // };

   const switchToSignIn = () => {
      const type = location.pathname.slice(1);
      setPreActive(type);
   };

   const contextValue = {
      switchToSignIn,
      //passing new user
      createUser,
      userInfo,
      setUserInfo,
      //passing login
      loginUser,
      loginInfo,
      setLoginInfo,
   };

   useEffect(() => {
      playExpandingAnimation();
      const type = location.pathname.slice(1);
      setTimeout(() => {
         setActive(type);
      }, 4000);
   }, [preActive]);

   return (
      <AccountContext.Provider value={contextValue}>
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
               {active === 'SignIn' ? <LoginForm /> : active === 'SignUp' ? <SignUpForm /> : ''}
               {/* {active === 'Sign in' && <LoginForm />}
					{active === 'Sign up' && <SignUpForm />} */}
            </S.InnerContainer>
         </S.BoxContainer>
      </AccountContext.Provider>
   );
}
