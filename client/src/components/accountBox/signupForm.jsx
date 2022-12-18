import React, { useState } from 'react';
import {
   BoldLink,
   BoxContainer,
   FormContainer,
   Input,
   MutedLink,
   SubmitButton,
} from './common.styles';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authActions';
import Marginer from '../Marginer/Marginerr';

export function SignUpForm() {
   const history = useHistory();
   const dispatch = useDispatch();

   const [userInfo, setUserInfo] = useState({
      name: '',
      age: '',
      email: '',
      password: '',
   });

   const createUser = async () => {
      dispatch(registerUser(userInfo));
      //redirect to SignIn
      history.push('/SignIn');
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
      </BoxContainer>
   );
}
