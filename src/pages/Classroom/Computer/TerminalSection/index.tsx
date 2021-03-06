import { useIDE } from 'hooks/useIDE';

const TerminalSection = () => {
	const { stdin, setStdin, stdout, errorMessage, time, memory } = useIDE();

	return (
		<div className="collapse" id="terminal">
			<div
				className="border-top border-5 border-dark d-flex"
				style={{ height: '20rem' }}
			>
				<div className="w-50 px-3 pt-3">
					<h5 className="p-0 m-0 py-2">stdin</h5>
					<textarea
						className="form-control"
						rows={9}
						onChange={(e) => setStdin(e.target.value)}
						value={stdin}
					/>
				</div>
				<div className="w-50 px-3 pt-3">
					<div className="d-flex align-items-center mb-2">
						<h5 className="p-0 m-0 me-auto">stdout</h5>
						<span
							style={{
								backgroundColor: '#e9ecef',
							}}
							className="ms-2 py-1 px-2 rounded-2 font-monospace fw-bold text-dark"
						>
							{time}s
						</span>
						<span
							style={{
								backgroundColor: '#e9ecef',
							}}
							className="ms-2 py-1 px-2 rounded-2 font-monospace fw-bold text-dark"
						>
							{memory}kb
						</span>
					</div>
					<textarea
						className={`form-control ${
							errorMessage ? 'bg-danger text-white' : ''
						}`}
						rows={9}
						disabled={true}
						value={errorMessage ? errorMessage : stdout}
					/>
				</div>
			</div>
		</div>
	);
};

export default TerminalSection;
