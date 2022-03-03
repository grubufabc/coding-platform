import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './style.css';

interface MarkdownRenderProps {
	text: string;
}

const MarkdownRender: React.FC<MarkdownRenderProps> = ({ text }) => {
	return (
		<div>
			<article className="markdown-body">
				<ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
			</article>
		</div>
	);
};

export default MarkdownRender;
