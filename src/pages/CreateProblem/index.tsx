import React from 'react'
import IDE from '../../components/IDE'
import MarkdownEditor from '../../components/MarkdownEditor'
import ProgressSteps, { ProgressStep, ProgressStepsHandles } from '../../components/ProgressSteps'
import TestCases from './TestCases'


const CreateProblem: React.FC = () => {
    const progressStepsRef = React.useRef<ProgressStepsHandles>(null)


    return (
        <div className="col-8">
            <ProgressSteps ref={progressStepsRef}>
                <ProgressStep>
                    <MarkdownEditor />
                </ProgressStep>
                <ProgressStep>
                    <h1 className="mb-5">Solução</h1>
                    <IDE />
                </ProgressStep>
                <ProgressStep>
                    <TestCases />
                </ProgressStep>
            </ProgressSteps>
        </div>
    )
}

export default CreateProblem
