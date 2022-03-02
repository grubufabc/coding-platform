import React from 'react';
import { State } from '../interfaces/state';
import CommitTree from './CommitTree';
import './style.css';

interface CommitTreeSectionProps {
	states: State[];
	setSelectedCommitId: (commit_id: string) => void;
	selectedCommitId: string;
}

const buildGraphFromCommits = (commits: State[]) => {
	const graph = new Map<string, string[]>();
	let root: string = '';

	for (const commit of commits) {
		if (!commit.parent_commit) {
			root = commit.id;
			continue;
		}

		if (!graph.has(commit.id)) {
			graph.set(commit.id, []);
		}

		if (!graph.has(commit.parent_commit)) {
			graph.set(commit.parent_commit, []);
		}
		const children = graph.get(commit.parent_commit) || [];
		children.push(commit.id);
		graph.set(commit.parent_commit, children);
	}

	return { root, graph };
};

const CommitTreeSection: React.FC<CommitTreeSectionProps> = ({
	states,
	setSelectedCommitId,
	selectedCommitId,
}) => {
	return (
		<div className="mt-5">
			<h5>Árvore de commits</h5>
			<nav className="commit-tree">
				<ul>
					<CommitTree
						selectedCommitId={selectedCommitId}
						setSelectedCommitId={setSelectedCommitId}
						{...buildGraphFromCommits(states)}
						commits={states}
					/>
				</ul>
			</nav>
		</div>
	);
};

export default CommitTreeSection;
export { buildGraphFromCommits };
