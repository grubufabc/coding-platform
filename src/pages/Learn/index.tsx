import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../api';
import Header from '../../components/Header';
import Card from './Course/Card';
import { Course } from './Course/interfaces/Course';

const Learn: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	React.useEffect(() => {
		const getCourses = async () => {
			setLoading(true);
			const response = await axios.get(`${API_URL}/courses`);
			const courses = response.data as Course[];
			setLoading(false);
			setCourses(courses.filter((course) => course.visible));
		};
		getCourses();
	}, []);

	return (
		<React.Fragment>
			<Header />
			<div className="m-5">
				<h1 className="mb-5">Cursos</h1>
				{loading && (
					<div className="d-flex align-items-center">
						<strong>Carregando cursos...</strong>
						<div
							className="spinner-border ms-5"
							role="status"
							aria-hidden="true"
						></div>
					</div>
				)}
				
				<div className="row gy-4">
					{courses.map((course, index) => (
						<div className="col-3">
							<Card key={index} course={course} />
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Learn;
