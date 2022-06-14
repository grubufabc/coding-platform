import React from 'react'
import { Chapter } from '../../../Learn/Course/interfaces/Chapter';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import EyeIcon from '../icons/EyeIcon';
import TrashIcon from '../icons/TrashIcon';
import { useCourse } from '../useCourse';
import RenderEditor from './RenderEditor';

interface ChapterToolbarProps {
	chapter: Chapter;
	handleOpenClose: () => void
}

const ChapterToolbar: React.FC<ChapterToolbarProps> = ({
	chapter, handleOpenClose
}) => {
	const { moveChapterBackward, moveChapterForward, removeChapter } =
		useCourse();
	return (
		<div className="btn-group btn-group-sm" role="group">
			<button
				onClick={() => moveChapterBackward(chapter)}
				type="button"
				className="btn btn-outline-dark border-0"
			>
				<ArrowUpIcon />
			</button>
			<button
				onClick={() => moveChapterForward(chapter)}
				type="button"
				className="btn btn-outline-dark border-0"
			>
				<ArrowDownIcon />
			</button>
			<button
				onClick={() => handleOpenClose()}
				type="button"
				className="btn btn-outline-dark border-0"
			>
				<EyeIcon/>
			</button>
			<button
				onClick={() => removeChapter(chapter)}
				type="button"
				className="btn btn-outline-dark border-0"
			>
				<TrashIcon />
			</button>
		</div>
	);
};


interface ChapterVisualizerProps {
	chapter: Chapter;
}

const ChapterVisualizer: React.FC<ChapterVisualizerProps> = ({ chapter }) => {
	const { addMarkdownSection, addCodeSection, updateChapter } =
		useCourse();
	
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="card p-2 mb-4">
			<h4 className="d-flex justify-content-between">
				<input
					className="border-0"
					value={chapter.title}
					onChange={(e) => {
						chapter.title = e.target.value;
						updateChapter();
					}}
				/>
				<ChapterToolbar chapter={chapter} handleOpenClose={() => setIsOpen(!isOpen)} />
			</h4>
			<div className="d-flex justify-content-between mb-3">
				<div>
					<button
						type="button"
						className="btn btn-outline-dark border-0"
						onClick={() => addCodeSection(chapter)}
					>
						+ Código
					</button>
					<button
						type="button"
						className="btn btn-outline-dark border-0"
						onClick={() => addMarkdownSection(chapter)}
					>
						+ Texto
					</button>
				</div>
			</div>
			<div className={isOpen ? "d-block" : "d-none"}>
				{chapter.content.map((section, index) => (
					<RenderEditor key={index} section={section} chapter={chapter} />
				))}
			</div>
		</div>
	);
};

export default ChapterVisualizer;
