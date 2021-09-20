import React from 'react'
import TextArea from '../../../components/Form/TextArea'


const TestCases: React.FC = () => {
    const [testCase, setTestCase] = React.useState<string>('')
    const [testCases, setTestCases] = React.useState<string[]>([])

    const handleAddTestCase = () => {
        if(testCase.length > 0){
            setTestCases([...testCases, testCase])
            setTestCase('')
        }
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
                            <th scope="col">#</th>
                            <th scope="col">Stdin</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { testCases.map((test, index) => (
                            <tr key={index}>
                                <th className="align-middle text-center" scope="row">{index+1}</th>
                                <td className="align-middle">
                                    <TextArea rows={4} value={test} disabled={true}/>
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