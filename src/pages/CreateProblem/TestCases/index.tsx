import React from 'react'
import { TestCase } from '..'
import TextArea from '../../../components/Form/TextArea'


interface TestCasesProps {
    testCases: TestCase[]
    setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>
}


const TestCases: React.FC<TestCasesProps> = ({ testCases, setTestCases }) => {
    const [stdin, setStdin] = React.useState<string>('')
    const [stdout, setStdout] = React.useState<string>('')
    
    const handleAddTestCase = () => {
        if (stdin.length > 0 && stdout.length > 0) {
            setTestCases([...testCases, { stdin: stdin, expectedStdout: stdout, visible: false}])
        }
    }

    const handleChangeVisibilityTestCase = (testCase: TestCase, visible: any) => {
        testCase.visible = visible
        setTestCases([...testCases])
    }

    const handleRemoveTestCase = (index: number) => {
        setTestCases(testCases.filter((_, i) => i !== index))
    }


    return (
        <React.Fragment>
            <h1 className="mb-5">Test cases</h1>
            <div className="d-grid d-md-flex justify-content-end mb-4" role="group">
                <button onClick={handleAddTestCase} className="btn mx-2 btn-secondary">Adicionar</button>
            </div>
            <div className="row mb-5">
                <div className="col">
                    <TextArea
                        value={stdin}
                        onChange={setStdin}
                        label={{ text: 'Entrada', id: 'test-case-stdin' }}
                        rows={5}
                    />
                </div>
                <div className="col">
                    <TextArea
                        value={stdout}
                        onChange={setStdout}
                        label={{ text: 'Saída esperada', id: 'test-case-stdout' }}
                        rows={5}
                    />
                </div>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída esperada</th>
                            <th scope="col">Tipo</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {testCases.map((testCase, index) => (
                            <tr key={index}>
                                <th className="align-middle text-center" scope="row">{index + 1}</th>
                                <td className="align-middle">
                                    <TextArea rows={4} value={testCase.stdin} disabled={true} />
                                </td>
                                <td className="align-middle">
                                    <TextArea rows={4} value={testCase.expectedStdout} disabled={true} />
                                </td>
                                <td className="align-middle">
                                    <div className="form-check">
                                        <input 
                                            onChange={({ target }) => handleChangeVisibilityTestCase(testCase, target.checked)} 
                                            className="form-check-input" 
                                            type="checkbox"
                                            checked={testCase.visible}
                                            id={`test-${index}`} 
                                        />
                                        <label className ="form-check-label" htmlFor={`test-${index}`}>exemplo</label>
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    <button
                                        onClick={() => handleRemoveTestCase(index)}
                                        className="btn text-danger btn-lg"
                                    >&times;</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default TestCases
