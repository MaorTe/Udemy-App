/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import * as S from './AddCourse.style';
import { Marginer } from '../../components/marginer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addCourseError, addCourseStatus, addCourse } from '../../features/courses/coursesSlice';

const AddCourse = () => {
   const dispatch = useDispatch();
   const [user, setUser] = useState();

   const courseStatus = useSelector(addCourseStatus);
   const error = useSelector(addCourseError);

   const [courseInfo, setCourseInfo] = useState({
      courseImage: '',
      courseName: '',
      courseDescription: '',
      tag: '',
   });
   //    useEffect(() => {
   //       const fetchUser = async () => {
   //          try {
   //             const token = localStorage.getItem('token');
   //             const { data } = await api.get('/users/me', {
   //                headers: { Authorization: token },
   //             });
   //             setUser(data);
   //          } catch (e) {
   //             console.log(e.message);
   //          }
   //       };
   //       fetchUser();
   //    }, []);

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
         <S.SubmitButton type="submit" onClick={() => addCourse()}>
            Create Course
         </S.SubmitButton>
      </S.BoxContainer>
   );
};
export default AddCourse;
