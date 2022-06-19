import Header from 'components/Header';
import { IDEProvider } from 'hooks/useIDE';
import React from 'react';
import { useLocation } from 'react-router';
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
				fill-rule="evenodd"
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
	handleAccessComputer: (id: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
	studentInfo,
	handleAccessComputer,
}) => {
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
									onClick={() => handleAccessComputer(studentInfo.id)}
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

interface MainProps {
	classroomName: string;
	setComputerId: (id: string) => void;
}

const computers: ComputerInfo[] = [
	{
		name: 'Computador 1',
		id: '1',
	},
	{
		name: 'Computador 2',
		id: '2',
	},
	{
		name: 'Computador 3',
		id: '3',
	},
	{
		name: 'Computador 4',
		id: '4',
	},
];

const Main: React.FC<MainProps> = ({ classroomName, setComputerId }) => {
	const handleCreateComputer = () => {};

	const handleAccessComputer = (id: string) => {
		setComputerId(id);
	};

	return (
		<div className="p-5">
			<h1>Sala: {classroomName}</h1>
			<div className="row justify-content-end mb-3">
				<div className="col-auto">
					<button
						onClick={() => handleCreateComputer}
						className="btn btn-outline-dark border-0"
					>
						<PlusCircle />
					</button>
				</div>
			</div>
			<div className="row g-5">
				{computers.map((computer, index) => (
					<div className="col-auto" key={computer.id}>
						<StudentCard
							studentInfo={computer}
							handleAccessComputer={handleAccessComputer}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

const Classroom: React.FC = () => {
	const location = useLocation();
	const [classroomName, setClassroomName] = React.useState('');
	const [computerId, setComputerId] = React.useState('');

	const [tmpClassroomName, setTmpClassroomName] = React.useState('');

	React.useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		setClassroomName(queryParams.get('room') || '');
		setComputerId(queryParams.get('computer') || '');
		console.log(queryParams.get('room'));
		console.log(queryParams.get('computer'));
	}, [location.search]);

	const handleJoinToClassroom = () => {
		setClassroomName(tmpClassroomName);
	};

	const handleCreateClassroom = () => {
		setClassroomName(tmpClassroomName);
	};

	return (
		<React.Fragment>
			<Header />
			{!classroomName && !computerId && (
				<div className="p-5">
					<h1>Sala de aula</h1>
					<div className="mt-5 w-25">
						<input
							value={tmpClassroomName}
							onChange={(e) => setTmpClassroomName(e.target.value)}
							className="form-control"
							placeholder="Nome da sala"
						/>
						<div className="row g-3 mt-3">
							<div className="col d-grid">
								<button
									onClick={() => handleCreateClassroom()}
									className="btn btn-outline-dark mb-3"
								>
									Criar sala
								</button>
							</div>
							<div className="col d-grid">
								<button
									onClick={() => handleJoinToClassroom()}
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
			{classroomName && !computerId && (
				<Main setComputerId={setComputerId} classroomName={classroomName} />
			)}
		</React.Fragment>
	);
};

export default Classroom;
