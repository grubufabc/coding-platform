import React from 'react';
import { languages } from '../../../../../../components/IDE/config';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import './style.css';
import { Language } from '../../../../../../models/language';
import { Code } from '../../../../../Learn/Course/interfaces/Code';
import { useCourse } from '../../../useCourse';

interface CodeEditorProps {
	section: Code;
	// updateSection: (section: Code) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ section }) => {
	const { updateSection } = useCourse();

	const getModeLanguage = (languageId: number): string => {
		const modeLanguage = languages.find(
			(language) => language.id === languageId
		);
		if (modeLanguage) {
			return modeLanguage.mode;
		}
		return 'text/plain';
	};

	const handleSelectLanguage = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		section.language_id = parseInt(event.target.value);
		updateSection();
	};

	return (
		<div>
			<select
				className="form-select form-select-sm mb-3"
				value={section.language_id}
				onChange={handleSelectLanguage}
			>
				<option value={0}>Selecione uma linguagem</option>
				{languages.map((language: Language) => (
					<option key={language.id} value={language.id}>
						{language.name}
					</option>
				))}
			</select>

			<ControlledEditor
				onBeforeChange={(_, __, value) => {
					section.sourceCode = value;
					updateSection();
				}}
				value={section.sourceCode}
				className={`code-mirror-wrapper code-wrapper-100percent`}
				options={{
					indentWithTabs: true,
					tabSize: 4,
					lineWrapping: true,
					mode: getModeLanguage(section.language_id) || '',
					theme: 'neat',
					lineNumbers: true,
					indentUnit: 4,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
