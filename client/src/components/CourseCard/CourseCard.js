import { Link } from 'react-router-dom';
// import AddOrRemoveBtn from './AddOrRemoveBtn';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AddOrRemoveBtn from '../AddOrRemoveBtn/AddOrRemoveBtn.component';
import api from '../../API/api';
const CourseCard = ({
	// title,
	// poster,
	// id,
	// type,
	// desc,
	onButtonClick,
	width,
	height,
	course,
}) => {
	// console.log(poster);
	console.log(course);
	// const addCourse = async () => {
	// 	try {
	// 		const localData = JSON.parse(localStorage.getItem('localData'));
	// 		const token = localData.find((el) => el.token);

	// 		await api.post('/users/addcourse', {
	// 			headers: { Authorization: token.token },
	// 			data: { id },
	// 		});
	// 	} catch (e) {
	// 		console.log(e.message);
	// 	}
	// };
	return (
		<div className="movie-card-container">
			<Link to={`/`}>
				<LazyLoadImage
					alt={'pic'}
					src={course.courseImage}
					width={width}
					height={height}
					className="img-select"
				/>
			</Link>
			<div className="font-small">{course.courseName}</div>
			<div className="font-small">{course.courseDescription}</div>
			<AddOrRemoveBtn id={course._id} />
		</div>
	);
};

export default CourseCard;
