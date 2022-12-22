import { createSlice } from '@reduxjs/toolkit';
import { addComment, fetchComments, editComment, deleteComment } from './commentActions';

const initialState = {
   comments: [],
   status: 'idle',
   error: null,
};

// state slice
const commentsSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {
      resetComments: (state) => initialState,
   },
   extraReducers(builder) {
      builder
         .addCase(fetchComments.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.status = 'succeeded';
         })
         .addCase(fetchComments.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(addComment.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(addComment.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.comments = action.payload;
         })
         .addCase(addComment.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(editComment.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(editComment.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.comments = action.payload;
         })
         .addCase(editComment.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })

         .addCase(deleteComment.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(deleteComment.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.comments = action.payload;
         })
         .addCase(deleteComment.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   },
});

export const commentsStatus = (state) => state.comments.status;
export const commentsError = (state) => state.comments.error;
export const selectAllComments = (state) => state.comments.comments;

export const { resetComments } = commentsSlice.actions;

export default commentsSlice.reducer;
