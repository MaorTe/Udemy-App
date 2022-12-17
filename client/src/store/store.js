import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import coursesReducer from '../features/courses/coursesSlice';
import usersReducer from '../features/users/usersSlice';
import videosReducer from './../features/videos/videosSlice';
import commentsReducer from './../features/comments/commentsSlice';

export const store = configureStore({
   reducer: {
      auth: authReducer,
      users: usersReducer,
      courses: coursesReducer,
      videos: videosReducer,
      comments: commentsReducer,
   },
});
