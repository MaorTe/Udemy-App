import React, { useState } from 'react';
import * as S from './Comment.style';
const Comment = ({ comment, userId, editComment }) => {
	// console.log(comment);

	const [editable, setEditable] = useState(false);
	const [content, setContent] = useState(comment.content);

	const controls = () => {
		if (comment.owner._id === userId) {
			return (
				<div>
					{!editable && (
						<>
							<button onClick={() => setEditable((prev) => !prev)}>Edit</button>
							<button onClick={editComment}>Delete</button>
						</>
					)}
					{editable && (
						<>
							<button onClick={handleEdit}>Save</button>
							<button onClick={() => setEditable((prev) => !prev)}>
								Cancel
							</button>
						</>
					)}
				</div>
			);
		}
		return null;
	};
	const handleEdit = async () => {
		await editComment(comment._id, content);
		setEditable((prev) => !prev);
	};
	return (
		<S.CommentWrapper>
			<img
				src={`/users/${comment.owner._id}/avatar?v=${Date.now()}`}
				alt="avatar"
				width="100"
			/>
			<div>
				<S.Meta>{comment.owner.name}</S.Meta>
				{!editable && <p>{comment.content}</p>}
				{editable && (
					<S.Commentbody
						cols="30"
						rows="2"
						draggable="false"
						value={content}
						onChange={(e) => setContent(e.target.value)}></S.Commentbody>
				)}
				{controls()}
			</div>
		</S.CommentWrapper>
	);
};
export default Comment;
