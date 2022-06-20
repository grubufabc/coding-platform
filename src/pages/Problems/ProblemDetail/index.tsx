import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useFetch from '../../../hooks/useFetch';
import { Problem } from '../../../models/problem';
import {
	GET_PROBLEM as API_GET_PROBLEM,
	GET_SUBMISSIONS as API_GET_SUBMISSIONS,
	POST_SOLUTION as API_POST_SOLUTION,
} from '../../../api';
import Main from './Main';
import { AuthContext } from '../../../providers/AuthProvider';
import { useToast } from '../../../hooks/useToast';
import Header from '../../../components/Header';
import { IDEProvider, useIDE } from '../../../hooks/useIDE';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import './style.css';
import CodeEditor from './CodeEditor';
import TerminalSection from './TerminalSection';
import Toolbar from './Toolbar';

interface TestCase {
	input: string;
	verdict: string;
	expectedOutput: string;
	compile_output: string | null;
	stdout: string | null;
	stderr: string | null;
}

export interface Submission {
	sourceCode: string;
	languageID: number;
	problemID: string;
	judgeResult: {
		verdict: string;
		testCases: TestCase[];
	};
}

const ProblemDetailWrapper: React.FC = () => {
	const { request } = useFetch();
	const { id: idProblem } = useParams();
	const [problem, setProblem] = React.useState<Problem>();
	const [lastSubmissions, setLastSubmissions] = React.useState<Submission[]>(
		[]
	);
	const { authData } = React.useContext(AuthContext);
	const [judging, setJudging] = React.useState<boolean>(false);
	const { setMessage: ToastSetMessage } = useToast();
	const { sourceCode, languageId } = useIDE();

	const getSubmissions = useCallback(async () => {
		const { url, options } = API_GET_SUBMISSIONS();
		const { json } = await request(url, options);
		const problemSubmissions = (json as Submission[]) || [];
		setLastSubmissions(
			problemSubmissions.filter((s) => s.problemID === idProblem)
		);
	}, [idProblem, request]);

	React.useEffect(() => {
		const getProblem = async () => {
			const { url, options } = API_GET_PROBLEM(idProblem || '');
			const { json } = await request(url, options);
			setProblem(json as Problem);
		};
		if (problem === undefined) {
			if (authData.token) {
				getSubmissions();
			}
			getProblem();
		}
	}, [authData.token, getSubmissions, idProblem, problem, request]);

	const handleSubmit = async () => {
		if (sourceCode.length === 0) {
			ToastSetMessage({
				title: 'Atenção',
				body: 'Insira um código',
				icon: '⚠️',
			});
			return;
		}

		if (languageId === 0) {
			ToastSetMessage({
				title: 'Atenção',
				body: 'Selecione uma linguagem',
				icon: '⚠️',
			});
			return;
		}

		ToastSetMessage({
			title: 'Tudo certo',
			body: 'Solução submetida com sucesso',
			icon: '✅',
		});

		const { url, options } = API_POST_SOLUTION(idProblem || '', {
			language_id: languageId || 0,
			source_code: sourceCode,
		});

		setJudging(true);
		const { json } = await request(url, options);
		const submission = json as Submission;
		setJudging(false);

		ToastSetMessage({
			title: 'Resultado',
			body: submission.judgeResult.verdict,
		});

		if (authData.token) {
			getSubmissions();
		} else {
			setLastSubmissions([...lastSubmissions, submission]);
		}
	};

	return (
		<React.Fragment>
			<Header />
			{problem?._id && (
				<div
					className="d-flex flex-column"
					style={{ height: 'calc(100vh - 4.5rem)' }}
				>
					<div className="flex-grow-1" style={{ overflow: 'hidden' }}>
						<div className="d-flex h-100">
							<div style={{ width: '35%' }}>
								<Main problem={problem} lastSubmissions={lastSubmissions} />
							</div>
							<div className="flex-grow-1">
								<div className="d-flex flex-column h-100">
									<CodeEditor />
									<TerminalSection />
									<Toolbar handleSubmit={handleSubmit} judging={judging} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{!problem && (
				<div className="d-flex align-items-center">
					<strong>Carregando problema...</strong>
					<div
						className="spinner-border ms-5"
						role="status"
						aria-hidden="true"
					></div>
				</div>
			)}
		</React.Fragment>
	);
};

const ProblemDetail: React.FC = () => {
	return (
		<IDEProvider>
			<ProblemDetailWrapper />
		</IDEProvider>
	);
};

export default ProblemDetail;
