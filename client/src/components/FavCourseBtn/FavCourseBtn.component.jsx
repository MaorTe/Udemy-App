import React from 'react';
import * as S from './FavCourse.style';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCourse, removeFavoriteCourse } from '../../features/users/usersActions';
import { userStatus } from '../../features/users/usersSlice';
import { getUserStatus } from '../../features/auth/authSlice';

const FavCourseBtn = ({ id, isCourseExist }) => {
   const dispatch = useDispatch();
   const isLoading = useSelector(getUserStatus);
   const isLoadingUser = useSelector(userStatus);

   const courseButtonHandler = () => {
      isCourseExist ? dispatch(removeFavoriteCourse(id)) : dispatch(addFavoriteCourse(id));
   };

   return (
      <S.FavCourseBtn>
         <S.CardBtn
            className="btn third"
            disabled={isLoading === 'loading' || isLoadingUser === 'loading'}
            onClick={() => courseButtonHandler()}>
            {isCourseExist ? 'Remove course' : 'Add course'}
         </S.CardBtn>
      </S.FavCourseBtn>
   );
};

export default FavCourseBtn;
