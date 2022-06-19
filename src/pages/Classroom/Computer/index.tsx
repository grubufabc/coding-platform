import React from 'react';
import TerminalIcon from 'pages/CodeEnvironment/Environment/icons/TerminalIcon';
import PlayIcon from 'pages/CodeEnvironment/Environment/icons/PlayIcon';
import PersonIcon from 'pages/CodeEnvironment/Environment/icons/PersonIcon';

import IDE from './IDE';
import Toolbar from './Toolbar';
import TerminalSection from './TerminalSection';
import { useIDE } from 'hooks/useIDE';
import './style.css';

const Computer: React.FC = () => {
	const [username, setUsername] = React.useState('Anônimo');
	const { loading, runCode } = useIDE();

	return (
		<div className="computer-container">
			<div className="d-flex flex-column h-100">
				<div className="d-flex px-3 justify-content-between">
					<div className="d-flex">
						<div className="dropdown">
							<button
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								className="btn dropdown-toggle d-flex justify-content-center my-2 align-items-center"
								style={{ backgroundColor: '#e9ecef', width: '15rem' }}
							>
								<span className="me-2">
									<PersonIcon />
								</span>
								{username}
							</button>
							<div
								className="dropdown-menu"
								aria-labelledby="dropdownMenuButton1"
								style={{ width: '15rem' }}
							>
								<input
									className="form-control"
									placeholder="Digite o nome do usuário"
									onChange={(e) => setUsername(e.target.value)}
									value={username}
								/>
							</div>
						</div>
					</div>
					<div className="d-flex">
						<button
							className="btn d-flex my-2 px-4 align-items-center me-2"
							style={{ backgroundColor: '#e9ecef' }}
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#terminal"
							aria-expanded="false"
							aria-controls="terminal"
						>
							<TerminalIcon />
						</button>
						<button
							className="btn d-flex my-2 px-4 align-items-center"
							style={{ backgroundColor: '#e9ecef' }}
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
				<div className="flex-grow-1" style={{ overflow: 'hidden' }}>
					<div className="d-flex h-100">
						<div className="flex-grow-1 border-start border-2">
							<div className="d-flex flex-column h-100 computer-main-section">
								<IDE />
								<TerminalSection />
							</div>
						</div>
					</div>
				</div>
				<Toolbar />
			</div>
		</div>
	);
};

export default Computer;
