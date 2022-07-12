import styled from 'styled-components';
import { AccountBox } from '../components/accountBox';

const SignUpPageContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;
//
function SignIn({ getUser }) {
   return (
      <SignUpPageContainer>
         <AccountBox getUser={getUser} />
      </SignUpPageContainer>
   );
}

export default SignIn;
