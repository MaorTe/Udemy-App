import React, { useState } from 'react';
import {
   BoldLink,
   BoxContainer,
   FormContainer,
   Input,
   MutedLink,
   SubmitButton,
} from './common.styles';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/auth/authActions';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/auth/authSlice';
import Marginer from '../Marginer/Marginer';
import { ToastContainer, toast } from 'react-toastify';

export function LoginForm() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const user = useSelector(selectUser);

   const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: '',
   });

   const loginUser = async () => {
      if (user === null) {
         try {
            const authUser = await dispatch(userLogin(loginInfo)).unwrap();
            toast.success('Successfully Login 👌');
            setTimeout(() => {
               authUser.token && navigate('/');
            }, 1000);
         } catch (err) {
            toast.error('Login Failed');
            console.log('Something went wrong');
         }
      }
   };
   const changeHandler = (e) => setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

   return (
      <BoxContainer>
         <FormContainer>
            <Input
               type="email"
               name={'email'}
               value={loginInfo.email}
               onChange={changeHandler}
               placeholder="Email"
            />
            <Input
               type="password"
               name={'password'}
               value={loginInfo.password}
               onChange={changeHandler}
               placeholder="Password"
            />
         </FormContainer>
         <Marginer direction="vertical" margin={10} />
         <MutedLink to="/">Forget your password?</MutedLink>
         <Marginer direction="vertical" margin="1.6em" />
         <SubmitButton type="submit" onClick={loginUser}>
            Sign in
         </SubmitButton>
         <Marginer direction="vertical" margin="1em" />
         <MutedLink to="/">Don't have an account?</MutedLink>
         <BoldLink to="/SignUp">Sign up</BoldLink>
         <ToastContainer autoClose={2000} />
      </BoxContainer>
   );
}
