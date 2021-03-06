import { Link, useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AddOrRemoveBtn from '../AddOrRemoveBtn/AddOrRemoveBtn.component';
import { useEffect, useState } from 'react';
import * as S from './CourseCard.style';
const CourseCard = ({ onButtonClick, width, height, course, coursesListId }) => {
   const [isCourseExist, setIsCourseExist] = useState(null);
   useEffect(() => {
      const checkIfCourseExists = () => {
         const isExist = coursesListId && coursesListId.find((el) => el === course._id);
         setIsCourseExist(!!isExist);
      };
      checkIfCourseExists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [coursesListId]);
   const { location } = useHistory();
   const type = location.pathname.slice(1);

   return (
      course && (
         <>
            {((type === 'Courses' && !isCourseExist) || type === '') && (
               <S.CardWrapper>
                  <Link
                     to={{
                        pathname: `/Courses/${course.courseName}/Videos/${course._id}`,
                        state: {
                           courseDesc: course.courseDescription,
                        },
                     }}>
                     <LazyLoadImage
                        alt={'picture'}
                        src={course.courseImage}
                        width={window?.innerWidth < 520 ? '81%' : width}
                        height={height}
                        className="img-select"
                     />
                  </Link>
                  <S.CourseTitle>{course.courseName}</S.CourseTitle>
                  {/* <div>{course.courseDescription}</div> */}
                  <AddOrRemoveBtn
                     id={course._id}
                     isCourseExist={isCourseExist}
                     setIsCourseExist={setIsCourseExist}
                     type={type}
                  />
               </S.CardWrapper>
            )}
         </>
      )
   );
};

export default CourseCard;
