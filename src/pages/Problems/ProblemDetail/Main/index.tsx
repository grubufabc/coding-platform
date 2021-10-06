import React from 'react'
import IDE, { IDEHandles } from '../../../../components/IDE'
import MarkdownRender from '../../../../components/MarkdownRender'
import TestCaseItem from '../../../../components/TestCaseItem'
import { Problem } from '../../../../models/problem'

interface MainProps {
    problem: Problem | undefined
    IDERef: React.RefObject<IDEHandles>
    handleSubmit: () => Promise<void>
}

const Main: React.FC<MainProps> = ({ problem, IDERef, handleSubmit, }) => {

    if(problem === undefined) return null

    return (
        <React.Fragment>
            <h1 className="mb-5">{problem.title}</h1>

            <MarkdownRender text={problem?.description || ''} />
            <div className="my-5">
                {problem.testCases.filter(({ visible }) => visible).map(({ input, expectedOutput }, index) => {
                    return (
                        <div className="mb-3" key={index}>
                            <TestCaseItem input={input} expectedOutput={expectedOutput} />
                        </div>
                    )
                })}
            </div>
            <IDE ref={IDERef} />

            <button onClick={handleSubmit} className="btn btn-outline-dark btn-lg mt-3">Enviar solução</button>
        </React.Fragment>
    )
}

export default Main
