import { useCourse } from 'pages/Admin/CourseForm/useCourse';
import {
	CodeAssessment,
	CodeAssessmentTest,
} from 'pages/Learn/Course/interfaces/CodeAssessment';
import { Section } from 'pages/Learn/Course/interfaces/Section';
import React from 'react';

interface CodeAssessmentEditorProps {
	section: Section;
}

const CodeAssessmentEditor: React.FC<CodeAssessmentEditorProps> = ({
	section,
}) => {
	const { updateSection } = useCourse();

	const autoGrow = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const element = event.target;
		element.style.height = '5px';
		element.style.height = element.scrollHeight + 'px';
		element.style.overflow = 'hidden';
	};

	const handleChangeDescription = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		autoGrow(event);
		const text = event.target.value as string;
		(section as CodeAssessment).description = text;
		updateSection();
	};

	const handleAddTestCase = () => {
		(section as CodeAssessment).tests.push({
			input: '',
			expectedOutput: '',
		});
		updateSection();
	};

	const handleChangeTestCaseInput = (
		test: CodeAssessmentTest,
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const text = event.target.value as string;
		test.input = text;
		updateSection();
	};

	const handleChangeTestCaseExpectedOutput = (
		test: CodeAssessmentTest,
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const text = event.target.value as string;
		test.expectedOutput = text;
		updateSection();
	};

	return (
		<div>
			<textarea
				className="form-control border-0"
				value={(section as CodeAssessment).description}
				onChange={handleChangeDescription}
				placeholder="Digite a descrição do problema"
			/>
			<div className="mt-3">
				<div className="d-flex justify-content-end align-items-center mb-2">
					<button
						onClick={() => handleAddTestCase()}
						className="btn btn-outline-dark border-0"
					>
						+ Teste
					</button>
				</div>
				{(section as CodeAssessment).tests.map((test, index) => (
					<div className="row my-2" key={index}>
						<div className="col-6">
							<textarea
								placeholder="Entrada"
								className="form-control"
								value={test.input}
								onChange={(event) => handleChangeTestCaseInput(test, event)}
							/>
						</div>
						<div className="col-6">
							<textarea
								placeholder="Saída esperada"
								className="form-control"
								value={test.expectedOutput}
								onChange={(event) =>
									handleChangeTestCaseExpectedOutput(test, event)
								}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default CodeAssessmentEditor;
