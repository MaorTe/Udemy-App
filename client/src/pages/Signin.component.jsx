import styled from 'styled-components';
import { AccountBox } from '../components/accountBox';

const SigninPageContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

function Signin() {
	return (
		<SigninPageContainer>
			<AccountBox />
		</SigninPageContainer>
	);
}

export default Signin;
