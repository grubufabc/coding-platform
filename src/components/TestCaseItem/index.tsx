import React from 'react';

interface TestCaseItemProps {
	input: string;
	expectedOutput: string;
}

const TestCaseItem: React.FC<TestCaseItemProps> = ({
	input,
	expectedOutput,
}) => {
	const copyToClipBoard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	return (
		<div className="card">
			<div>
				<div
					className="card-header d-grid d-flex justify-content-between"
					role="group"
				>
					<span className="mt-1">Entrada</span>
					<button
						onClick={() => copyToClipBoard(input)}
						className="btn btn-outline-dark"
					>
						copiar
					</button>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<pre>
							<code>{input}</code>
						</pre>
					</li>
				</ul>
			</div>
			<div>
				<div
					className="card-header d-grid d-flex justify-content-between"
					role="group"
				>
					<span className="mt-1">Saída esperada</span>
					<button
						onClick={() => copyToClipBoard(expectedOutput)}
						className="btn btn-outline-dark"
					>
						copiar
					</button>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<pre>
							<code>{expectedOutput}</code>
						</pre>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TestCaseItem;
