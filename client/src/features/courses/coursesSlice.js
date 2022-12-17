import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../API/api';

const initialState = {
   courses: [],
   status: 'idle',
   error: null,
};

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

// state slice
const coursesSlice = createSlice({
   name: 'courses',
   initialState,
   reducers: {
      courseAdded: {
         reducer(state, action) {
            state.push(action.payload);
         },
         prepare({ courseImage, courseName, courseDescription, tag }) {
            return { payload: { courseImage, courseName, courseDescription, tag } };
         },
      },
      // fetchCourses: {
      //    reducer(state, action) {
      //       state.push(action.payload);
      //    },
      //    prepare({ courseImage, courseName, courseDescription, tag }) {
      //       return { payload: { courseImage, courseName, courseDescription, tag } };
      //    },
      // },
   },
   extraReducers(builder) {
      builder
         .addCase(fetchCourses.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchCourses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
         })
         .addCase(fetchCourses.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(addCourse.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(addCourse.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
         })
         .addCase(addCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export const getCoursesStatus = (state) => state.courses.status;
export const getCoursesError = (state) => state.courses.error;
export const selectAllCourses = (state) => state.courses.courses;

export const addCourseStatus = (state) => state.courses.status;
export const addCourseError = (state) => state.courses.error;

export const { courseAdded } = coursesSlice.actions;

export default coursesSlice.reducer;
