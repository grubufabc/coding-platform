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

const BookIcon: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			fill="currentColor"
			className="bi bi-book"
			viewBox="0 0 16 16"
		>
			<path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
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

	const handleShowPreview = () => {
		window.open(`/learn/${id}`, '_blank');
	};

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
				<div>
					<button
						onClick={() => handleShowPreview()}
						className="btn btn-outline-dark me-3 border-0"
					>
						<BookIcon />
					</button>
					<button
						className="btn btn-outline-success border-0"
						onClick={saveCourse}
						disabled={loading}
					>
						<FileCheckIcon />
					</button>
				</div>
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
