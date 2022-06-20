import Header from 'components/Header';
import { ClassroomProvider, useClassroom } from 'hooks/useClassroom';
import { IDEProvider } from 'hooks/useIDE';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Computer from './Computer';

const PCIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
			fill="currentColor"
			className="bi bi-pc-display-horizontal"
			viewBox="0 0 16 16"
		>
			<path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z" />
		</svg>
	);
};

const ArrowRight = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className="bi bi-arrow-right"
			viewBox="0 0 16 16"
		>
			<path
				fillRule="evenodd"
				d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
			/>
		</svg>
	);
};

const PlusCircle = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			fill="currentColor"
			className="bi bi-plus-circle"
			viewBox="0 0 16 16"
		>
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
			<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
		</svg>
	);
};

interface ComputerInfo {
	name: string;
	id: string;
}

interface StudentCardProps {
	studentInfo: ComputerInfo;
}

const StudentCard: React.FC<StudentCardProps> = ({ studentInfo }) => {
	const navigate = useNavigate();
	const { classroomName } = useClassroom();

	const handleAccessComputer = () => {
		navigate(`/classroom?room=${classroomName}&computer=${studentInfo.id}`, {
			replace: true,
		});
	};

	return (
		<div className="card ps-3" style={{ width: '20rem' }}>
			<div className="row">
				<div className="col-3">
					<div className="row h-100">
						<div className="col align-self-center">
							<PCIcon />
						</div>
					</div>
				</div>
				<div className="col-9">
					<div className="card-body">
						<h5 className="card-title">{studentInfo.name}</h5>
						<div className="row justify-content-end">
							<div className="col-auto">
								<button
									onClick={() => handleAccessComputer()}
									className="mt-2 btn btn-outline-dark border-0 p-1 px-3"
								>
									Acessar
									<span className="ps-2">
										<ArrowRight />
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Main = () => {
	const { classroomName, createComputer, computers } = useClassroom();
	const navigate = useNavigate();

	const handleCreateComputer = () => {
		const computerId = createComputer();
		console.log(`handleCreateComputer: ${computerId}`);
		navigate(`/classroom?room=${classroomName}&computer=${computerId}`, {
			replace: true,
		});
	};

	return (
		<div className="p-5">
			<h1>Sala: {classroomName}</h1>
			<div className="row justify-content-end mb-3">
				<div className="col-auto">
					<button
						onClick={() => handleCreateComputer()}
						className="btn btn-outline-dark border-0"
					>
						<PlusCircle />
					</button>
				</div>
			</div>
			<div className="row g-5">
				{computers.map((computer) => (
					<div className="col-auto" key={computer.id}>
						<StudentCard studentInfo={computer} />
					</div>
				))}
			</div>
		</div>
	);
};

const ClassroomWrapper: React.FC = () => {
	const [userClassroomName, setUserClassroomName] = React.useState('');
	const navigate = useNavigate();

	const location = useLocation();
	const {
		computerId,
		setComputerId,
		classroomName,
		joinRoom,
		joinEnvironment,
	} = useClassroom();

	React.useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const roomParam = queryParams.get('room') || '';
		const computerParam = queryParams.get('computer') || '';

		if (roomParam !== classroomName) {
			setUserClassroomName(roomParam);
			if (roomParam !== '') {
				joinRoom(roomParam);
			}
		}

		if (computerParam !== computerId) {
			setComputerId(computerParam);
			if (computerParam !== '') {
				joinEnvironment(computerParam);
			}
		}
	}, [
		classroomName,
		computerId,
		joinEnvironment,
		joinRoom,
		location.search,
		setComputerId,
	]);

	const handleJoinClassroom = () => {
		joinRoom(userClassroomName);
		navigate(`/classroom?room=${userClassroomName}`, { replace: true });
	};

	return (
		<React.Fragment>
			<Header />
			{!classroomName && (
				<div className="p-5">
					<h1>Sala de aula</h1>
					<div className="mt-5 w-25">
						<input
							value={userClassroomName}
							onChange={(e) => setUserClassroomName(e.target.value)}
							className="form-control"
							placeholder="Nome da sala"
						/>
						<div className="row g-3 mt-3">
							<div className="col d-grid">
								<button
									onClick={() => handleJoinClassroom()}
									className="btn btn-outline-dark mb-3"
								>
									Criar sala
								</button>
							</div>
							<div className="col d-grid">
								<button
									onClick={() => handleJoinClassroom()}
									className="btn btn-outline-dark mb-3"
								>
									Entrar em sala
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{classroomName && computerId && (
				<IDEProvider>
					<Computer />
				</IDEProvider>
			)}
			{classroomName && !computerId && <Main />}
		</React.Fragment>
	);
};

const Classroom: React.FC = () => {
	return (
		<ClassroomProvider>
			<ClassroomWrapper />
		</ClassroomProvider>
	);
};

export default Classroom;
