import { useIDE } from 'hooks/useIDE';
import { languages } from 'components/IDE/config';
import { Language } from 'models/language';
import { useClassroom } from 'hooks/useClassroom';

const Toolbar = () => {
	const { languageId, setLanguageId } = useIDE();
	const { changeEnvironment, environment } = useClassroom();

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const language = languages.find(
			(language) => language.id === parseInt(event.target.value)
		);
		const newLanguageId = language?.id || 0;
		setLanguageId(newLanguageId);
		changeEnvironment({
			...environment,
			languageId: newLanguageId,
			timestamp: new Date().getTime(),
		});
	};

	return (
		<div>
			<div className="d-flex p-2" style={{ backgroundColor: '#e9ecef' }}>
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
	);
};

export default Toolbar;
