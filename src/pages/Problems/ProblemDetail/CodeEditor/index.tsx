import React from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { languages } from '../../../../components/IDE/config';
import { useIDE } from '../../../../hooks/useIDE';
import { Language } from '../../../../models/language';

const CodeEditor: React.FC = () => {
	const { sourceCode, setSourceCode, languageId, setLanguageId } = useIDE();

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
		setLanguageId(language ? language.id : 0);
	};

	return (
		<React.Fragment>
			<div>
				<div className="d-flex p-2" style={{ backgroundColor: '#f7f7f7' }}>
					<div>
						<select
							className="form-select form-select-sm"
							onChange={handleSelect}
							value={languageId}
						>
							<option value={0}>Selecione uma linguagem</option>
							{languages.map((language: Language) => (
								<option key={language.id} value={language.id}>
									{language.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className="flex-grow-1" style={{ overflowY: 'scroll' }}>
				<ControlledEditor
					onBeforeChange={(_, __, value) => {
						setSourceCode(value);
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
			</div>
		</React.Fragment>
	);
};

export default CodeEditor;
