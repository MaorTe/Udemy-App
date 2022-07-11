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

export function SignUpForm(props) {
	const { switchToSignIn, createUser, userInfo, setUserInfo } = useContext(
		AccountContext
	);
	const changeHandler = (e) =>
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
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
					name={'age'}
					onChange={changeHandler}
					type="number"
					placeholder="Age"
				/>
				<Input
					name={'email'}
					onChange={changeHandler}
					type="email"
					placeholder="Email"
					required
				/>
				<Input
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
