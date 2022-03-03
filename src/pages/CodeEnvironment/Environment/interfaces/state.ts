export interface State {
	timestamp: number;
	code: {
		source_code: string;
		language_id: number;
		stdin: string;
	};
	id: string;
	parent_commit: string;
	message: string;
	username: string;
}
