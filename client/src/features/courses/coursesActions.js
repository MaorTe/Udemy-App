import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../API/api';

// Thunk functions
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (tag) => {
   const response = await axiosInstance.get('/courses/:tag', {
      params: { tag },
   });
   return response.data;
});

export const addCourse = createAsyncThunk('courses/addNewCourse', async (courseInfo) => {
   const response = await axiosInstance.post('/courses/addcourse', courseInfo);
   return response.data;
});
