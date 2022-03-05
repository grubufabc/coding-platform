import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../../Learn/Course/interfaces/Course';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from './Modal';

interface CourseDisplayProps {
	course: Course;
	deleteCourse: (course: Course) => Promise<void>;
	loading: boolean;
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({
	course,
	deleteCourse,
	loading,
}) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const countItems = (course: Course): number => {
		return course.chapters.reduce((acc, chapter) => {
			return acc + chapter.content.length;
		}, 0);
	};

	const handleDeleteCourse = () => {
		setModalOpen(true);
	};

	return (
		<div className="card d-flex flex-row justify-content-between px-5 py-3 mb-2">
			<div>
				<h1>{course.title}</h1>
			</div>

			<Modal
				open={modalOpen}
				setOpen={setModalOpen}
				title={`Excluir curso ${course.title}`}
				body={`Ao clicar em confirmar, o curso ${course.title} será excluído permanentemente.`}
				actionConfirm={() => deleteCourse(course)}
			/>

			<div className="d-flex align-items-center">
				<div className="text-center">
					<span className="h4">{course.chapters.length}</span>
					<br />
					<small className="text-muted">Capítulos</small>
				</div>
			</div>
			<div className="d-flex align-items-center">
				<div className="text-center">
					<span className="h4">{countItems(course)}</span>
					<br />
					<small className="text-muted">Itens</small>
				</div>
			</div>
			<div className="d-flex align-items-center">
				<div className="text-center">
					<div className="btn-group" role="group">
						<button
							type="button"
							className="btn btn-outline-danger border-0"
							onClick={handleDeleteCourse}
							disabled={loading}
						>
							<TrashIcon />
						</button>
						<Link
							to={`${course._id}`}
							className="btn btn-outline-dark border-0"
						>
							<PencilIcon />
						</Link>
						<div className="form-check form-switch d-flex align-items-center ms-5">
							<input className="form-check-input p-0 my-0" type="checkbox" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDisplay;
