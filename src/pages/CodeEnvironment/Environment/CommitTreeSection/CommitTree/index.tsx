import React from 'react';
import Popover from '../../../../../components/Popover';
import AsteriskIcon from '../../icons/AsteriskIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';
import EyeFillIcon from '../../icons/EyeFillIcon';
import EyeIcon from '../../icons/EyeIcon';
import { State } from '../../interfaces/state';
import ReactDOMServer from 'react-dom/server';

interface CommitTreeProps {
	graph: Map<string, string[]>;
	root: string;
	setSelectedCommitId: (commit_id: string) => void;
	selectedCommitId: string;
	commits: State[];
}

const CommitTreePopover = (commit?: State) => {
	if (!commit) {
		return <div></div>;
	}

	const date = new Intl.DateTimeFormat('pt-BR', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}).format(new Date(commit.timestamp));

	return (
		<div>
			<small>{commit.message}</small>
			<br />
			<small className="text-muted">
				autor:
				<span className="ms-2">{commit.username}</span>
			</small>
			<br />
			<small className="text-muted">
				data:
				<span className="ms-2">{date}</span>
			</small>
		</div>
	);
};

const CommitTree: React.FC<CommitTreeProps> = ({
	graph,
	root,
	setSelectedCommitId,
	selectedCommitId,
	commits,
}) => {
	const [expanded, setExpanded] = React.useState<boolean>(false);

	const handleClick = () => {
		setExpanded(!expanded);
	};

	const formatCommitId = (commit_id: string) => {
		const commit_id_parts = commit_id.split('-');
		return commit_id_parts[4];
	};

	return (
		<li className={`${expanded ? 'open' : ''}`}>
			<div className="d-flex align-items-center">
				<button onClick={handleClick} className="btn p-0">
					<span className="px-2" style={{ color: 'green' }}>
						{(graph.get(root) || []).length > 0 ? (
							expanded ? (
								<ChevronDownIcon />
							) : (
								<ChevronRightIcon />
							)
						) : (
							<AsteriskIcon />
						)}
					</span>
				</button>

				<Popover
					content={ReactDOMServer.renderToString(
						CommitTreePopover(commits.find((c) => c.id === root))
					)}
					html={true}
				>
					<button
						onClick={() => setSelectedCommitId(root)}
						className="btn p-0 d-flex align-items-center"
					>
						<span className="nav-link p-0 m-0 pe-3 ps-1">
							{formatCommitId(root)}
						</span>
						{selectedCommitId === root ? <EyeFillIcon /> : <EyeIcon />}
					</button>
				</Popover>
			</div>
			<ul className="commit-tree-node">
				{(graph.get(root) || []).map((children, index) => (
					<CommitTree
						key={index}
						selectedCommitId={selectedCommitId}
						setSelectedCommitId={setSelectedCommitId}
						graph={graph}
						root={children}
						commits={commits}
					/>
				))}
			</ul>
		</li>
	);
};

export default CommitTree;
