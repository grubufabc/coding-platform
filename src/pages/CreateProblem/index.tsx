import React from 'react'
import TextArea from '../../components/Form/TextArea'
import IDE from '../../components/IDE'
import MarkdownEditor, { MarkdownEditorHandles } from '../../components/MarkdownEditor'
import MarkdownRender from '../../components/MarkdownRender'
import ProgressSteps, { ProgressStep } from '../../components/ProgressSteps'
import { Language } from '../../models/language'
import TestCases from './TestCases'

interface Solution {
    code: string,
    language: Language
}

export interface TestCase {
    stdin: string,
    expectedStdout: string
    visible: boolean
}


const CreateProblem: React.FC = () => {
    const markdownEditorRef = React.useRef<MarkdownEditorHandles>(null)

    const [description, setDescription] = React.useState<string>('')
    const [solution, setSolution] = React.useState<Solution>()
    const [testCases, setTestCases] = React.useState<TestCase[]>([])


    const handleCreateProblem = () => {

        console.log(markdownEditorRef.current?.getText())
    }

    return (
        <div className="col-8">
            <ProgressSteps>
                <ProgressStep>
                    <h1 className="mb-5">Descrição do problema</h1>
                    <MarkdownEditor onChange={setDescription} ref={markdownEditorRef} />
                </ProgressStep>
                <ProgressStep>
                    <h1 className="mb-5">Solução</h1>
                    <IDE />
                </ProgressStep>
                <ProgressStep>
                    <TestCases testCases={testCases} setTestCases={setTestCases} />
                </ProgressStep>
                <ProgressStep>
                    <div className="d-grid d-flex justify-content-between mb-5" role="group">
                        <h1>Review</h1>
                        <button onClick={handleCreateProblem} className="btn btn-lg px-5 btn-primary">Finalizar</button>
                    </div>

                    <div className="row mb-5">
                        <MarkdownRender text={description} />
                    </div>
                    <div className="row">
                        <h5 className="mb-3">Exemplos</h5>
                        {testCases.filter((testCase) => testCase.visible).map((testCase, index) => (
                            <div className="mb-3" key={index}>
                                <div className="card mb-3">
                                    <div>
                                        <div className="card-header">
                                            Entrada
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <pre>
                                                    <code>
                                                        {testCase.stdin}
                                                    </code>
                                                </pre>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="card-header">
                                            Saída experada
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <pre>
                                                    <code>
                                                        {testCase.expectedStdout}
                                                    </code>
                                                </pre>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </ProgressStep>
            </ProgressSteps>
        </div>
    )
}

export default CreateProblem
