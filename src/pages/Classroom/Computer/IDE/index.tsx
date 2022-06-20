import { Controlled as ControlledEditor } from 'react-codemirror2';
import { languages } from '../../../../components/IDE/config';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import './style.css';
import { useIDE } from 'hooks/useIDE';
import { useClassroom } from 'hooks/useClassroom';
import React from 'react';

const IDE = () => {
	const { sourceCode, setSourceCode, languageId, setLanguageId } = useIDE();
	const [userLastChange, setUserLastChange] = React.useState(0);

	const getModeLanguage = (languageId: number): string => {
		const modeLanguage = languages.find(
			(language) => language.id === languageId
		);
		if (modeLanguage) {
			return modeLanguage.mode;
		}
		return 'text/plain';
	};

	const {
		changeEnvironment,
		environment,
		setEnvironment,
		setLastUpdate,
		lastUpdate,
	} = useClassroom();

	React.useEffect(() => {
		if (userLastChange < lastUpdate) {
			setSourceCode(environment.sourceCode);
			setLastUpdate(environment.timestamp);
			setLanguageId(environment.languageId);
		}
	}, [
		environment,
		lastUpdate,
		setLanguageId,
		setLastUpdate,
		setSourceCode,
		userLastChange,
	]);

	const handleChangeSourceCode = (sourceCode: string) => {
		const newEnvironment = {
			...environment,
			sourceCode,
			timestamp: new Date().getTime(),
		};
		setUserLastChange(newEnvironment.timestamp);
		setSourceCode(sourceCode);
		setLastUpdate(newEnvironment.timestamp);
		setEnvironment(newEnvironment);
		changeEnvironment(newEnvironment);
	};

	return (
		<div className="flex-grow-1" style={{ overflowY: 'scroll' }}>
			<ControlledEditor
				onBeforeChange={(_, __, value) => {
					handleChangeSourceCode(value);
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
	);
};

export default IDE;
