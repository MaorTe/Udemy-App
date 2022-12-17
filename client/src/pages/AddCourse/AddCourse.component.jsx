/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import * as S from './AddCourse.style';
import { Marginer } from '../../components/marginer';
import { useSelector } from 'react-redux';
import { addCourseError, addCourseStatus, addCourse } from '../../features/courses/coursesSlice';
import { useAuth } from './../../features/auth/useAuth';

const AddCourse = () => {
   const [user, , dispatch] = useAuth();

   const courseStatus = useSelector(addCourseStatus);
   const error = useSelector(addCourseError);

   const [courseInfo, setCourseInfo] = useState({
      courseImage: '',
      courseName: '',
      courseDescription: '',
      tag: '',
   });

   const canSave =
      [
         courseInfo.courseImage,
         courseInfo.courseName,
         courseInfo.courseDescription,
         courseInfo.tag,
      ].every(Boolean) && courseStatus === 'idle';

   const addCourse = async () => {
      //  try {
      //     const token = localStorage.getItem('token');
      //     const data = await api.post('/courses/addcourse', courseInfo, {
      //        headers: { Authorization: token },
      //     });
      //  } catch (e) {
      //     console.log(e.message);
      //  }
      if (courseStatus === 'idle') {
         dispatch(addCourse(courseInfo));
      }
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
         <S.SubmitButton type="submit" disabled={!canSave} onClick={() => addCourse()}>
            Create Course
         </S.SubmitButton>
      </S.BoxContainer>
   );
};
export default AddCourse;
