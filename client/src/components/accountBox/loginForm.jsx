import React, { useContext } from 'react';
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

export function LoginForm(props) {
	const { switchToSignin, loginUser, loginInfo, setLoginInfo } = useContext(
		AccountContext
	);
	const changeHandler = (e) =>
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

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
				Signin
			</SubmitButton>

			<Marginer direction="vertical" margin="1em" />
			<MutedLink to="/">Don't have an account?</MutedLink>
			<BoldLink to="/Signup" onClick={switchToSignin}>
				Signup
			</BoldLink>
		</BoxContainer>
	);
}
