import { Submission } from '../../../models/submission';
import { BaseSubmissionHandler } from './base-submission-handler';
import { StdoutState } from './stdout-state';

export class TimeLimitExceededHandler extends BaseSubmissionHandler {
	handle(
		submission: Submission,
		setStdout: React.Dispatch<React.SetStateAction<StdoutState>>
	) {
		if (
			submission.status &&
			submission.status.description === 'Time Limit Exceeded'
		) {
			setStdout({
				message: `Time Limit Exceeded`,
				error: true,
			});
		} else super.handle(submission, setStdout);
	}
}
