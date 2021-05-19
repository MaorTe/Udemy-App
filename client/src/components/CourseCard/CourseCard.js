import { Link, useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AddOrRemoveBtn from '../AddOrRemoveBtn/AddOrRemoveBtn.component';
import api from '../../API/api';
import { useEffect, useState } from 'react';
const CourseCard = ({
	onButtonClick,
	width,
	height,
	course,
	coursesListId,
}) => {
	const [isCourseExist, setIsCourseExist] = useState(null);
	useEffect(() => {
		const checkIfCourseExists = () => {
			const isExist =
				coursesListId && coursesListId.find((el) => el === course._id);
			setIsCourseExist(!!isExist);
		};
		checkIfCourseExists();
	}, [coursesListId]);
	const { location } = useHistory();
	const type = location.pathname.slice(1);
	useEffect(() => {
		console.log(isCourseExist);
	}, [isCourseExist]);

	return (
		<>
			{((type === 'Courses' && !isCourseExist) || type === '') && (
				<div className="movie-card-container">
					<Link
						to={{
							pathname: `/Courses/${course.courseName}/Videos/${course._id}`,
							state: {
								courseDesc: course.courseDescription,
							},
						}}>
						<LazyLoadImage
							alt={'picture'}
							src={course.courseImage}
							width={width}
							height={height}
							className="img-select"
						/>
					</Link>
					<div className="font-small">{course.courseName}</div>
					<div className="font-small">{course.courseDescription}</div>
					<AddOrRemoveBtn
						id={course._id}
						isCourseExist={isCourseExist}
						setIsCourseExist={setIsCourseExist}
						type={type}
					/>
				</div>
			)}
		</>
	);
};

export default CourseCard;
