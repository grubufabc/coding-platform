import { Section } from './Section';

export interface CodeAssessmentTest {
    input: string;
    expectedOutput: string;
}

export interface CodeAssessment extends Section {
    type: 'code-assessment';
    description: string;
    tests: CodeAssessmentTest[];
}