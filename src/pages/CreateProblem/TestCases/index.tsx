import React from 'react'
import TextArea from '../../../components/Form/TextArea'


interface TestCase {
    stdin: string,
    visible: boolean
}


const TestCases: React.FC = () => {
    const [testCase, setTestCase] = React.useState<string>('')
    const [testCases, setTestCases] = React.useState<TestCase[]>([])

    const handleAddTestCase = () => {
        if (testCase.length > 0) {
            setTestCases([...testCases, { stdin: testCase, visible: false}])
            setTestCase('')
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
            <div className="row">
                <div className="col">
                    <TextArea
                        value={testCase}
                        onChange={setTestCase}
                        label={{ text: 'Adicione um novo caso teste', id: 'test-case' }}
                        placeholder="Adicione um novo caso teste"
                        rows={5}
                    />
                </div>

            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th scope="col">Stdin</th>
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