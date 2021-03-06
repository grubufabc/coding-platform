import React from 'react';
import { Chapter } from '../../interfaces/Chapter';
import SectionRender from './SectionRender';

interface MainProps {
	chapter: Chapter;
}

const Main: React.FC<MainProps> = ({ chapter }) => {
	return (
		<div className="flex-grow-1 px-5" style={{ maxWidth: '55rem' }}>
			{chapter.content.map((section) => (
				<SectionRender key={Math.random()} section={section} />
			))}
		</div>
	);
};

export default Main;
