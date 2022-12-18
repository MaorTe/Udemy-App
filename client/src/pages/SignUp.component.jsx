import styled from 'styled-components';
import AccountBox from './../components/AccountBox/index';

const SignInPageContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const SignUp = () => {
   return (
      <SignInPageContainer>
         <AccountBox />
      </SignInPageContainer>
   );
};

export default SignUp;
