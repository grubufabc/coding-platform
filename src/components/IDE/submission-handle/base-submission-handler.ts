import { StdoutState } from './stdout-state';
import React from 'react';
import { Submission } from '../../../models/submission';

export abstract class BaseSubmissionHandler {
	protected nextHandler: BaseSubmissionHandler | null = null;

	setNextHandler(handler: BaseSubmissionHandler): BaseSubmissionHandler {
		this.nextHandler = handler;
		return handler;
	}

	handle(
		submission: Submission,
		setStdout: React.Dispatch<React.SetStateAction<StdoutState>>
	) {
		if (this.nextHandler) this.nextHandler.handle(submission, setStdout);
	}
}
