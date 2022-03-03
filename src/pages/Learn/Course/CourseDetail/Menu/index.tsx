import React from 'react';
import { Chapter } from '../../interfaces/Chapter';

interface MenuProps {
	chapters: Chapter[];
	selectedChapter: number;
	setSelectedChapter: (chapterId: number) => void;
}

const Menu: React.FC<MenuProps> = ({
	chapters,
	selectedChapter,
	setSelectedChapter,
}) => {
	return (
		<div style={{ width: '20rem' }}>
			<ul className="list-group">
				{chapters.map((chapter, index) => (
					<button
						key={index}
						className={`${
							index === selectedChapter ? 'bg-dark text-white' : ''
						} list-group-item d-flex justify-content-start p-4`}
						onClick={() => setSelectedChapter(index)}
					>
						<h4 className="p-0 m-0">{chapter.title}</h4>
					</button>
				))}
			</ul>
		</div>
	);
};

export default Menu;
