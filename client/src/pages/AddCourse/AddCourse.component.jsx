import React, { useState } from 'react';
import * as S from './AddCourse.style';
import { Marginer } from '../../components/Marginer';
import { useSelector } from 'react-redux';
import { addCourse, getCoursesStatus, getCoursesError } from '../../features/courses/coursesSlice';
import { useAuth } from './../../features/auth/useAuth';

const AddCourse = () => {
   const [, , dispatch] = useAuth();

   const courseStatus = useSelector(getCoursesStatus);
   const error = useSelector(getCoursesError);

   //const [addRequestStatus, setAddRequestStatus] = useState('idle');

   const [courseInfo, setCourseInfo] = useState({
      courseImage: '',
      courseName: '',
      courseDescription: '',
      tag: '',
   });

   const canSave = [
      courseInfo.courseImage,
      courseInfo.courseName,
      courseInfo.courseDescription,
      courseInfo.tag,
   ].every(Boolean);

   const addNewCourse = () => {
      dispatch(addCourse(courseInfo));
   };

   const changeHandler = (e) => setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
   return (
      <S.BoxContainer>
         <h1>Add new course</h1>
         <S.FormContainer>
            <S.Input
               value={courseInfo.courseImage}
               name={'courseImage'}
               onChange={changeHandler}
               type="text"
               placeholder="Course image"
               required
            />
            <S.Input
               value={courseInfo.courseName}
               name={'courseName'}
               onChange={changeHandler}
               type="text"
               placeholder="Course name"
            />
            <S.Input
               value={courseInfo.courseDescription}
               name={'courseDescription'}
               onChange={changeHandler}
               type="text"
               placeholder="Course description"
            />
            <S.Input
               value={courseInfo.tag}
               name={'tag'}
               onChange={changeHandler}
               type="text"
               placeholder="Tag"
            />
         </S.FormContainer>
         <Marginer direction="vertical" margin={10} />
         <S.SubmitButton type="submit" disabled={!canSave} onClick={() => addNewCourse()}>
            Create Course
         </S.SubmitButton>
      </S.BoxContainer>
   );
};
export default AddCourse;
