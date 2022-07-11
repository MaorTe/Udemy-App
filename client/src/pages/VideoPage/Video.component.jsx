/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
import * as S from './Video.style';
import { useLocation, useParams } from 'react-router';
import Comment from '../../components/Comment/Comment.component';
import VideoMenu from './../../components/VideoMenuBar/VideoMenu.component';

const getComments = async (videoId) => {
   try {
      const token = localStorage.getItem('token');
      const { data } = await api.get(`comments/${videoId}`, {
         headers: { Authorization: token },
      });
      return data;
   } catch (e) {
      console.log(e.message);
   }
};

const Video = () => {
   const { courseDesc } = useLocation().state;
   const { courseId } = useParams();

   const [user, setUser] = useState('');
   const [showVideo, setShowVideo] = useState('');
   const [videosList, setVideosList] = useState([]);
   const [videoId, setVideoId] = useState(null);
   const [comments, setComments] = useState([]);
   const [state, setState] = useState('');
   // const [commentId, setCommentId] = useState(null);

   //fetch user to check for token
   useEffect(() => {
      const fetchUser = async () => {
         try {
            const token = localStorage.getItem('token');
            const { data } = await api.get('/users/me', {
               headers: { Authorization: token },
            });
            setUser(data);
         } catch (e) {
            console.log(e.message);
         }
      };
      fetchUser();
   }, []);

   //fetch videos of the chosen course
   useEffect(() => {
      const fetchVideos = async () => {
         try {
            const token = localStorage.getItem('token');
            const { data } = await api.get(`users/courses/video/${courseId}`, {
               headers: { Authorization: token },
            });
            setVideosList(data);
            setVideoId(data[0]._id);
         } catch (e) {
            console.log(e.message);
         }
      };
      courseId && fetchVideos();
   }, [courseId]);

   //---------------Get comment---------------
   useEffect(() => {
      const fetchComments = async () => {
         const data = await getComments(videoId);
         setComments(data);
      };
      if (videoId) {
         fetchComments();
      }
   }, [videoId]);

   //---------------Add new comment---------------
   const addNewComment = async () => {
      try {
         const token = localStorage.getItem('token');
         const { data } = await api.post(
            `comments/newcomment`,
            { content: state, videoId: videoId },
            {
               headers: { Authorization: token },
            },
         );

         // setComments((prevComments) => [...prevComments, data]);
         setComments(data);
      } catch (e) {
         console.log(e.message);
      }
   };

   //---------------Edit comment---------------
   const editComment = async (commentId, content) => {
      try {
         const token = localStorage.getItem('token');
         const { data } = await api.patch(
            `comments/${videoId}`,
            { content, commentId },
            {
               headers: { Authorization: token },
            },
         );
         setComments(data);
         // setComments((prev) => {
         // 	const data = [...prev];
         // 	const foundComment = data.find((item) => item._id === commentId);
         // 	foundComment.content = content;
         // 	return data;
         // });
      } catch (e) {
         console.log(e.message);
      }
   };

   //---------------delete comment---------------
   const deleteComment = async (commentId) => {
      try {
         const token = localStorage.getItem('token');
         const { data } = await api.delete(`comments/${videoId}/${commentId}`, {
            headers: { Authorization: token },
         });

         await setComments(data);
      } catch (e) {
         console.log(e.message);
      }
   };

   const showNewVideo = (video) => {
      setVideoId(video._id);
      setShowVideo(video.videoLink);
   };

   const videoComments = () => (
      <S.CommentContainer>
         <S.CommentsWrapper>
            {comments.map((comment) => (
               <Comment
                  key={comment._id}
                  comment={comment}
                  userId={user._id}
                  editComment={editComment}
                  deleteComment={deleteComment}
               />
            ))}
         </S.CommentsWrapper>
         <S.Commentbody
            cols="30"
            rows="2"
            draggable="false"
            onChange={(e) => setState(e.target.value)}
            placeholder="Add new comment"
         />
         <S.PostCommentBtn onClick={addNewComment}>Post Comment</S.PostCommentBtn>
      </S.CommentContainer>
   );

   const videoContainer = () => (
      <S.VideoPageContainer>
         {user ? (
            <ReactPlayer
               width={window?.innerWidth < 520 ? window.innerWidth : '100%'}
               height={window?.innerWidth < 520 ? window.innerWidth - 33 : '60vh'}
               url={showVideo || (videosList.length > 0 && videosList[0].videoLink)}
               muted={false}
               playing={false}
               controls={true}></ReactPlayer>
         ) : (
            <S.UserLoginMessage>Please sign in to see content</S.UserLoginMessage>
         )}
      </S.VideoPageContainer>
   );

   const courseContent = () => (
      <S.VideosMenuContainer containerHeight={'60vh'}>
         <S.videosMenuTitle>Course content</S.videosMenuTitle>
         {videosList.map((video) => (
            <div key={videosList._id}>
               <S.VideoLinkBtn onClick={() => showNewVideo(video)}>
                  {video.videoTitle}
               </S.VideoLinkBtn>
            </div>
         ))}
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
      user ? (
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
            {videoContainer()}
            <VideoMenu
               videoComments={videoComments}
               courseContent={courseContent}
               courseAbout={courseAbout}
            />
         </>
      ) : (
         <S.UserLoginMessage>Please sign in to see content</S.UserLoginMessage>
      )
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
