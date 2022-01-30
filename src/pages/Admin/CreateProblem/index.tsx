import React from 'react'
import { POST_PROBLEM as API_POST_PROBLEM } from '../../../api'
import ProgressSteps, { ProgressStep } from '../../../components/ProgressSteps'
import useFetch from '../../../hooks/useFetch'
import { useToast } from '../../../hooks/useToast'
import { Language } from '../../../models/language'
import DescriptionForm from './DescriptionForm'
import Review from './Review'
import TestCasesForm from './TestCasesForm'


export interface Solution {
    code: string,
    language: Language
}

export interface TestCase {
    input: string,
    expectedOutput: string
    visible: boolean
}


const CreateProblem: React.FC = () => {
    const { request } = useFetch()
    const [title, setTitle] = React.useState<string>('')
    const [description, setDescription] = React.useState<string>('')
    const [testCases, setTestCases] = React.useState<TestCase[]>([])
    const { setMessage: ToastSetMessage } = useToast()


    const handleCreateProblem = async () => {
        const { url, options } = API_POST_PROBLEM({
            description,
            testCases,
            title
        })

        ToastSetMessage({
            title: 'Processando...',
            body: 'Salvando informações'
        })
        await request(url, options)

        ToastSetMessage({
            title: 'Tudo certo!',
            body: 'Problema salvo com sucesso'
        })
    }

    return (
        <React.Fragment>
            <div className="min-vh-100 pb-5">
                <ProgressSteps>
                    <ProgressStep>
                        <DescriptionForm
                            title={title}
                            setTitle={setTitle}
                            setDescription={setDescription}
                        />
                    </ProgressStep>
                    <ProgressStep>
                        <TestCasesForm
                            testCases={testCases}
                            setTestCases={setTestCases}
                        />
                    </ProgressStep>
                    <ProgressStep>
                        <Review
                            title={title}
                            testCases={testCases}
                            handleCreateProblem={handleCreateProblem}
                            description={description}
                        />
                    </ProgressStep>
                </ProgressSteps>
            </div>
        </React.Fragment>
    )
}

export default CreateProblem
