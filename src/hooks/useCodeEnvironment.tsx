import { createContext, ReactNode, useContext, useState } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
// useCodeEnvironment

interface CodeEnvironmentProviderProps {
	children: ReactNode;
}

interface Comment {
	username: string;
	text: string;
	commit_id: string;
}

interface Code {
	source_code: string;
	language_id: number;
	stdin: string;
}

interface CodeEnvironmentState {
	timestamp: number;
	code: Code;
	parent_commit: string;
	id: string;
	message: string;
	username: string;
}

interface CodeEnvironmentStateDto {
	code: Code;
	parent_commit: string;
	message: string;
	username: string;
}

interface CodeEnvironment {
	_id: string;
	name: string;
	states: CodeEnvironmentState[];
	comments: Comment[];
}

interface CodeEnvironmentContextData {
	codeEnvironment: CodeEnvironment;
	createCodeEnvironment: () => Promise<CodeEnvironment>;
	addComment: (comment: Comment) => Promise<CodeEnvironment>;
	commitCodeEnvironment: (
		codeEnvironmentStateDto: CodeEnvironmentStateDto
	) => Promise<CodeEnvironment>;
	loadCodeEnvironment: (environment_id: string) => Promise<CodeEnvironment>;
	changeEnvironmentName: (name: string) => Promise<CodeEnvironment>;
	createCodeEnvironmentWithData: (
		code: Code,
		environmentName: string
	) => Promise<CodeEnvironment>;
}

const CodeEnvironmentContext = createContext<CodeEnvironmentContextData>(
	{} as CodeEnvironmentContextData
);

export function CodeEnvironmentProvider({
	children,
}: CodeEnvironmentProviderProps) {
	const [codeEnvironment, setCodeEnvironment] = useState<CodeEnvironment>({
		_id: '',
		name: '',
		states: [],
		comments: [],
	});

	async function createCodeEnvironmentWithData(
		code: Code,
		environmentName: string
	) {
		const codeEnvironment: CodeEnvironment = await (
			await axios.post(`${API_URL}/code-environments`)
		).data;
		codeEnvironment.name = environmentName;
		await axios.patch(`${API_URL}/code-environments/${codeEnvironment._id}`, {
			name: codeEnvironment.name,
		});
		const codeEnvironmentStateDto: CodeEnvironmentStateDto = {
			parent_commit: '',
			message: 'Commit inicial',
			username: 'Anônimo',
			code,
		};
		const response = await axios.post(
			`${API_URL}/code-environments/${codeEnvironment._id}/states`,
			codeEnvironmentStateDto
		);
		setCodeEnvironment(response.data);
		return response.data;
	}

	async function createCodeEnvironment(): Promise<CodeEnvironment> {
		const response = await axios.post(`${API_URL}/code-environments`);
		setCodeEnvironment(response.data);
		return response.data;
	}

	async function addComment(comment: Comment) {
		const response = await axios.post(
			`${API_URL}/code-environments/${codeEnvironment._id}/comments`,
			comment
		);
		setCodeEnvironment(response.data);
		return response.data;
	}

	async function commitCodeEnvironment(
		CodeEnvironmentStateDto: CodeEnvironmentStateDto
	) {
		const response = await axios.post(
			`${API_URL}/code-environments/${codeEnvironment._id}/states`,
			CodeEnvironmentStateDto
		);
		setCodeEnvironment(response.data);
		return response.data;
	}

	async function loadCodeEnvironment(environment_id: string) {
		const response = await axios.get(
			`${API_URL}/code-environments/${environment_id}`
		);
		setCodeEnvironment(response.data);
		return response.data;
	}

	async function changeEnvironmentName(name: string) {
		const response = await axios.patch(
			`${API_URL}/code-environments/${codeEnvironment._id}`,
			{ name }
		);
		setCodeEnvironment(response.data);
		return response.data;
	}

	return (
		<CodeEnvironmentContext.Provider
			value={{
				codeEnvironment,
				createCodeEnvironment,
				addComment,
				commitCodeEnvironment,
				loadCodeEnvironment,
				changeEnvironmentName,
				createCodeEnvironmentWithData,
			}}
		>
			{children}
		</CodeEnvironmentContext.Provider>
	);
}

export function useCodeEnvironment() {
	const context = useContext(CodeEnvironmentContext);
	return context;
}
