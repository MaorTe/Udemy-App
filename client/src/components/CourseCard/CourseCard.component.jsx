import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FavCourseBtn from '../FavCourseBtn/FavCourseBtn.component';
import * as S from './CourseCard.style';
import Skeleton from '../Skeleton/Skeleton';
import SkeletonMobile from '../Skeleton/SkeletonMobile';
import React from 'react';
import { isLoggedIn } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const CourseCard = ({ isCourseExists, course }) => {
   const isLogged = useSelector(isLoggedIn);
   return course ? (
      <S.CardWrapper>
         <Link
            to={{
               pathname: `/Courses/${course.courseName}/Videos/${course._id}`,
            }}
            state={{
               courseDesc: course.courseDescription,
            }}>
            <LazyLoadImage
               alt={'picture'}
               src={course.courseImage}
               width={window?.innerWidth < 520 ? '81%' : 244}
               height={140}
               className="img-select"
            />
         </Link>
         <S.CourseTitle>{course.courseName}</S.CourseTitle>
         {isLogged && <FavCourseBtn id={course._id} isCourseExist={!!isCourseExists} />}
      </S.CardWrapper>
   ) : (
      <>
         <S.CardWrapper>
            {window?.innerWidth <= 520 ? <SkeletonMobile /> : <Skeleton />}
         </S.CardWrapper>
      </>
   );
};

export default CourseCard;
