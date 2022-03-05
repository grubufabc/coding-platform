import React from 'react';
import { languages } from '../../../../components/IDE/config';
import { useIDE } from '../../../../hooks/useIDE';
import { Language } from '../../../../models/language';

const Toolbar: React.FC = () => {
	const { languageId, setLanguageId } = useIDE();

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const language = languages.find(
			(language) => language.id === parseInt(event.target.value)
		);
		setLanguageId(language ? language.id : 0);
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
