import { createSlice } from '@reduxjs/toolkit';
import {
   addFavoriteCourse,
   fetchUserFavoriteCourses,
   fileUpload,
   removeFavoriteCourse,
} from './usersActions';

const initialState = {
   courses: [],
   favCoursesIds: [],
   error: null,
};

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      checkIfCourseExists(state, action) {
         const { courseId, favCourses } = action.payload;
         return favCourses?.find((el) => el.courseId === courseId);
      },
      setfavCoursesIds(state, action) {
         const coursesIds = state.courses.map((course) => course.courseId._id);
         state.favCourses = coursesIds;
      },
      reset: (state) => initialState,
   },
   extraReducers(builder) {
      builder
         .addCase(fetchUserFavoriteCourses.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchUserFavoriteCourses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.courses = action.payload;
            // state.favCourses = action.payload;
         })
         .addCase(fetchUserFavoriteCourses.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(addFavoriteCourse.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(addFavoriteCourse.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.loading = false;
            state.favCourses = payload;
         })
         .addCase(addFavoriteCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(removeFavoriteCourse.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(removeFavoriteCourse.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.loading = false;
            state.favCourses = payload;
         })
         .addCase(removeFavoriteCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(fileUpload.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fileUpload.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.loading = false;
         })
         .addCase(fileUpload.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export const userStatus = (state) => state.users.status;
export const userError = (state) => state.users.error;
export const selectfavCoursesIds = (state) => state.users.favCourses;
export const selectAllFavoriteCourses = (state) => state.users?.courses;

export const { reset, setfavCoursesIds } = usersSlice.actions;

export default usersSlice.reducer;
