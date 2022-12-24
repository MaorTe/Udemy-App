import { createSlice } from '@reduxjs/toolkit';
import { addVideo, fetchVideos } from './videoActions';

const initialState = {
   videos: [],
   status: 'idle',
   error: null,
};

// state slice
const videosSlice = createSlice({
   name: 'videos',
   initialState,
   reducers: {
      resetVideos: (state) => initialState,
   },
   extraReducers(builder) {
      builder
         .addCase(addVideo.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(addVideo.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.videos.push(action.payload);
         })
         .addCase(addVideo.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(fetchVideos.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchVideos.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.videos = action.payload;
         })
         .addCase(fetchVideos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export const videosStatus = (state) => state.videos.status;
export const videosError = (state) => state.videos.error;
export const selectAllVideos = (state) => state.videos.videos;

export const { resetVideos } = videosSlice.actions;

export default videosSlice.reducer;
