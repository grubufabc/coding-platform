import Header from 'components/Header';
import { ClassroomProvider, useClassroom } from 'hooks/useClassroom';
import { IDEProvider } from 'hooks/useIDE';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Computer from './Computer';
import StudentCard from './StudentCard';

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

const Main = () => {
	const { classroomName, createComputer, computers } = useClassroom();
	const navigate = useNavigate();

	const handleCreateComputer = () => {
		const computerId = createComputer();
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
			joinRoom(roomParam);
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
		navigate(`/classroom?room=${userClassroomName}`);
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
