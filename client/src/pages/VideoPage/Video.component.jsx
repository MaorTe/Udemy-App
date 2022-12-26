import React, { useEffect, useState } from 'react';
import * as S from './Video.style';
import ReactPlayer from 'react-player';
import { useLocation, useParams } from 'react-router';
import Comment from '../../components/Comment/Comment.component';
import VideoMenu from './../../components/VideoMenuBar/VideoMenu.component';
import { useSelector } from 'react-redux';
import { selectAllVideos, videosStatus, resetVideos } from '../../features/videos/videosSlice';
import { fetchVideos } from '../../features/videos/videoActions';
import {
   addComment,
   editComment,
   fetchComments,
   deleteComment,
} from '../../features/comments/commentActions';
import {
   commentsError,
   commentsStatus,
   resetComments,
   selectAllComments,
} from '../../features/comments/commentsSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './../../features/auth/useAuth';

const Video = () => {
   const [user, userToken, dispatch] = useAuth();
   const videosList = useSelector(selectAllVideos);
   const videoStatus = useSelector(videosStatus);

   const commentsList = useSelector(selectAllComments);
   const commentStatus = useSelector(commentsStatus);
   const commentError = useSelector(commentsError);

   const { courseDesc } = useLocation().state;
   const { courseId } = useParams();

   const [showVideo, setShowVideo] = useState('');
   const [videoId, setVideoId] = useState(null);
   const [newComment, setNewComment] = useState('');

   //fetch videos of the chosen course
   useEffect(() => {
      userToken &&
         dispatch(fetchVideos(courseId))
            .unwrap()
            .then((res) => {
               setVideoId(res[0]?._id);
            })
            .catch((error) => {
               console.log(error.code);
            });

      return () => {
         dispatch(resetVideos());
      };
   }, [courseId, dispatch, userToken]);

   //---------------Get comment---------------
   useEffect(() => {
      videoStatus === 'succeeded' && videoId && dispatch(fetchComments(videoId));

      return () => {
         dispatch(resetComments());
      };
   }, [videoId, dispatch, videoStatus]);

   //---------------Add new comment---------------
   const addNewComment = async () => {
      if (!newComment) {
         return toast.success('Comment cant be empty');
      }
      dispatch(addComment({ newComment, videoId }))
         .unwrap()
         .then((res) => {
            toast.success('Successfully added comment');
         })
         .catch((error) => {
            toast.error('Failed to add comment');
         });
   };

   //---------------Edit comment---------------
   const editUserComment = async (commentId, content) => {
      dispatch(editComment({ videoId, content, commentId }))
         .unwrap()
         .then((res) => {
            toast.success('Successfully edited comment');
         })
         .catch((error) => {
            toast.error('Failed to edit comment');
         });
   };

   //---------------delete comment---------------
   const deleteUserComment = async (commentId) => {
      dispatch(deleteComment({ videoId, commentId }))
         .unwrap()
         .then((res) => {
            toast.success('Successfully deleted comment');
         })
         .catch((error) => {
            toast.error('Failed to delete comment');
         });
   };

   const showNewVideo = (video) => {
      setVideoId(video._id);
      setShowVideo(video.videoLink);
   };

   const commentsContent = () => {
      if (commentStatus === 'loading') {
         return <div className="loader">Loading...</div>;
      } else if (commentStatus === 'succeeded' || commentStatus === 'failed') {
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
         return <p style={{ color: 'red' }}>{commentError && 'Something went wrong...'}</p>;
      }
   };

   const videoComments = () => (
      <S.CommentContainer>
         <S.CommentsWrapper>{userToken ? commentsContent() : ''}</S.CommentsWrapper>
         {!user && <p>Comments only available while signed in</p>}
         <S.Commentbody
            cols="30"
            rows="2"
            draggable="false"
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? 'Add new comment' : ''}
            disabled={!user ? true : false}
         />
         <S.PostCommentBtn
            onClick={addNewComment}
            disabled={!newComment || !videoId || !user ? true : false}
            user={user}
            videoId={videoId}
            newComment={newComment}>
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
               controls={true}></ReactPlayer>
         ) : (
            <S.UserAuthMessage>Please sign in to see content</S.UserAuthMessage>
         )}
      </S.VideoPageContainer>
   );

   const courseContent = () => (
      <S.VideosMenuContainer containerHeight={'60vh'}>
         <S.videosMenuTitle>Course content</S.videosMenuTitle>
         {user ? (
            videosList.map((video) => (
               <div key={video._id + video.videoTitle}>
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
      <S.CourseAboutContainer>
         <S.CourseAboutTitle>About this course</S.CourseAboutTitle>
         <S.CourseAboutDesc>{courseDesc}</S.CourseAboutDesc>
      </S.CourseAboutContainer>
   );

   const findVideoTitle = () => {
      const found = videosList.find((video) => videoId === video._id);
      return found?.videoTitle;
   };

   // render mobile or pc version
   return window.innerWidth < 650 ? (
      <>
         <S.VideoTitleMobile>{findVideoTitle()}</S.VideoTitleMobile>
         {user ? (
            videoContainer()
         ) : (
            <div style={{ height: '220px' }}>
               <S.UserAuthMessage>Please sign in to see content</S.UserAuthMessage>
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
         <ToastContainer autoClose={2000} />
      </S.UpperPageContainer>
   );
};
export default Video;
