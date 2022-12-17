import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as S from './Profile.style';
import { getUserStatus } from './../../features/auth/authSlice';
import useAuth from '../../features/auth/useAuth';
import { fileUpload } from '../../features/users/usersActions';

const Profile = () => {
   const [user, , dispatch] = useAuth();
   const userStatus = useSelector(getUserStatus);
   // const error = useSelector(getUserError);

   const [selectedFile, setSelectedFile] = useState(null);
   const fileInput = useRef(null);

   //upload file
   const fileUploadHandler = async () => {
      dispatch(fileUpload(selectedFile));
      // setSelectedFile(null);
   };

   const userAvatar = () => (
      <S.CardWrapperImg>
         <S.ImageBorder>
            {user && (
               <img
                  src={
                     !selectedFile
                        ? `${process.env.REACT_APP_API_RENDER_URL || ''}/api/users/${
                             user._id
                          }/avatar?v=${Date.now()}`
                        : URL.createObjectURL(selectedFile)
                  }
                  alt="avatar"
               />
            )}
         </S.ImageBorder>
      </S.CardWrapperImg>
   );

   const userDetails = () => (
      <div key={user._id}>
         <S.FileInput
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            ref={fileInput}
         />
         {window.innerWidth < 650 && userAvatar()}
         <S.UploadBtn onClick={() => fileInput.current.click()}>Upload image</S.UploadBtn>

         <S.SaveBtn onClick={fileUploadHandler}>Save</S.SaveBtn>

         {/* <button onClick={() => deleteFile()}>delete</button> */}
         <S.EmailTitle>Name</S.EmailTitle>
         <S.EmailParagraph>{user.name}</S.EmailParagraph>
         <S.EmailTitle>Age</S.EmailTitle>
         <S.EmailParagraph>{user.age}</S.EmailParagraph>
         <S.EmailTitle>Email</S.EmailTitle>
         <S.EmailParagraph>{user.email}</S.EmailParagraph>
         {/* <img src={`data: image/png;base64,${user[0].avatar}`} alt="" /> */}
      </div>
   );

   const loadUserProfile = () => {
      if (userStatus === 'loading') {
         return <div className="loader">Loading...</div>;
      } else if (userStatus === 'succeeded') {
         return (
            <S.UserInfo>
               <S.InfoTitle>User Profile</S.InfoTitle>
               <S.InfoData>
                  <S.InfoDataContent>{user && userDetails()}</S.InfoDataContent>
               </S.InfoData>
            </S.UserInfo>
         );
      } else if (userStatus === 'failed') {
         return <p style={{ color: 'red' }}>{'Something went wrong...'}</p>;
      }
   };

   return (
      <S.PageContainer>
         <S.PageContent>
            {window.innerWidth > 650 && userAvatar()}

            <S.UserProfileCard>{loadUserProfile()}</S.UserProfileCard>
         </S.PageContent>
      </S.PageContainer>
   );
};
export default Profile;
