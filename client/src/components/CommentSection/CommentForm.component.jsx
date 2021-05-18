import React from 'react';
import * as S from './CommentSection.style';
// class CommentForm extends React.Component {
const CommentForm = ({ addComment }) => {
	const _handleSubmit = (event) => {
		event.preventDefault(); // prevents page from reloading on submit
		let author = this._author;
		let body = this._body;
		addComment(author.value, body.value);
	};
	return (
		<S.CommentForm onSubmit={this._handleSubmit.bind(this)}>
			<S.CommentFormFields>
				<input
					placeholder="Name"
					required
					ref={(input) => (this._author = input)}></input>
				<br />
				<textarea
					placeholder="Comment"
					rows="4"
					required
					ref={(textarea) => (this._body = textarea)}></textarea>
			</S.CommentFormFields>
			<div className="comment-form-actions">
				<button type="submit">Post Comment</button>
			</div>
		</S.CommentForm>
	);
}; // end CommentForm component
export default CommentForm;
