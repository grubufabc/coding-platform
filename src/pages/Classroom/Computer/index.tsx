import React from 'react';
import TerminalIcon from 'pages/CodeEnvironment/Environment/icons/TerminalIcon';
import PlayIcon from 'pages/CodeEnvironment/Environment/icons/PlayIcon';
import PersonIcon from 'pages/CodeEnvironment/Environment/icons/PersonIcon';

import IDE from './IDE';
import Toolbar from './Toolbar';
import TerminalSection from './TerminalSection';
import { useIDE } from 'hooks/useIDE';
import './style.css';
import { useClassroom } from 'hooks/useClassroom';
import { useCodeEnvironment } from 'hooks/useCodeEnvironment';
import { useToast } from 'hooks/useToast';

const FileCheckIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			style={{ width: '2rem', height: '2rem' }}
			fill="currentColor"
			className="bi bi-file-earmark-check"
			viewBox="0 0 16 16"
		>
			<path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
			<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
		</svg>
	);
};

const Computer: React.FC = () => {
	const { loading, runCode } = useIDE();
	const { computerName, changeComputerName, classroomName } = useClassroom();
	const {
		codeEnvironment,
		commitCodeEnvironment,
		createCodeEnvironmentWithData,
	} = useCodeEnvironment();
	const { sourceCode, languageId, stdin } = useIDE();
	const { setMessage: ToastSetMessage } = useToast();

	const handleSaveEnvironment = async () => {
		if (!languageId) {
			ToastSetMessage({
				title: 'Erro durante ao salvar',
				body: 'Selecione uma linguagem de programação',
				icon: '❌',
			});
			return;
		}
		ToastSetMessage({
			title: 'Salvando...',
			body: 'Salvando ambiente, aguarde...',
			icon: '⏳',
		});
		let id;
		if (codeEnvironment._id === '') {
			id = (
				await createCodeEnvironmentWithData(
					{
						source_code: sourceCode,
						language_id: languageId,
						stdin,
					},
					`${classroomName} | ${computerName}`
				)
			)._id;
		} else {
			id = (
				await commitCodeEnvironment({
					parent_commit:
						codeEnvironment.states[codeEnvironment.states.length - 1].id,
					message: `Versão ${codeEnvironment.states.length + 1}`,
					username: 'Anônimo',
					code: {
						source_code: sourceCode,
						language_id: languageId,
						stdin,
					},
				})
			)._id;
		}
		ToastSetMessage({
			title: 'Sucesso',
			body: 'Código salvo com sucesso!',
			icon: '✅ ',
		});
		window.open(`/code-environment/${id}`, '_blank', 'noopener,noreferrer');
	};

	const handleChangeComputerName = (name: string) => {
		changeComputerName(name);
	};

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
								{computerName}
							</button>
							<div
								className="dropdown-menu"
								aria-labelledby="dropdownMenuButton1"
								style={{ width: '15rem' }}
							>
								<input
									className="form-control"
									placeholder="Digite o nome do usuário"
									onChange={(e) => handleChangeComputerName(e.target.value)}
									value={computerName}
								/>
							</div>
						</div>
					</div>
					<div className="d-flex">
						<button
							className="btn d-flex my-2 px-4 align-items-center me-2"
							style={{ backgroundColor: '#e9ecef' }}
							onClick={() => handleSaveEnvironment()}
						>
							<FileCheckIcon />
						</button>
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
