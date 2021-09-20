import React from 'react'
import IDE from '../../components/IDE'
import MarkdownEditor from '../../components/MarkdownEditor'
import MarkdownRender from '../../components/MarkdownRender'
import ProgressSteps, { ProgressStep, ProgressStepsHandles } from '../../components/ProgressSteps'
import { Language } from '../../models/language'
import TestCases from './TestCases'

interface Solution {
    code: string,
    language: Language
}


const CreateProblem: React.FC = () => {
    const progressStepsRef = React.useRef<ProgressStepsHandles>(null)
    const [description, setDescription] = React.useState<string>('')
    const [solution, setSolution] = React.useState<Solution>()


    const handleCreateProblem = () => {
        console.log('clicked')
    }

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
                <ProgressStep>
                    <h1>Review</h1>
                    <MarkdownRender text={'teasdakdaksdkandknadnkandkanskn'}/>
                    <button onClick={handleCreateProblem} className="btn btn-primary">Criar problema</button>
                </ProgressStep>
            </ProgressSteps>
        </div>
    )
}

export default CreateProblem
