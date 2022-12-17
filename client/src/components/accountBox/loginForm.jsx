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
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './../../features/auth/authActions';
import { useHistory } from 'react-router-dom';
import { selectUser } from './../../features/auth/authSlice';

export function LoginForm(props) {
   const { switchToSignIn } = useContext(AccountContext);
   const history = useHistory();
   const dispatch = useDispatch();
   const user = useSelector(selectUser);

   const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: '',
   });

   const loginUser = async () => {
      if (user === null) {
         dispatch(userLogin(loginInfo));
      }
      history.push('/');
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
         <BoldLink to="/SignUp" onClick={switchToSignIn}>
            Sign up
         </BoldLink>
      </BoxContainer>
   );
}
