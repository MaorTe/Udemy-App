/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import * as S from './Video.style';
import { useLocation, useParams } from 'react-router';
import Comment from '../../components/Comment/Comment.component';
import VideoMenu from './../../components/VideoMenuBar/VideoMenu.component';

import { useSelector } from 'react-redux';
import {
   fetchVideos,
   selectAllVideos,
   // videosError,
   videosStatus,
   selectVideoId,
} from '../../features/videos/videosSlice';
import {
   addComment,
   editComment,
   fetchComments,
   deleteComment,
} from '../../features/comments/commentActions';
import {
   commentsError,
   commentsStatus,
   selectAllComments,
} from '../../features/comments/commentsSlice';
import { useAuth } from './../../features/auth/useAuth';

const Video = () => {
   const initialVideoId = useSelector(selectVideoId);
   const videosList = useSelector(selectAllVideos);
   const videoStatus = useSelector(videosStatus);
   // const videoError = useSelector(videosError);

   const commentsList = useSelector(selectAllComments);
   const commentStatus = useSelector(commentsStatus);
   const commentError = useSelector(commentsError);

   const { courseDesc } = useLocation().state;
   const { courseId } = useParams();

   const [showVideo, setShowVideo] = useState('');
   const [videoId, setVideoId] = useState(null);
   const [newComment, setNewComment] = useState('');

   const [user, , dispatch] = useAuth();

   //fetch videos of the chosen course
   useEffect(() => {
      if (courseId && videoStatus === 'idle') {
         dispatch(fetchVideos(courseId));
      }
   }, [courseId]);

   //---------------Get comment---------------
   useEffect(() => {
      if (videoStatus === 'succeeded') {
         dispatch(fetchComments(videoId));
         setVideoId(videoId || initialVideoId);
      }
   }, [videoId, initialVideoId, commentsList?.length > 0]);

   //---------------Add new comment---------------
   const addNewComment = async () => {
      dispatch(addComment({ newComment, videoId }));
   };

   //---------------Edit comment---------------
   const editUserComment = async (commentId, content) => {
      dispatch(editComment({ videoId, content, commentId }));
   };

   //---------------delete comment---------------
   const deleteUserComment = async (commentId) => {
      dispatch(deleteComment({ videoId, commentId }));
   };

   const showNewVideo = (video) => {
      setVideoId(video._id);
      setShowVideo(video.videoLink);
   };

   const commentsContent = () => {
      if (commentStatus === 'loading') {
         return <div className="loader">Loading...</div>;
      } else if (commentStatus === 'succeeded') {
         return commentsList?.map((comment) => (
            <Comment
               key={comment._id}
               comment={comment}
               userId={user._id}
               editComment={editUserComment}
               deleteComment={deleteUserComment}
            />
         ));
      } else if (commentStatus === 'failed') {
         return <p style={{ color: 'red' }}>{commentError && 'Something went wrong...'}}</p>;
      } else {
         return <div style={{ color: 'red' }}> Error occured </div>;
      }
   };

   const videoComments = () => (
      <S.CommentContainer>
         <S.CommentsWrapper>{user ? commentsContent() : ''}</S.CommentsWrapper>
         {!user && <p>Comments only available while signed in</p>}
         <S.Commentbody
            cols="30"
            rows="2"
            draggable="false"
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? 'Add new comment' : ''}
            disabled={!user ? true : false}
         />
         <S.PostCommentBtn onClick={addNewComment} disabled={!user ? true : false} user={user}>
            Post Comment
         </S.PostCommentBtn>
      </S.CommentContainer>
   );

   const videoContainer = () => (
      <S.VideoPageContainer>
         {user ? (
            <ReactPlayer
               width={window?.innerWidth < 520 ? window.innerWidth : '100%'}
               height={window?.innerWidth < 520 ? window.innerWidth - 33 : '60vh'}
               url={showVideo || videosList[0]?.videoLink}
               muted={false}
               playing={false}
               controls={true}
               config={{
                  youtube: { playerVars: { origin: 'https://www.youtube.com' } },
               }}></ReactPlayer>
         ) : (
            <S.UserLoginMessage>Please sign in to see content</S.UserLoginMessage>
         )}
      </S.VideoPageContainer>
   );

   const courseContent = () => (
      <S.VideosMenuContainer containerHeight={'60vh'}>
         <S.videosMenuTitle>Course content</S.videosMenuTitle>
         {user ? (
            videosList.map((video) => (
               <div key={videosList._id + video.videoTitle}>
                  <S.VideoLinkBtn onClick={() => showNewVideo(video)}>
                     {video.videoTitle}
                  </S.VideoLinkBtn>
               </div>
            ))
         ) : (
            <p style={{ textAlign: 'center' }}>Course content only available while signed in</p>
         )}
         {user && user.userRole === 'admin' && (
            <S.NavLink to={`/Courses/Videos/AddVideo/${courseId}`}>
               <h3>Add new videos</h3>
            </S.NavLink>
         )}
      </S.VideosMenuContainer>
   );

   const courseAbout = () => (
      <S.LowerPageContainer>
         <h2
            style={{
               borderBottom: '1px solid black',
               paddingBottom: '5px',
               margin: '10px 0',
            }}>
            About this course
         </h2>
         <p
            style={{
               width: '80%',
               marginBottom: '1rem',
            }}>
            {courseDesc}
         </p>
      </S.LowerPageContainer>
   );

   const findVideoTitle = () => {
      const found = videosList.find((video) => videoId === video._id);
      return found?.videoTitle;
   };
   return window.innerWidth < 650 ? (
      <>
         <h2
            style={{
               background: 'black',
               color: 'white',
               textAlign: 'center',
               padding: '15px 2px',
            }}>
            {findVideoTitle()}
         </h2>
         {user ? (
            videoContainer()
         ) : (
            <div style={{ height: '220px' }}>
               <S.UserLoginMessage>Please sign in to see content</S.UserLoginMessage>
            </div>
         )}
         <VideoMenu
            videoComments={videoComments}
            courseContent={courseContent}
            courseAbout={courseAbout}
         />
      </>
   ) : (
      <S.UpperPageContainer>
         {videoComments()}
         {videoContainer()}
         {courseContent()}
         {courseAbout()}
      </S.UpperPageContainer>
   );
};
export default Video;
