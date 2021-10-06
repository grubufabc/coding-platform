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

const GenericView: React.FC<GenericViewProps> = ({ label, data }) => {
    return (
        <div>
            <h5>{label}</h5>
            <pre>
                <code>{data}</code>
            </pre>
        </div>
    )
}


const SubmissionDetail: React.FC<SubmissionDetailProps> = ({ submission, index }) => {

    const { judgeResult, sourceCode } = submission
    const { veredict, testCases } = judgeResult
    const elementRef = React.useRef(null)

    const getClassFromStatus = (status: string) => {
        if (status === 'Accepted') return 'text-success'
        return 'text-danger'
    }

    const handleOpenClose = () => {
        const element = elementRef.current
        if(!element) return
        new bootstrap.Collapse(element)
    }
 
    return (
        <div className="border border-1 p-3 rounded rounded-3 mb-4">
            <div className="d-grid">
                <button className="btn" onClick={handleOpenClose}>
                    <h3 className="d-flex justify-content-between">
                        <span> Submissão #{index + 1}</span>
                        <span
                            className={getClassFromStatus(veredict)}
                        >
                            {veredict}
                        </span>
                    </h3>
                </button>
            </div>
            <div className="collapse mt-4" ref={elementRef}>

                <GenericView label={'Código Fonte'} data={sourceCode} />
                {testCases.map((testCase, index) => (
                    <div key={index} className="mb-5 border border-1 p-2 rounded rounded-3">
                        <h4 className="d-flex justify-content-between">
                            <span>Test case #{index + 1}</span>
                            <span
                                className={getClassFromStatus(testCase.veredict)}
                            >
                                {testCase.veredict}
                            </span>
                        </h4>
                        <GenericView label={'Input'} data={testCase.input} />
                        <GenericView label={'Expected Output'} data={testCase.expectedOutput} />

                        {testCase.compile_output && <GenericView label={'Compile Output'} data={testCase.compile_output} />}
                        {testCase.stderr && <GenericView label={'Stderr'} data={testCase.stderr} />}
                        {testCase.stdout && <GenericView label={'Stdout'} data={testCase.stdout} />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubmissionDetail
