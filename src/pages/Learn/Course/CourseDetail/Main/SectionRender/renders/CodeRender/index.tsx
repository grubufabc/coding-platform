import React from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { languages } from '../../../../../../../../components/IDE/config';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import './style.css';
import { IDEProvider, useIDE } from '../../../../../../../../hooks/useIDE';

const ArrowClockwiseIcon: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			fill="currentColor"
			className="bi bi-arrow-clockwise"
			viewBox="0 0 16 16"
		>
			<path
				fillRule="evenodd"
				d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
			/>
			<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
		</svg>
	);
};

const PlayIcon: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			fill="currentColor"
			className="bi bi-play-fill"
			viewBox="0 0 16 16"
		>
			<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
		</svg>
	);
};

interface CodeRenderWrapperProps {
	sourceCode: string;
	language_id: number;
	borderTop?: boolean;
	handleChange?: (data: { sourceCode: string; languageId: number }) => void;
}

const CodeRenderWrapper: React.FC<CodeRenderWrapperProps> = ({
	sourceCode: sourceCodeFromProps,
	language_id,
	borderTop = true,
	handleChange,
}) => {
	const {
		sourceCode,
		stdin,
		stdout,
		errorMessage,
		time,
		memory,
		setSourceCode,
		setStdin,
		runCode,
		setLanguageId,
		loading,
		languageId,
	} = useIDE();

	React.useEffect(() => {
		setLanguageId(language_id);
	}, [language_id, setLanguageId]);

	React.useEffect(() => {
		setSourceCode(sourceCodeFromProps);
	}, [setSourceCode, sourceCodeFromProps]);

	const handleResetIDE = () => {
		setSourceCode(sourceCodeFromProps);
	};

	const getModeLanguage = (languageId: number): string => {
		const modeLanguage = languages.find(
			(language) => language.id === languageId
		);
		if (modeLanguage) {
			return modeLanguage.mode;
		}
		return 'text/plain';
	};

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const language = languages.find(
			(language) => language.id === parseInt(event.target.value)
		);
		if (handleChange) {
			handleChange({
				sourceCode: sourceCode,
				languageId: language ? language.id : 0,
			});
		}
		setLanguageId(language ? language.id : 0);
	};

	return (
		<div className={`mb-3 ${borderTop ? 'border-top' : ''} border-bottom py-3`}>
			<div className="d-flex justify-content-between">
				<div>
					<select
						value={languageId}
						className="form-select form-select-sm"
						onChange={handleSelect}
					>
						<option value="0">Selecione uma linguagem</option>
						{languages.map((language, index) => (
							<option key={index} value={language.id}>
								{language.name}
							</option>
						))}
					</select>
				</div>
				<div className="btn-group mb-2" role="group">
					<button
						className="btn btn-outline-dark p-1 px-4"
						onClick={handleResetIDE}
					>
						<ArrowClockwiseIcon />
					</button>
					<button
						className="btn btn-outline-dark p-1 px-4"
						onClick={() => runCode()}
					>
						{loading ? (
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						) : (
							<PlayIcon />
						)}
					</button>
				</div>
			</div>
			<ControlledEditor
				onBeforeChange={(_, __, value) => {
					setSourceCode(value);
					if (handleChange) {
						handleChange({
							sourceCode: value,
							languageId,
						});
					}
				}}
				value={sourceCode}
				className={`code-mirror-wrapper code-wrapper-100percent`}
				options={{
					indentWithTabs: true,
					tabSize: 4,
					lineWrapping: true,
					mode: getModeLanguage(languageId) || '',
					theme: 'neat',
					lineNumbers: true,
					indentUnit: 4,
				}}
			/>
			<div>
				<div className="border-top border-5 border-dark d-flex">
					<div className="w-50 px-3 pt-3">
						<h5 className="p-0 m-0 py-2">stdin</h5>
						<textarea
							className="form-control font-monospace"
							rows={4}
							onChange={(e) => setStdin(e.target.value)}
							value={stdin}
						/>
					</div>
					<div className="w-50 px-3 pt-3">
						<div className="d-flex align-items-center mb-2">
							<h5 className="p-0 m-0 me-auto">stdout</h5>
							<span
								style={{
									backgroundColor: '#e9ecef',
								}}
								className="ms-2 py-1 px-2 rounded-2 font-monospace fw-bold text-dark"
							>
								{time}s
							</span>
							<span
								style={{
									backgroundColor: '#e9ecef',
								}}
								className="ms-2 py-1 px-2 rounded-2 font-monospace fw-bold text-dark"
							>
								{memory}kb
							</span>
						</div>
						<textarea
							className={`form-control font-monospace ${
								errorMessage ? 'bg-danger text-white' : ''
							}`}
							rows={4}
							disabled={true}
							value={errorMessage ? errorMessage : stdout}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

interface CodeRenderProps {
	sourceCode: string;
	language_id: number;
	borderTop?: boolean;
	handleChange?: (data: { sourceCode: string; languageId: number }) => void;
}

const CodeRender: React.FC<CodeRenderProps> = ({
	sourceCode,
	language_id,
	borderTop = true,
	handleChange,
}) => {
	return (
		<IDEProvider>
			<CodeRenderWrapper
				handleChange={handleChange}
				borderTop={borderTop}
				sourceCode={sourceCode}
				language_id={language_id}
			/>
		</IDEProvider>
	);
};

export default CodeRender;
