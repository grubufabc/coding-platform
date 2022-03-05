import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../../api';
import { Course } from '../../Learn/Course/interfaces/Course';
import CourseDisplay from './CourseDisplay';

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

	return (
		<div>
			<h1 className="mb-5">Gerenciar Cursos</h1>
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
