import { Commit } from '../../interfaces/commit';

interface CommitDisplayProps {
	commit: Commit;
	setSelectedCommitId: (commit_id: string) => void;
	active: boolean;
}

const CommitDisplay: React.FC<CommitDisplayProps> = ({
	commit,
	setSelectedCommitId,
	active,
}) => {
	const date = new Intl.DateTimeFormat('pt-BR', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}).format(new Date(commit.timestamp));

	const formatCommitId = (commit_id: string) => {
		const commit_id_parts = commit_id.split('-');
		return commit_id_parts[4];
	};

	return (
		<button
			className={`list-group-item list-group-item-action ${
				active ? 'active' : ''
			}`}
			onClick={() => setSelectedCommitId(commit.id)}
		>
			<div className="d-flex w-100 justify-content-between">
				<h5 className="mb-1">
					<strong>{date}</strong>
				</h5>
			</div>
			<p className="mb-1">{commit.message}</p>
			<small className={`${!active ? 'text-muted' : ''}`}>
				Autor: {commit.username}
			</small>{' '}
			<br />
			<small>
				<span className={`${!active ? 'text-muted' : ''}`}>hash:</span>
				<span
					style={{
						backgroundColor: '#e9ecef',
					}}
					className="ms-2 py-1 px-2 rounded-2 font-monospace fw-bold text-dark"
				>
					{formatCommitId(commit.id)}
				</span>
			</small>
		</button>
	);
};

export default CommitDisplay;
