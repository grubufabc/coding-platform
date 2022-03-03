import axios from 'axios';
import React from 'react';
import { JUDGE0_API_URL } from '../../../../../../../../api';
import { Submission } from '../../../../../../../../models/submission';
import { b64_to_utf8, utf8_to_b64 } from '../../../../../../../../utils';

interface IDEProviderProps {
	children: React.ReactNode;
}

interface IDEContextData {
	sourceCode: string;
	languageId: number;
	stdin: string;
	stdout: string;
	loading: boolean;
	errorMessage: string;
	time: number;
	memory: number;

	setSourceCode: (sourceCode: string) => void;
	setLanguageId: (languageId: number) => void;
	setStdin: (stdin: string) => void;
	runCode: () => Promise<any>;
}

const IDEContext = React.createContext<IDEContextData>({} as IDEContextData);

const IDEProvider: React.FC<IDEProviderProps> = ({ children }) => {
	const [sourceCode, setSourceCode] = React.useState<string>('');
	const [languageId, setLanguageId] = React.useState<number>(0);
	const [stdin, setStdin] = React.useState<string>('');
	const [stdout, setStdout] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const [time, setTime] = React.useState<number>(0);
	const [memory, setMemory] = React.useState<number>(0);

	const runCode = async () => {
		setLoading(true);
		setErrorMessage('');
		setStdout('');
		setTime(0);
		setMemory(0);

		const response = await axios.post(
			`${JUDGE0_API_URL}/submissions/?base64_encoded=true&wait=true`,
			{
				language_id: languageId,
				source_code: utf8_to_b64(sourceCode),
				stdin: utf8_to_b64(stdin),
			}
		);

		setLoading(false);
		const submission = response.data as Submission;

		if (submission.compile_output) {
			setErrorMessage(b64_to_utf8(submission.compile_output));
			return;
		}

		if (submission.stderr) {
			setErrorMessage(b64_to_utf8(submission.stderr));
			return;
		}

		if (submission.stdout) {
			setStdout(b64_to_utf8(submission.stdout));
			if (submission.time) {
				setTime(submission.time);
			}
			if (submission.memory) {
				setMemory(submission.memory);
			}
			return;
		}

		if (
			submission.status &&
			submission.status.description === 'Time Limit Exceeded'
		) {
			setErrorMessage(submission.status.description);
			return;
		}
	};

	return (
		<IDEContext.Provider
			value={{
				sourceCode,
				languageId,
				stdin,
				stdout,
				loading,
				errorMessage,
				time,
				memory,
				setSourceCode,
				setLanguageId,
				setStdin,
				runCode,
			}}
		>
			{children}
		</IDEContext.Provider>
	);
};

const useIDE = () => {
	const context = React.useContext(IDEContext);
	return context;
};

export { IDEProvider, useIDE };
