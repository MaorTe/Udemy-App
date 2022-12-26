import React, { useState } from 'react';
import {
   BoldLink,
   BoxContainer,
   FormContainer,
   Input,
   MutedLink,
   SubmitButton,
} from './common.styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authActions';
import Marginer from '../../components/Marginer/Marginer';
import { toast } from 'react-toastify';
import { getUserStatus } from '../../features/auth/authSlice';

export function SignUpForm() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userStatus = useSelector(getUserStatus);

   const [userInfo, setUserInfo] = useState({
      name: '',
      age: '',
      email: '',
      password: '',
   });

   const createUser = async () => {
      try {
         const userRegister = await dispatch(registerUser(userInfo)).unwrap();
         toast.success('Successfully Register 👌');
         setTimeout(() => {
            //redirect to SignIn
            userRegister && navigate('/SignIn');
         }, 1000);
      } catch (err) {
         toast.error('Register Failed');
         console.log('Register Failed');
      }
   };

   if (userStatus === 'loading') {
      return <div className="loader">Loading...</div>;
   }

   const changeHandler = (e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
   return (
      <BoxContainer>
         <FormContainer>
            <Input
               value={userInfo.name}
               name={'name'}
               onChange={changeHandler}
               type="text"
               placeholder="Full Name"
               required
            />
            <Input
               value={userInfo.age}
               name={'age'}
               onChange={changeHandler}
               type="number"
               placeholder="Age"
            />
            <Input
               value={userInfo.email}
               name={'email'}
               onChange={changeHandler}
               type="email"
               placeholder="Email"
               required
            />
            <Input
               value={userInfo.password}
               name={'password'}
               onChange={changeHandler}
               type="password"
               placeholder="Password"
               required
            />
         </FormContainer>
         <Marginer direction="vertical" margin={10} />
         <SubmitButton type="submit" onClick={createUser}>
            Sign up
         </SubmitButton>
         <Marginer direction="vertical" margin="1em" />
         <MutedLink to="/">Already have an account?</MutedLink>
         <BoldLink to="/SignIn">Sign in</BoldLink>
      </BoxContainer>
   );
}
