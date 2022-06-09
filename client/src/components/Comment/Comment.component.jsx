import React, { useState } from 'react';
import * as S from './Comment.style';

const truncate = (input, num) =>
	input.length > num ? `${input.substring(0, num)}...` : input;

const Comment = ({ comment, userId, editComment, deleteComment }) => {
	const [editable, setEditable] = useState(false);
	const [content, setContent] = useState(comment.content);
	const controls = () => {
		return (
			<div>
				{!editable && (
					<S.IconsContainer>
						<S.EditIcon
							className="far fa-edit"
							onClick={() => setEditable((prev) => !prev)}></S.EditIcon>
						<S.DeleteIcon
							className="far fa-trash-alt"
							onClick={handleDelete}></S.DeleteIcon>
					</S.IconsContainer>
				)}
				{editable && (
					<S.IconsContainer>
						<S.SaveIcon
							className="fas fa-check"
							onClick={handleEdit}></S.SaveIcon>
						<S.CancelIcon
							className="fas fa-times"
							onClick={() => setEditable((prev) => !prev)}></S.CancelIcon>
						{/* <button onClick={handleEdit}>Save</button>
							<button onClick={() => setEditable((prev) => !prev)}>
								Cancel
							</button> */}
					</S.IconsContainer>
				)}
			</div>
		);
		// }
		// return null;
	};
	const handleDelete = async () => {
		await deleteComment(comment._id);
	};
	const handleEdit = async () => {
		await editComment(comment._id, content);
		setEditable((prev) => !prev);
	};
	return (
		<S.CommentWrapper>
			<img
				// src={`/users/${comment.owner._id}/avatar?v=${Date.now()}`}
				src={`/users/${comment.owner._id}/avatar?v=${Date.now()}`}
				alt="avatar"
				width="100"
			/>
			<S.CommentText>
				<S.Meta>{comment.owner.name}</S.Meta>
				{!editable && (
					<p title={comment.content}>{truncate(comment.content, 120)}</p>
				)}
				{editable && (
					<S.Commentbody
						cols="30"
						rows="2"
						draggable="false"
						value={content}
						onChange={(e) => setContent(e.target.value)}></S.Commentbody>
				)}
				{comment.owner._id === userId && controls()}
			</S.CommentText>
		</S.CommentWrapper>
	);
};
export default Comment;
