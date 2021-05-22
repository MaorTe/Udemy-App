/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
import * as S from './Video.style';
import { useLocation, useParams } from 'react-router';
import Comment from '../../components/Comment/Comment.component';

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
				}
			);
			// const commentsTemp = data.map((c) => ({
			// 	...c,
			// 	owner: c.owner?._id
			// 		? c.owner
			// 		: {
			// 				_id: c.owner,
			// 				name: '',
			// 		  },
			// }));
			// // owner: {
			// 	_id: req.user._id,
			// 	name:
			// }

			// console.log(data.owner._id);
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
				}
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

	return (
		<S.UpperPageContainer>
			{/* --------Video Player & Video links-------- */}
			<S.CommentContainer>
				<S.Commentbody
					cols="30"
					rows="2"
					draggable="false"
					onChange={(e) => setState(e.target.value)}
					placeholder="Add new comment"
				/>
				<S.PostCommentBtn onClick={addNewComment}>
					Post Comment
				</S.PostCommentBtn>
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
			</S.CommentContainer>
			<S.VideoPageContainer>
				{user ? (
					<ReactPlayer
						width={'100%'}
						height={'60vh'}
						url={
							showVideo || (videosList.length > 0 && videosList[0].videoLink)
						}
						muted={false}
						playing={false}
						controls={true}></ReactPlayer>
				) : (
					'Please Login'
				)}
			</S.VideoPageContainer>
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

			{/* --------Comments & About-------- */}
			<S.LowerPageContainer>
				<h2>About this course</h2>
				{courseDesc}
			</S.LowerPageContainer>
		</S.UpperPageContainer>
	);
};
export default Video;
