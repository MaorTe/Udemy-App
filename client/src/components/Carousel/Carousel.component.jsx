import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard.component';
import { useDispatch, useSelector } from 'react-redux';
import {
   getCoursesError,
   getCoursesStatus,
   selectAllCourses,
   fetchCourses,
} from '../../features/courses/coursesSlice';
import { selectAllFavoriteCourses, selectfavCoursesIds } from '../../features/users/usersSlice';
import { fetchUserFavoriteCourses } from '../../features/users/usersActions';
import { getUserStatus } from '../../features/auth/authSlice';

const Carousel = ({ tag, width }) => {
   const dispatch = useDispatch();
   const userStatus = useSelector(getUserStatus);
   const coursesList = useSelector(selectAllCourses);
   const favCourses = useSelector(selectAllFavoriteCourses);
   const favCoursesIds = useSelector(selectfavCoursesIds);
   const coursesStatus = useSelector(getCoursesStatus);
   const error = useSelector(getCoursesError);

   useEffect(() => {
      dispatch(fetchCourses(tag));
   }, [dispatch]);

   useEffect(() => {
      dispatch(fetchUserFavoriteCourses());
   }, [dispatch, favCoursesIds]);

   const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow:
         (width >= 1300 && 4) || (width >= 1000 && width < 1300 && 3) || (width < 1000 && 2),
      slidesToScroll: width < 1000 ? 2 : 3,
      initialSlide: 0,
      arrows: true,
   };

   const carouselContent = () => {
      if (coursesStatus === 'loading' || userStatus === 'loading') {
         return (
            <Slider {...settings} arrows={false}>
               {[0, 1, 2, 3].map((el, i) => (
                  <CourseCard key={i} tag={tag} width={244} height={140} />
               ))}
            </Slider>
         );
      } else if (coursesStatus === 'succeeded') {
         return (
            <Slider {...settings}>
               {coursesList?.map((course) => (
                  <CourseCard
                     key={course._id}
                     tag={tag}
                     course={course}
                     isCourseExists={favCourses?.find((el) => el.courseId._id === course._id)}
                  />
               ))}
            </Slider>
         );
      } else if (coursesStatus === 'failed')
         return <p style={{ color: 'red' }}>{error && 'Something went wrong...'}</p>;
   };

   return <div>{carouselContent()}</div>;
};
export default Carousel;
