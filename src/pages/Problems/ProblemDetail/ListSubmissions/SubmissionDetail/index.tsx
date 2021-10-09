import React from 'react'
import { Submission } from '../..'


declare var bootstrap: any

interface SubmissionDetailProps {
    submission: Submission
    index: number
}

interface GenericViewProps {
    label: string,
    data: string
}

interface CollapsableProps {
    label: React.ReactElement
    content: React.ReactNode
}

const GenericView: React.FC<GenericViewProps> = ({ label, data }) => {
    return (
        <div>
            <h6>{label}</h6>
            <pre>
                <code>{data}</code>
            </pre>
        </div>
    )
}

const Collapsable: React.FC<CollapsableProps> = ({ label, content }) => {
    const elementRef = React.useRef(null)

    const handleOpenClose = () => {
        const element = elementRef.current
        if (!element) return
        new bootstrap.Collapse(element)
    }

    return (
        <div className="border border-1 p-3 rounded rounded-3 mb-4">
            <div className="d-grid">
                <button className="btn px-0" onClick={handleOpenClose}>
                    <h5 className="d-flex justify-content-between p-0 m-0">
                        {label.props.children}
                    </h5>
                </button>
            </div>
            <div className="collapse mt-4" ref={elementRef}>
                {content}
            </div>
        </div>
    )
}

const SVGArrowDown: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
    )
}


const SubmissionDetail: React.FC<SubmissionDetailProps> = ({ submission, index }) => {

    const { judgeResult, sourceCode } = submission
    const { veredict, testCases } = judgeResult

    const getClassFromStatus = (status: string) => {
        if (status === 'Accepted') return 'text-success'
        return 'text-danger'
    }

    return (
        <Collapsable
            label={(
                <h5>
                    <span> Submissão #{index + 1}</span>
                    <span
                        className={getClassFromStatus(veredict)}
                    >
                        <span>
                            {veredict}
                        </span>
                        <span className="ms-2">
                            <SVGArrowDown />
                        </span>
                    </span>
                </h5>
            )}
            content={(
                <React.Fragment>
                    <GenericView label={'Código Fonte'} data={sourceCode} />
                    {testCases.map((testCase, index) => (
                        <Collapsable
                            key={index}
                            label={(
                                <h6 className="d-flex justify-content-between">
                                    <span>Test case #{index + 1}</span>
                                    <span
                                        className={getClassFromStatus(testCase.veredict)}
                                    >
                                        <span>
                                            {testCase.veredict}
                                        </span>
                                        <span className="ms-2">
                                            <SVGArrowDown />
                                        </span>

                                    </span>
                                </h6>
                            )}
                            content={(
                                <React.Fragment>
                                    <GenericView label={'Input'} data={testCase.input} />
                                    <GenericView label={'Expected Output'} data={testCase.expectedOutput} />

                                    {testCase.compile_output && <GenericView label={'Compile Output'} data={testCase.compile_output} />}
                                    {testCase.stderr && <GenericView label={'Stderr'} data={testCase.stderr} />}
                                    {testCase.stdout && <GenericView label={'Stdout'} data={testCase.stdout} />}
                                </React.Fragment>
                            )}
                        />
                    ))}
                </React.Fragment>
            )}
        />
    )
}

export default SubmissionDetail
