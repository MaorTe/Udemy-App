import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
import CommentBox from '../../components/CommentSection/CommentBox.component';
import * as S from './Video.style';
import { useLocation, useParams } from 'react-router';
import Comment from '../../components/Comment/Comment.component';

const Video = () => {
	const { courseDesc } = useLocation().state;
	const { courseName, courseId } = useParams();

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
				console.log(videosList);
				console.log(videoId);
			} catch (e) {
				console.log(e.message);
			}
		};
		courseId && fetchVideos();
	}, [courseId]);

	//---------------Get comment---------------
	useEffect(() => {
		const getComment = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get(`comments/${videoId}`, {
					headers: { Authorization: token },
				});

				setComments(data);
				console.log(comments);
				//get the correct comment and set to state
				// setCommentId(comments[0]._id);
			} catch (e) {
				console.log(e.message);
			}
		};
		videoId && getComment();
	}, [videoId]);

	//---------------Add new comment---------------
	const addNewComment = async () => {
		try {
			const token = localStorage.getItem('token');
			const { data } = await api.post(
				`comments/newcomment`,
				{ content: 'comment body1', videoId: videoId },
				{
					headers: { Authorization: token },
				}
			);
			// setState(data);
			// console.log(state);
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
				}
			);
			setComments((prev) => {
				const data = [...prev];
				const foundComment = data.find((item) => item._id === commentId);
				foundComment.content = content;
				return data;
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	//---------------delete comment---------------
	const deleteComment = async (commentId) => {
		try {
			const token = localStorage.getItem('token');
			// setCommentId(comments[0]._id);
			// console.log(commentId);
			const { data } = await api.patch(
				`comments/${videoId}`,
				{ commentId },
				{
					headers: { Authorization: token },
				}
			);
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	};
	const showNewVideo = (video) => {
		setVideoId(video._id);
		setShowVideo(video.videoLink);
	};

	return (
		<S.UpperPageContainer>
			{/* // <div> */}
			{/* --------Video Player & Video links-------- */}
			<S.CommentContainer>
				<S.Commentbody
					cols="30"
					rows="2"
					draggable="false"
					onChange={(e) => setState(e.target.value)}
					placeholder="Add new comment"
				/>
				<button onClick={addNewComment}>Post Comment</button>
				{comments.map((comment) => (
					<Comment
						comment={comment}
						userId={user._id}
						editComment={editComment}
					/>
				))}
			</S.CommentContainer>
			<S.VideoPageContainer>
				{user ? (
					// <S.PlayerWrapper>
					<ReactPlayer
						// fluid={true}
						width={'100%'}
						height={'60vh'}
						url={
							showVideo || (videosList.length > 0 && videosList[0].videoLink)
						}
						muted={false}
						playing={false}
						controls={true}></ReactPlayer>
				) : (
					// </S.PlayerWrapper>
					'Please Login'
				)}
			</S.VideoPageContainer>
			<S.VideosMenuContainer containerHeight={'60vh'}>
				<S.videosMenuTitle>Course content</S.videosMenuTitle>
				{videosList.map((video) => (
					<div key={videosList._id}>
						<button onClick={() => showNewVideo(video)}>
							{video.videoTitle}
						</button>
					</div>
				))}
				{user && user.userRole === 'admin' && (
					<S.NavLink to={`/Courses/Videos/AddVideo/${courseId}`}>
						<h3>Add new videos</h3>
					</S.NavLink>
				)}
			</S.VideosMenuContainer>

			{/* --------Comments & About-------- */}
			<S.LowerPageContainer>
				<h2>About this course</h2>
				{courseDesc}
			</S.LowerPageContainer>
		</S.UpperPageContainer>
		// </div>
	);
};
export default Video;
