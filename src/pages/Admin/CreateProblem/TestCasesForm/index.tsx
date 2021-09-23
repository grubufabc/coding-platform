import React from 'react'
import { TestCase } from '..'
import TextArea from '../../../components/Form/TextArea'
import IDE, { IDEHandles } from '../../../components/IDE'


interface TestCasesFormProps {
    testCases: TestCase[]
    setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>
}


const TestCasesForm: React.FC<TestCasesFormProps> = ({ testCases, setTestCases }) => {
    const IDERef = React.useRef<IDEHandles>(null)

    const handleAddTestCase = () => {
        const IDE = IDERef.current
        if(!IDE) return
        
        const input = IDE.getStdin()
        const expectedOutput = IDE.getStdout()
        if(input.length > 0 && expectedOutput.length > 0){
            setTestCases([...testCases, { input, expectedOutput, visible: false}])
            IDE.cleanStdin()
            IDE.cleanStdout()
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
        <div>
            <h2 className="mb-5">Test cases</h2>
                <IDE  ref={IDERef}/>
            <div className="d-grid d-flex justify-content-end mb-5" role="group">
                <button onClick={handleAddTestCase} className="btn btn-lg btn-primary">Adicionar caso teste</button>
            </div>
            <div className="py-5">
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
                                    <TextArea rows={4} value={testCase.input} disabled={true} />
                                </td>
                                <td className="align-middle">
                                    <TextArea rows={4} value={testCase.expectedOutput} disabled={true} />
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
                                        <label className="form-check-label" htmlFor={`test-${index}`}>exemplo</label>
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
        </div>
    )
}

export default TestCasesForm
