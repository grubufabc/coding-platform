import React from 'react';
import { Submission } from '..';
import SubmissionDetail from './SubmissionDetail';

interface ListSubmissionsProps {
	lastSubmissions: Submission[];
}

const ListSubmissions: React.FC<ListSubmissionsProps> = ({
	lastSubmissions,
}) => {
	return (
		<div className="mt-3">
			<h1>Submissões</h1>
			{lastSubmissions.map((submission, index) => (
				<SubmissionDetail key={index} submission={submission} index={index} />
			))}
		</div>
	);
};

export default ListSubmissions;
