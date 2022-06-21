import axios from 'axios';
import { useToast } from 'hooks/useToast';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { API_URL } from '../../../api';
import { Course } from '../../Learn/Course/interfaces/Course';
import CourseDisplay from './CourseDisplay';

const PlusCircle = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			fill="currentColor"
			className="bi bi-plus-circle"
			viewBox="0 0 16 16"
		>
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
			<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
		</svg>
	);
};

const ManageCourses: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const { setMessage: ToastSetMessage } = useToast();

	const getCourses = async () => {
		setLoading(true);
		const response = await axios.get(`${API_URL}/courses`);
		const courses = response.data as Course[];
		setLoading(false);
		setCourses(courses);
	};

	React.useEffect(() => {
		if (!courses.length) {
			getCourses();
		}
	}, [courses.length]);

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

	const setVisibility = async (course: Course, visible: boolean) => {
		course.visible = visible;
		setCourses([...courses]);
		await axios.put(`${API_URL}/courses/${course._id}`, course, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	};

	const handleCreateCourse = async () => {
		ToastSetMessage({
			title: 'Criando curso...',
			body: 'Aguarde...',
			icon: '⏳ ',
		});

		const response = await axios.post(
			`${API_URL}/courses`,
			{
				title: 'New Course',
				chapters: [],
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);

		if (response.data && response.data._id) {
			ToastSetMessage({
				title: 'Tudo certo!',
				body: 'Curso criado com sucesso',
				icon: '✅',
			});
			navigate(`/admin/manage-courses/${response.data._id}`);
		} else {
			ToastSetMessage({
				title: 'Erro ao criar curso',
				body: 'Tente novamente mais tarde',
				icon: '❌ ',
			});
		}
	};

	return (
		<div>
			<h1 className="mb-2">Gerenciar Cursos</h1>
			<div className="d-flex justify-content-end mb-3">
				<button
					className="btn btn-outline-dark border-0"
					onClick={() => handleCreateCourse()}
				>
					<PlusCircle />
				</button>
			</div>

			{courses.map((course, index) => (
				<CourseDisplay
					key={index}
					course={course}
					deleteCourse={handleDeleteCourse}
					loading={loading}
					setVisibility={setVisibility}
				/>
			))}
		</div>
	);
};

export default ManageCourses;
