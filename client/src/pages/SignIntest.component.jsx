import styled from 'styled-components';
import AccountBox from '../components/AccountBox';

const SignUpPageContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const SignIntest = () => {
   return (
      <SignUpPageContainer>
         <AccountBox />
      </SignUpPageContainer>
   );
};

export default SignIntest;
