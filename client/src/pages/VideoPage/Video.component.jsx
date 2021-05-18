import React, { useEffect, useState } from 'react';
import api from '../../API/api';
import ReactPlayer from 'react-player';
// import * as S from './Video.style';
import CommentBox from '../../components/CommentSection/CommentBox.component';
import * as S from './Video.style';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Video = () => {
	const { courseDesc } = useLocation().state;
	const { courseName, courseId } = useParams();

	const [user, setUser] = useState('');
	const [showVideo, setShowVideo] = useState('');
	const [videosList, setVideosList] = useState([]);
	const [videoId, setVideoId] = useState(null);
	const [comments, setComments] = useState('');
	const [state, setState] = useState('');
	const [commentId, setCommentId] = useState(null);
	const [commentState, setCommentState] = useState(false);
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
		fetchVideos();
	}, []);

	//---------------Get comment---------------
	useEffect(() => {
		const getComment = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await api.get(`comments/${videoId}`, {
					headers: { Authorization: token },
				});
				setComments(data);
				//get the correct commend and set to state
				setCommentId(comments[0]._id);
				console.log(comments);
			} catch (e) {
				console.log(e.message);
			}
		};
		getComment();
	}, videoId);

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
	const editComment = async () => {
		try {
			const token = localStorage.getItem('token');
			setCommentId(comments[0]._id);
			console.log(commentId);
			const { data } = await api.patch(
				`comments/${videoId}`,
				{ content: 'updated comment body', commentId: commentId },
				{
					headers: { Authorization: token },
				}
			);
			setCommentState(false);
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	};

	//---------------delete comment---------------
	const deleteComment = async () => {
		try {
			const token = localStorage.getItem('token');
			setCommentId(comments[0]._id);
			console.log(commentId);
			const { data } = await api.patch(
				`comments/${videoId}`,
				{ content: 'updated comment body', commentId: commentId },
				{
					headers: { Authorization: token },
				}
			);
			setCommentState(false);
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	};
	const showNewVideo = (video) => {
		setVideoId(video._id);
		setShowVideo(video.videoLink);
	};
	const changeHandler = (e) => setState({ [e.target.name]: e.target.value });
	return (
		<div>
			{/* --------Video Player & Video links-------- */}
			<S.UpperPageContainer>
				<S.VideoPageContainer>
					{/* <S.VideoContainer> */}
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
					{/* </S.VideoContainer> */}
				</S.VideoPageContainer>
				<S.VideosMenuContainer containerHeight={'60vh'}>
					<S.videosMenuTitle>Course content</S.videosMenuTitle>
					{videosList.length > 0 ? (
						videosList.map((video) => (
							<div key={videosList._id}>
								<button onClick={() => showNewVideo(video)}>
									{video.videoTitle}
								</button>
							</div>
						))
					) : (
						<S.NavLink to={`/Courses/Videos/AddVideo/${courseId}`}>
							<h3>Add new videos</h3>
						</S.NavLink>
					)}
				</S.VideosMenuContainer>
			</S.UpperPageContainer>

			{/* --------Comments & About-------- */}
			<S.LowerPageContainer>
				<S.CommentContainer>
					<h2>About this course</h2>
					{courseDesc}
				</S.CommentContainer>
				<S.CommentContainer>
					{/* <CommentBox></CommentBox> */}
					{comments.length && (
						<img
							src={`/users/${user._id}/avatar?v=${Date.now()}`}
							alt="user"
							width="100"
						/>
					)}
					{comments.length && (
						<>
							<label>{comments.map((el) => el.owner.name)}</label>
							<input
								value={comments.map((el) => el.content)}
								name={'name'}
								// onChange={changeHandler}
								type="text"
								placeholder="get new comment"
								required
							/>
						</>
					)}
					<input
						// value={'userInfo.name'}
						name={'name'}
						onChange={changeHandler}
						type="text"
						placeholder="Add new comment"
						required
					/>
					<button onClick={addNewComment}>Post Comment</button>
					{!commentState && (
						<button onClick={() => setCommentState(true)}>Edit Comment</button>
					)}
					{commentState && (
						<>
							<button onClick={editComment}>Save Changes</button>
							<button onClick={() => setCommentState(false)}>
								Cancel Changes
							</button>
						</>
					)}
					<button onClick={deleteComment}>Delete Comment</button>
				</S.CommentContainer>
			</S.LowerPageContainer>
		</div>
	);
};
export default Video;
