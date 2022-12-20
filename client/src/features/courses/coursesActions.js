import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../API/api';

const userToken = localStorage.getItem('userToken');
// Thunk functions
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (tag) => {
   const response = await api.get('/courses/:tag', {
      params: { tag },
   });
   return response.data;
});

export const addCourse = createAsyncThunk('courses/addNewCourse', async (courseInfo) => {
   const response = await api.post('/courses/addcourse', courseInfo, {
      headers: { Authorization: userToken },
   });
   return response.data;
});
