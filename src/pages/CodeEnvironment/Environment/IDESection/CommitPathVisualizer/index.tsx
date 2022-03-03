import React from 'react';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

interface CommitPathVisualizerProps {
	commitPath: string[];
	setSelectedCommitId: (commit_id: string) => void;
	selectedCommitId: string;
}

const CommitPathVisualizer: React.FC<CommitPathVisualizerProps> = ({
	commitPath,
	setSelectedCommitId,
	selectedCommitId,
}) => {
	const [value, setValue] = React.useState<number>(0);

	const formatCommitId = (commit_id: string) => {
		const commit_id_parts = commit_id.split('-');
		return commit_id_parts[4];
	};

	React.useEffect(() => {
		setValue(commitPath.length);
	}, [commitPath]);

	React.useEffect(() => {
		for (let i = 0; i < commitPath.length; i++) {
			if (commitPath[i] === selectedCommitId) {
				setValue(i + 0.6);
				break;
			}
		}
	}, [commitPath, selectedCommitId]);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		let value = Number(event.currentTarget.value);
		if (value === commitPath.length) {
			value -= 0.02;
		}
		setValue(value);
		setSelectedCommitId(commitPath[Math.floor(value)]);
	};

	return (
		<div className="d-inline-flex border-bottom border-2">
			<div className="ms-2 pb-2">
				<div className="d-block">
					<input
						type="range"
						className="form-range"
						onChange={handleChange}
						min={0}
						max={commitPath.length}
						step={0.1}
						value={value}
					/>
				</div>
				{commitPath.map((commit_id, index) => (
					<React.Fragment key={index}>
						<button
							className="btn px-0"
							type="button"
							onClick={() => setSelectedCommitId(commit_id)}
						>
							<ChevronRightIcon />
							<span
								style={{
									backgroundColor:
										commit_id === selectedCommitId ? '#e9ecef' : '',
								}}
								className="p-2 m-0 rounded-3 font-monospace"
							>
								{formatCommitId(commit_id)}
							</span>
						</button>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default CommitPathVisualizer;
