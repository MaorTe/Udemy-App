import React, { useContext, useState } from 'react';
import {
   BoldLink,
   BoxContainer,
   FormContainer,
   Input,
   MutedLink,
   SubmitButton,
} from './common.styles';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './../../features/auth/authSlice';
import { registerUser } from '../../features/auth/authActions';

export function SignUpForm(props) {
   const { switchToSignIn } = useContext(AccountContext);
   const history = useHistory();
   const dispatch = useDispatch();
   const user = useSelector(selectUser);

   const [userInfo, setUserInfo] = useState({
      name: '',
      age: '',
      email: '',
      password: '',
   });

   const createUser = async () => {
      if (user === 'idle') {
         dispatch(registerUser(userInfo));
      }
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
         <BoldLink to="/SignIn" onClick={switchToSignIn}>
            Sign in
         </BoldLink>
      </BoxContainer>
   );
}
