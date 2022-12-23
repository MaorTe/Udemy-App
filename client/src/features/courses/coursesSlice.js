import { createSlice } from '@reduxjs/toolkit';
import { addCourse, fetchCourses } from './coursesActions';

const initialState = {
   courses: [],
   status: 'idle',
   error: null,
};

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
            state.courses.push(action.payload);
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

export const { courseAdded } = coursesSlice.actions;

export default coursesSlice.reducer;
