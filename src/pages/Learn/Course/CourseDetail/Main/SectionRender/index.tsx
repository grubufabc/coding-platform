import React from 'react';
import CodeAssessmentRender from './renders/CodeAssessmentRender';
import CodeRender from './renders/CodeRender';
import MarkdownRender from './renders/MarkdownRender';

interface Section {
	type: 'markdown' | 'code' | 'code-assessment';
}

interface Markdown extends Section {
	type: 'markdown';
	text: string;
}

interface Code extends Section {
	type: 'code';
	sourceCode: string;
	language_id: number;
}

interface CodeAssessment extends Section {
	type: 'code-assessment';
	description: string;
	tests: {
		input: string;
		expectedOutput: string;
	}[];
}

interface SectionRenderProps {
	section: Section;
}

const SectionRender: React.FC<SectionRenderProps> = ({ section }) => {
	if (section.type === 'markdown') {
		return <MarkdownRender text={(section as Markdown).text} />;
	}

	if (section.type === 'code') {
		return (
			<CodeRender
				sourceCode={(section as Code).sourceCode}
				language_id={(section as Code).language_id}
			/>
		);
	}

	if (section.type === 'code-assessment') {
		return (
			<CodeAssessmentRender
				description={(section as CodeAssessment).description}
				tests={(section as CodeAssessment).tests}
			/>
		);
	}

	return null;
};

export default SectionRender;
