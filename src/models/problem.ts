import { TestCase } from '../pages/Admin/CreateProblem/index';

export interface Problem {
	description: string;
	testCases: TestCase[];
	title: string;
	_id?: string;
}
