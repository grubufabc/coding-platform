import Collapsable from 'components/Collapsable';
import React from 'react';
import { Submission } from '../..';

interface SubmissionDetailProps {
	submission: Submission;
	index: number;
}

interface GenericViewProps {
	label: string;
	data: string;
}

const GenericView: React.FC<GenericViewProps> = ({ label, data }) => {
	return (
		<div>
			<h6>{label}</h6>
			<pre>
				<code>{data}</code>
			</pre>
		</div>
	);
};

const SVGArrowDown: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className="bi bi-caret-down-fill"
			viewBox="0 0 16 16"
		>
			<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
		</svg>
	);
};

const SubmissionDetail: React.FC<SubmissionDetailProps> = ({
	submission,
	index,
}) => {
	const { judgeResult, sourceCode } = submission;
	const { verdict, testCases } = judgeResult;

	const getClassFromStatus = (status: string) => {
		if (status === 'Accepted') return 'text-success';
		return 'text-danger';
	};

	return (
		<Collapsable
			label={
				<h5>
					<span> Submissão #{index + 1}</span>
					<span className={getClassFromStatus(verdict)}>
						<span>{verdict}</span>
						<span className="ms-2">
							<SVGArrowDown />
						</span>
					</span>
				</h5>
			}
		>
			<React.Fragment>
				<GenericView label={'Código Fonte'} data={sourceCode} />
				{testCases.map((testCase, index) => (
					<Collapsable
						key={index}
						label={
							<h6 className="d-flex justify-content-between">
								<span>Test case #{index + 1}</span>
								<span className={getClassFromStatus(testCase.verdict)}>
									<span>{testCase.verdict}</span>
									<span className="ms-2">
										<SVGArrowDown />
									</span>
								</span>
							</h6>
						}
					>
						<React.Fragment>
							<GenericView label={'Input'} data={testCase.input} />
							<GenericView
								label={'Expected Output'}
								data={testCase.expectedOutput}
							/>

							{testCase.compile_output && (
								<GenericView
									label={'Compile Output'}
									data={testCase.compile_output}
								/>
							)}
							{testCase.stderr && (
								<GenericView label={'Stderr'} data={testCase.stderr} />
							)}
							{testCase.stdout && (
								<GenericView label={'Stdout'} data={testCase.stdout} />
							)}
						</React.Fragment>
					</Collapsable>
				))}
			</React.Fragment>
		</Collapsable>
	);
};

export default SubmissionDetail;
