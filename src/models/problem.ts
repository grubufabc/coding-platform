import { TestCase } from './../pages/CreateProblem/index'

export interface Problem {
    description: string
    testCases: TestCase[]
    title: string
    _id?: string
}
