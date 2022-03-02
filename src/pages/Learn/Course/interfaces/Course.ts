import { Chapter } from './Chapter';

export interface Course {
	title: string;
	_id?: string;
	chapters: Chapter[];
}
