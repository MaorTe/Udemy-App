import { Link } from 'react-router-dom';
// import AddOrRemoveBtn from './AddOrRemoveBtn';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AddOrRemoveBtn from '../AddOrRemoveBtn/AddOrRemoveBtn.component';
const CourseCard = ({
	title,
	poster,
	id,
	type,
	onButtonClick,
	width,
	height,
}) => {
	return (
		<div className="movie-card-container">
			<Link to={`/`}>
				<LazyLoadImage
					alt={'pic'}
					src={poster}
					width={width}
					height={height}
					className="img-select"
				/>
			</Link>
			<div className="font-small">{title}</div>
			<AddOrRemoveBtn id={id} onButtonClick={onButtonClick} />
		</div>
	);
};

export default CourseCard;
