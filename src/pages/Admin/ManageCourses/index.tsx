import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../api';
import { Course } from '../../Learn/Course/interfaces/Course';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

declare var bootstrap: any;

interface ModalBootstrap {
	show: () => void;
	hide: () => void;
}

interface ModalProps {
	title: string;
	body: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	actionConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
	open,
	setOpen,
	title,
	body,
	actionConfirm,
}) => {
	const modalRef = React.useRef(null);
	const [modal, setModal] = useState<ModalBootstrap>();

	React.useEffect(() => {
		if (modalRef) {
			setModal(new bootstrap.Modal(modalRef.current));
		}
	}, [modalRef]);

	React.useEffect(() => {
		if (!modal) return;
		if (open) modal.show();
		else modal.hide();
	}, [open, modal]);

	return (
		<div
			ref={modalRef}
			className="modal"
			data-bs-backdrop="static"
			tabIndex={-1}
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => setOpen(false)}
						/>
					</div>
					<div className="modal-body">
						<p>{body}</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-danger"
							onClick={() => {
								actionConfirm();
								setOpen(false);
							}}
						>
							Excluir
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

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
							<input
								className="form-check-input p-0 my-0"
								type="checkbox"
								id="flexSwitchCheckDefault"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ManageCourses: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const getCourses = async () => {
		setLoading(true);
		const response = await axios.get(`${API_URL}/courses`);
		const courses = response.data as Course[];
		setLoading(false);
		setCourses(courses);
	};

	React.useEffect(() => {
		getCourses();
	}, []);

	const handleDeleteCourse = async (course: Course) => {
		setLoading(true);
		await axios.delete(`${API_URL}/courses/${course._id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		setLoading(false);
		getCourses();
	};

	return (
		<div>
			<h1 className="mb-5">Gerenciar Cursos</h1>
			{courses.map((course, index) => (
				<CourseDisplay
					key={index}
					course={course}
					deleteCourse={handleDeleteCourse}
					loading={loading}
				/>
			))}
		</div>
	);
};

export default ManageCourses;
