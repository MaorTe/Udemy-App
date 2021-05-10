import styled from 'styled-components';
import { AccountBox } from '../components/accountBox';

const SignupPageContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

function Signin({ getUser }) {
	return (
		<SignupPageContainer>
			<AccountBox getUser={getUser} />
		</SignupPageContainer>
	);
}

export default Signin;
