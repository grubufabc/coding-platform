import ClockHistoryIcon from './ClockHistoryIcon';
import CommitDisplay from './CommitDisplay';
import { buildGraphFromCommits } from '../CommitTreeSection';
import React from 'react';
import BranchesSection from './BranchesSection';
import { useToast } from '../../../../hooks/useToast';
import { useIDE } from '../IDESection/useIDE';
import { useCodeEnvironment } from '../../../../hooks/useCodeEnvironment';

interface CommitsSectionProps {
	selectedCommitId: string;
	setSelectedCommitId: (commit_id: string) => void;
	username: string;
}

const CommitsSection: React.FC<CommitsSectionProps> = ({
	selectedCommitId,
	setSelectedCommitId,
	username,
}) => {
	const [commitMessage, setCommitMessage] = React.useState<string>('');
	const { setMessage: ToastSetMessage } = useToast();
	const { sourceCode, languageId, stdin } = useIDE();
	const { codeEnvironment, commitCodeEnvironment } = useCodeEnvironment();
	const { states } = codeEnvironment;

	const handleCommit = async () => {
		if (!languageId) {
			ToastSetMessage({
				title: 'Erro durante o commit',
				body: 'Selecione uma linguagem de programação',
				icon: '❌',
			});
			return;
		}

		if (!username) {
			ToastSetMessage({
				title: 'Erro durante o commit',
				body: 'Digite seu nome para o commit',
				icon: '❌',
			});
			return;
		}

		if (!commitMessage) {
			ToastSetMessage({
				title: 'Erro durante o commit',
				body: 'Digite uma mensagem para o commit',
				icon: '❌',
			});
			return;
		}

		commitCodeEnvironment({
			code: {
				source_code: sourceCode,
				language_id: languageId,
				stdin,
			},
			parent_commit: selectedCommitId,
			message: commitMessage,
			username,
		});

		ToastSetMessage({
			title: 'Sucesso!',
			body: 'Commit realizado com sucesso',
			icon: '✅',
		});

		setCommitMessage('');
	};

	return (
		<div>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Descrição da mudança"
					onChange={(event) => setCommitMessage(event.target.value)}
					value={commitMessage}
				/>
				<button className="btn btn-success px-3" onClick={handleCommit}>
					Commit
				</button>
			</div>

			<div>
				<BranchesSection
					graph={buildGraphFromCommits(states).graph}
					selectedCommitId={selectedCommitId}
					setSelectedCommitId={setSelectedCommitId}
					commits={states}
				/>
			</div>

			<div className="mb-5 pb-5">
				<h4 className="mt-4">
					<ClockHistoryIcon />
					<span className="mx-2">{states.length}</span>
					{states.length > 1 ? 'Commits' : 'Commit'}
				</h4>

				<div className="list-group">
					{[...states].reverse().map((commit, index) => (
						<CommitDisplay
							key={index}
							active={commit.id === selectedCommitId}
							setSelectedCommitId={setSelectedCommitId}
							commit={commit}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommitsSection;
