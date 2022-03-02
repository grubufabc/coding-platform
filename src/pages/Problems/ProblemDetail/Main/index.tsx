import React from 'react';
import { Submission } from '..';
import MarkdownRender from '../../../../components/MarkdownRender';
import Tabs from '../../../../components/Tabs';
import TestCaseItem from '../../../../components/TestCaseItem';
import { Problem } from '../../../../models/problem';
import ListSubmissions from '../ListSubmissions';
import './style.css';

interface MainProps {
	problem: Problem;
	lastSubmissions: Submission[];
}

const Main: React.FC<MainProps> = ({ problem, lastSubmissions }) => {
	return (
		<div className="col-4 px-3" style={{ overflow: 'scroll', height: '100%' }}>
			<Tabs
				tabs={[
					{
						label: <span>Descrição</span>,
						content: (
							<React.Fragment>
								<h1 className="mb-5 mt-3">{problem.title}</h1>
								<MarkdownRender text={problem.description} />
								<div className="my-5">
									{problem.testCases
										.filter(({ visible }) => visible)
										.map(({ input, expectedOutput }, index) => {
											return (
												<div className="mb-3" key={index}>
													<TestCaseItem
														input={input}
														expectedOutput={expectedOutput}
													/>
												</div>
											);
										})}
								</div>
							</React.Fragment>
						),
					},
					{
						label: (
							<span>
								Submissões{' '}
								<span className="badge bg-primary">
									{lastSubmissions.length}
								</span>
							</span>
						),
						content: (
							<React.Fragment>
								<ListSubmissions lastSubmissions={lastSubmissions} />
							</React.Fragment>
						),
					},
				]}
			/>
		</div>
	);
};

export default Main;
