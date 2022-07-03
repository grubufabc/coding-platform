import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './style.css';
import CodeRender from '../CodeRender';
import Tabs from 'components/Tabs';
import Collapsable from 'components/Collapsable';
import { b64_to_utf8, utf8_to_b64 } from 'utils';
import { JUDGE0_API_URL } from 'api';
import { Submission } from 'models/submission';
import axios from 'axios';
import { useToast } from 'hooks/useToast';

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

interface CodeAssessmentRenderProps {
	description: string;
	tests: {
		input: string;
		expectedOutput: string;
	}[];
}

interface ExecutionResult {
	stdout: string;
	errorMessage: string;
}

interface Result {
	loading: boolean;
	result: {
		output: string;
		status: 'Accepted' | 'Wrong Answer' | 'Error' | '';
	};
}

const CodeAssessmentRender: React.FC<CodeAssessmentRenderProps> = ({
	description,
	tests,
}) => {
	const [results, setResults] = React.useState<Result[]>([]);
	const [progress, setProgress] = React.useState(0);
	const [languageId, setLanguageId] = React.useState(0);
	const [sourceCode, setSourceCode] = React.useState('');
	const { setMessage: setToastMessage } = useToast();

	React.useEffect(() => {
		setResults(
			tests.map(() => ({
				loading: false,
				result: {
					output: '',
					status: '',
				},
			}))
		);
	}, [tests]);

	const runCode = async ({
		sourceCode,
		languageId,
		stdin,
	}: {
		sourceCode: string;
		languageId: number;
		stdin: string;
	}) => {
		const response = await axios.post(`${JUDGE0_API_URL}`, {
			language_id: languageId,
			source_code: utf8_to_b64(sourceCode),
			stdin: utf8_to_b64(stdin),
		});

		const submission = response.data as Submission;

		const executionResult: ExecutionResult = {
			stdout: '',
			errorMessage: '',
		};

		if (submission.compile_output) {
			executionResult.errorMessage = b64_to_utf8(submission.compile_output);
			return executionResult;
		}

		if (submission.stderr) {
			executionResult.errorMessage = b64_to_utf8(submission.stderr);
			return executionResult;
		}

		if (submission.stdout) {
			executionResult.stdout = b64_to_utf8(submission.stdout);
			return executionResult;
		}

		if (
			submission.status &&
			submission.status.description === 'Time Limit Exceeded'
		) {
			executionResult.errorMessage = submission.status.description;
			return executionResult;
		}

		return executionResult;
	};

	const getVerdict = (
		result: ExecutionResult,
		expectedOutput: string
	): 'Accepted' | 'Wrong Answer' | 'Error' | '' => {
		if (result.errorMessage) {
			return 'Error';
		}

		const linesStdout: string[] = result.stdout
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0);

		const linesExpectedOutput: string[] = expectedOutput
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0);

		if (linesStdout.length !== linesExpectedOutput.length) {
			return 'Wrong Answer';
		}

		for (let i = 0; i < linesStdout.length; i++) {
			if (linesStdout[i] !== linesExpectedOutput[i]) {
				return 'Wrong Answer';
			}
		}

		return 'Accepted';
	};

	const getEmptyResult = (loading = false): Result => {
		const result: Result = {
			loading,
			result: {
				output: '',
				status: '',
			},
		};
		return result;
	};

	const runTest = async (
		test: { input: string; expectedOutput: string },
		testId: number
	) => {
		const progressPerTest = 100 / tests.length;
		try {
			const executionResult = await runCode({
				sourceCode,
				languageId,
				stdin: test.input,
			});

			setProgress((progress) => progress + progressPerTest / 2);
			setResults((prevResults) => {
				prevResults[testId] = {
					loading: false,
					result: {
						output: executionResult.stdout || executionResult.errorMessage,
						status: getVerdict(executionResult, test.expectedOutput),
					},
				};
				return [...prevResults];
			});
		} catch (error) {
			setProgress((progress) => progress + progressPerTest / 2);
			setResults((prevResults) => {
				prevResults[testId] = {
					loading: false,
					result: {
						output: 'Unknown Error',
						status: 'Error',
					},
				};
				return [...prevResults];
			});
		}
	};

	const runTests = () => {
		if (!sourceCode || sourceCode === '\n\n') {
			setToastMessage({
				title: 'Erro',
				body: 'Por favor, insira o código fonte',
				icon: '❌',
			});
			return;
		}

		if (!languageId) {
			setToastMessage({
				title: 'Erro',
				body: 'Por favor, selecione uma linguagem',
				icon: '❌',
			});
			return;
		}

		setProgress(0);
		const newResults = [];
		for (let i = 0; i < tests.length; i++) {
			newResults.push(getEmptyResult(true));
		}
		setResults(newResults);

		const progressPerTest = 100 / tests.length;
		for (let id = 0; id < tests.length; id++) {
			setProgress((progress) => progress + progressPerTest / 2);
			runTest(tests[id], id);
		}
	};

	const handleCodeRenderChange = ({
		sourceCode,
		languageId,
	}: {
		sourceCode: string;
		languageId: number;
	}) => {
		if (setLanguageId) {
			setLanguageId(languageId);
		}
		if (setSourceCode) {
			setSourceCode(sourceCode);
		}
	};

	const getClassFromStatus = (
		verdict: 'Accepted' | 'Wrong Answer' | 'Error' | ''
	) => {
		if (verdict === 'Accepted') {
			return 'text-success';
		}

		if (verdict === 'Wrong Answer') {
			return 'text-danger';
		}

		if (verdict === 'Error') {
			return 'text-danger';
		}

		return '';
	};

	const passedTests = results.filter(
		({ result }) => result.status === 'Accepted'
	).length;

	const failedTests = results.filter(
		({ result }) =>
			result.status === 'Wrong Answer' || result.status === 'Error'
	).length;

	return (
		<div className="mb-3">
			<article className="markdown-body mb-3">
				<ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
			</article>
			<Tabs
				tabs={[
					{
						label: 'Editor',
						content: (
							<div>
								<CodeRender
									handleChange={handleCodeRenderChange}
									borderTop={false}
									sourceCode={'\n\n'}
									language_id={0}
								/>
							</div>
						),
					},
					{
						label: 'Testes',
						content: (
							<div className="p-1">
								<div>
									<div className="d-flex justify-content-between pt-2">
										<div className="pt-2">
											<span className="fw-bold">Testes:</span>
											<span className="fw-bold text-danger ms-2">
												{failedTests} falharam
											</span>
											,
											<span className="fw-bold text-success ms-2">
												{passedTests} passaram
											</span>
											,<span className="ms-2">{tests.length} total</span>
										</div>
										<button
											onClick={runTests}
											className="btn btn-outline-dark mb-3"
										>
											Avaliar
										</button>
									</div>
									<div className="pb-3">
										<div className="progress">
											<div
												className="progress-bar progress-bar-striped progress-bar-animated"
												role="progressbar"
												aria-valuenow={progress}
												aria-valuemin={0}
												aria-valuemax={100}
												style={{
													width: `${progress}%`,
												}}
											></div>
										</div>
									</div>
								</div>
								<div>
									{tests.map((test, index) => (
										<Collapsable
											key={index}
											label={
												<h6 className="d-flex justify-content-between">
													<span>Test case #{index + 1}</span>
													<span
														className={
															index < results.length
																? getClassFromStatus(
																		results[index].result.status
																  )
																: ''
														}
													>
														<span>
															{index < results.length
																? results[index].loading
																	? 'Carregando...'
																	: results[index].result.status
																: ''}
														</span>
														<span className="ms-2">
															<SVGArrowDown />
														</span>
													</span>
												</h6>
											}
										>
											<div>
												<label>Entrada</label>
												<textarea
													disabled={true}
													className="form-control"
													value={test.input}
												/>
												<div className="row my-2">
													<div className="col-6">
														<label>Saída esperada</label>
														<textarea
															value={test.expectedOutput}
															className="form-control"
															disabled={true}
														/>
													</div>
													<div className="col-6">
														<label>Saída do programa</label>
														<textarea
															value={
																index < results.length
																	? results[index].result.output
																	: ''
															}
															className="form-control"
															disabled={true}
														/>
													</div>
												</div>
											</div>
										</Collapsable>
									))}
								</div>
							</div>
						),
					},
				]}
			/>
		</div>
	);
};

export default CodeAssessmentRender;
