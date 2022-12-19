import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../../components/CourseCard/CourseCard.component';
import * as S from './FavCourses.style';
import { fetchUserFavoriteCourses } from '../../features/users/usersActions';
import {
   userError,
   selectAllFavoriteCourses,
   selectfavCoursesIds,
} from '../../features/users/usersSlice';
import { useAuth } from '../../features/auth/useAuth';
import { getUserStatus } from '../../features/auth/authSlice';

const Courses = () => {
   const [, userToken, dispatch] = useAuth();
   const favCourses = useSelector(selectAllFavoriteCourses);
   const favCoursesIds = useSelector(selectfavCoursesIds);
   const usersStatus = useSelector(getUserStatus);
   const error = useSelector(userError);

   useEffect(() => {
      userToken && dispatch(fetchUserFavoriteCourses());
   }, [dispatch, favCoursesIds, userToken]);

   const favoriteCoursesContent = () => {
      if (usersStatus === 'loading') <div class="loader">Loading...</div>;
      else if (usersStatus === 'succeeded') {
         return favCourses.length ? (
            favCourses?.map((course) => (
               <CourseCard key={course._id} course={course.courseId} isCourseExists={true} />
            ))
         ) : (
            <h1>Courses list is empty</h1>
         );
      } else if (usersStatus === 'failed')
         return <p style={{ color: 'red' }}>{error && 'Something went wrong...'}}</p>;
   };

   return <S.GridContainer>{favoriteCoursesContent()}</S.GridContainer>;
};

export default Courses;
