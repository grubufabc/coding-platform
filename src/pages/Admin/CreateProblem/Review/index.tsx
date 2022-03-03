import React from 'react';
import MarkdownRender from '../../../../components/MarkdownRender';
import TestCaseItem from '../../../../components/TestCaseItem';
import { TestCase } from '..';

interface ReviewProps {
	handleCreateProblem: any;
	description: any;
	testCases: TestCase[];
	title: string;
}

const Review: React.FC<ReviewProps> = ({
	handleCreateProblem,
	description,
	testCases,
	title,
}) => {
	return (
		<React.Fragment>
			<div className="d-grid d-flex justify-content-between mb-5" role="group">
				<h2>Review</h2>
				<button
					onClick={handleCreateProblem}
					className="btn btn-lg px-5 btn-primary"
				>
					Finalizar
				</button>
			</div>

			<div className="row mb-5">
				<MarkdownRender text={`# ${title}\n${description}`} />
			</div>
			<div className="row">
				<h5 className="mb-3">Exemplos</h5>
				{testCases
					.filter((testCase) => testCase.visible)
					.map((testCase, index) => (
						<div className="mb-3" key={index}>
							<TestCaseItem
								input={testCase.input}
								expectedOutput={testCase.expectedOutput}
							/>
						</div>
					))}
			</div>
		</React.Fragment>
	);
};

export default Review;
