import React from 'react';
import ChapterVisualizer from './ChapterVisualizer';
import { CourseProvider, useCourse } from './useCourse';

const FileCheckIcon: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			fill="currentColor"
			className="bi bi-file-earmark-check"
			viewBox="0 0 16 16"
		>
			<path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
			<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
		</svg>
	);
};

interface CourseWrapperProps {
	id?: string;
}

const CourseWrapper: React.FC<CourseWrapperProps> = ({ id }) => {
	const {
		title,
		setTitle,
		saveCourse,
		addNewChapter,
		chapters,
		loading,
		loadCourse,
	} = useCourse();

	React.useEffect(() => {
		if (id) {
			loadCourse(id);
		}
	}, [loadCourse, id]);

	return (
		<div className="card p-3">
			<div className="d-flex justify-content-between">
				<h1>
					<input
						className="border-0"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</h1>
				<button
					className="btn btn-outline-success border-0"
					onClick={saveCourse}
					disabled={loading}
				>
					<FileCheckIcon />
				</button>
			</div>
			<div>
				<button
					onClick={addNewChapter}
					type="button"
					className="btn btn-outline-dark border-0 mb-3"
				>
					+ Capítulo
				</button>
			</div>

			{chapters.map((chapter, index) => (
				<ChapterVisualizer chapter={chapter} key={index} />
			))}
		</div>
	);
};

interface CourseFormProps {
	id?: string;
}

const CourseForm: React.FC<CourseFormProps> = ({ id }) => {
	return (
		<CourseProvider>
			<CourseWrapper id={id} />
		</CourseProvider>
	);
};

export default CourseForm;
