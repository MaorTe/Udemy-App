import React, { useState } from 'react';
import * as S from './AddCourse.style';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../features/courses/coursesActions';
import { ToastContainer, toast } from 'react-toastify';
import Marginer from '../../components/Marginer/Marginer';

const AddCourse = () => {
   const dispatch = useDispatch();

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
      dispatch(addCourse(courseInfo))
         .unwrap()
         .then((res) => {
            toast.success('Successfully added course');
            setCourseInfo({
               courseImage: '',
               courseName: '',
               courseDescription: '',
               tag: '',
            });
         })
         .catch((error) => {
            toast.error('Failed to add course');
         });
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
         <ToastContainer autoClose={2000} />
      </S.BoxContainer>
   );
};
export default AddCourse;
