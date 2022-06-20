import { useClassroom } from 'hooks/useClassroom';
import { useNavigate } from 'react-router';

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

interface StudentCardProps {
	studentInfo: {
		name: string;
		id: string;
	};
}

const StudentCard: React.FC<StudentCardProps> = ({ studentInfo }) => {
	const navigate = useNavigate();
	const { classroomName } = useClassroom();

	const handleAccessComputer = () => {
		navigate(`/classroom?room=${classroomName}&computer=${studentInfo.id}`);
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

export default StudentCard;
