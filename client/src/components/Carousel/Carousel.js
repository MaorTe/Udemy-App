/* eslint-disable react-hooks/exhaustive-deps */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import api from '../../API/api';

const Carousel = ({ tag, onPictureClick, width }) => {
   const [isLoading, setIsLoading] = useState(true);
   const [coursesList, setCoursesList] = useState([]);
   const [coursesListId, setCoursesListId] = useState(null);
   useEffect(() => {
      const fetchCourses = async () => {
         try {
            const { data } = await api.get('/courses/:tag', {
               params: { tag },
            });
            setCoursesList(data);
         } catch (e) {
            console.log(e.message);
         }
      };
      fetchCourses();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      coursesList.length > 0 && setIsLoading((prev) => !prev);
   }, [coursesList]);

   useEffect(() => {
      const token = localStorage.getItem('token');
      const fetchUser = async () => {
         try {
            const { data } = await api.get('/users/me', {
               headers: { Authorization: token },
            });
            setCoursesListId(data.courses.map((course) => course.courseId));
         } catch (e) {
            console.log(e.message);
         }
      };
      if (token) {
         fetchUser();
      }
   }, [coursesList.length > 0]);

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
   return (
      <div>
         {isLoading ? (
            <Slider {...settings} arrows={false}>
               {[0, 1, 2, 3].map((el, i) => (
                  <CourseCard key={i} tag={tag} width={244} height={140} />
               ))}
            </Slider>
         ) : (
            <Slider {...settings}>
               {coursesList.map((course) => (
                  <CourseCard
                     key={course._id}
                     tag={tag}
                     width={244}
                     height={140}
                     onButtonClick={onPictureClick}
                     course={course}
                     coursesListId={coursesListId}
                  />
               ))}
            </Slider>
         )}
      </div>
   );
};
export default Carousel;
