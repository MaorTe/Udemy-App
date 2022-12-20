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
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authActions';
import Marginer from '../../components/Marginer/Marginer';
import { ToastContainer, toast } from 'react-toastify';

export function SignUpForm() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [userInfo, setUserInfo] = useState({
      name: '',
      age: '',
      email: '',
      password: '',
   });

   const createUser = async () => {
      try {
         const userRegister = await dispatch(registerUser(userInfo)).unwrap();
         toast.success('Successfully register 👌');
         setTimeout(() => {
            //redirect to SignIn
            userRegister && navigate('/SignIn');
         }, 1000);
      } catch (err) {
         toast.error('Register Failed');
         console.log(err);
      }
   };

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
         <ToastContainer autoClose={2000} />
      </BoxContainer>
   );
}
