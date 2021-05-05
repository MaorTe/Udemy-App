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
	const { switchToSignup } = useContext(AccountContext);

	return (
		<BoxContainer>
			<FormContainer>
				<Input type="email" placeholder="Email" />
				<Input type="password" placeholder="Password" />
			</FormContainer>

			<Marginer direction="vertical" margin={10} />
			<MutedLink to="/">Forget your password?</MutedLink>

			<Marginer direction="vertical" margin="1.6em" />
			<SubmitButton type="submit">Signin</SubmitButton>

			<Marginer direction="vertical" margin="1em" />
			<MutedLink to="/">Don't have an account?</MutedLink>
			<BoldLink to="/Signup" onClick={switchToSignup}>
				Signup
			</BoldLink>
		</BoxContainer>
	);
}
