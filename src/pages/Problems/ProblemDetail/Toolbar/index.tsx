import React from 'react';
import { useIDE } from '../../../../hooks/useIDE';
import PlayIcon from '../../../CodeEnvironment/Environment/icons/PlayIcon';
import TerminalIcon from '../../../CodeEnvironment/Environment/icons/TerminalIcon';

interface ToolbarProps {
	handleSubmit: () => void;
	judging: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ handleSubmit, judging }) => {
	const { runCode, loading } = useIDE();

	return (
		<div
			className="d-flex p-3 justify-content-between"
			style={{ backgroundColor: '#f7f7f7' }}
		>
			<div>
				<button
					className="btn my-2 align-items-center justify-content-center"
					style={{ backgroundColor: '#e9ecef', width: '10rem', height: '3rem' }}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#terminal"
					aria-expanded="false"
					aria-controls="terminal"
				>
					<div className="d-flex align-items-center">
						<TerminalIcon />
						<span className="ms-3">Console</span>
					</div>
				</button>
			</div>

			<div>
				<button
					className="btn my-2 mx-3 align-items-center justify-content-center align-self-end"
					style={{ backgroundColor: '#e9ecef', width: '10rem', height: '3rem' }}
					onClick={() => runCode()}
				>
					{loading ? (
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						<div className="d-flex align-items-center">
							<PlayIcon />
							<span className="ms-3">Executar</span>
						</div>
					)}
				</button>
				<button
					className="btn my-2 align-items-center justify-content-center"
					style={{ backgroundColor: '#e9ecef', width: '10rem', height: '3rem' }}
					onClick={() => handleSubmit()}
				>
					{judging ? (
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						<span>Submeter</span>
					)}
				</button>
			</div>
		</div>
	);
};

export default Toolbar;
