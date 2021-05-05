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

export function SignupForm(props) {
	const { switchToSignin, createUser } = useContext(AccountContext);

	return (
		<BoxContainer>
			<FormContainer>
				<Input type="text" placeholder="Full Name" />
				<Input type="email" placeholder="Email" />
				<Input type="password" placeholder="Password" />
				<Input type="password" placeholder="Confirm Password" />
			</FormContainer>
			<Marginer direction="vertical" margin={10} />
			<SubmitButton type="submit" onClick={createUser}>
				Signup
			</SubmitButton>
			<Marginer direction="vertical" margin="1em" />
			<MutedLink to="/">Already have an account?</MutedLink>
			<BoldLink to="/Signin" onClick={switchToSignin}>
				Signin
			</BoldLink>
		</BoxContainer>
	);
}
