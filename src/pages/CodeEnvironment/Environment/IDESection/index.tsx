import React from 'react';
import Terminal from '../../../../components/Terminal';
import CommitPathVisualizer from './CommitPathVisualizer';
import IDE from './IDE';

interface TerminalSectionProps {}

const TerminalSection: React.FC<TerminalSectionProps> = () => {
	return (
		<div className="collapse" id="terminal">
			<Terminal />
		</div>
	);
};

interface IDESectionProps {
	commitPath: string[];
	setSelectedCommitId: (commit_id: string) => void;
	selectedCommitId: string;
}

const IDESection: React.FC<IDESectionProps> = ({
	commitPath,
	setSelectedCommitId,
	selectedCommitId,
}) => {
	return (
		<div className="d-flex flex-column h-100">
			<CommitPathVisualizer
				commitPath={commitPath}
				setSelectedCommitId={setSelectedCommitId}
				selectedCommitId={selectedCommitId}
			/>
			<IDE />
			<TerminalSection />
		</div>
	);
};

export default IDESection;
