import React from 'react'
import { POST_PROBLEM as API_POST_PROBLEM} from '../../api'
import ProgressSteps, { ProgressStep } from '../../components/ProgressSteps'
import Toast, { ToastHandles } from '../../components/Toast'
import useFetch from '../../hooks/useFetch'
import { Language } from '../../models/language'
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
    const toastRef = React.useRef<ToastHandles>(null)
    const [title, setTitle] = React.useState<string>('')
    const [description, setDescription] = React.useState<string>('')
    const [testCases, setTestCases] = React.useState<TestCase[]>([])


    const handleCreateProblem = async () => {
        const { url, options } = API_POST_PROBLEM({
            description,
            testCases,
            title
        })
        toastRef.current?.setMessage({
            message: 'Salvando informações',
            title: 'Processando...'
        })
        const { json } = await request(url, options)
        toastRef.current?.setMessage({ 
            message: 'Problema salvo com sucesso', 
            title: 'Tudo certo!'
        })
        console.log(json)
    }

    return (
        <div className="min-vh-100 pb-5">
            <Toast ref={toastRef}/>
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
    )
}

export default CreateProblem
