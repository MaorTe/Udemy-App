import React from 'react';
import * as S from './CommentSection.style';
const Comment = ({ author, body }) => {
	const deleteComment = () => {
		alert('-- DELETE Comment Functionality COMMING SOON...');
	};
	return (
		<>
			<S.Comment>
				<p className="comment-header">{author}</p>
				<S.CommentBody>- {body}</S.CommentBody>
				<S.CommentFooter>
					<S.CommentFooterDelete href="/" onClick={deleteComment}>
						Delete Comment
					</S.CommentFooterDelete>
				</S.CommentFooter>
			</S.Comment>
		</>
	);
};
export default Comment;
