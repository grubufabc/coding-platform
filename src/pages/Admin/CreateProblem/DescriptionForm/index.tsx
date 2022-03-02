import React from 'react';
import Input from '../../../../components/Form/Input';
import MarkdownEditor, {
	MarkdownEditorHandles,
} from '../../../../components/MarkdownEditor';

interface DescriptionFormProps {
	setDescription: React.Dispatch<React.SetStateAction<string>>;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	title: string;
}

const DescriptionForm: React.FC<DescriptionFormProps> = ({
	setDescription,
	setTitle,
	title,
}) => {
	const markdownEditorRef = React.useRef<MarkdownEditorHandles>(null);

	return (
		<React.Fragment>
			<h2 className="mb-5">Descrição do problema</h2>
			<Input
				label={{ text: 'Título', id: 'title' }}
				placeholder="Título"
				className="mb-5"
				value={title}
				setValue={setTitle}
			/>
			<MarkdownEditor onChange={setDescription} ref={markdownEditorRef} />
		</React.Fragment>
	);
};

export default DescriptionForm;
