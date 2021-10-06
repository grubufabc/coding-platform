import React from 'react'
import { useParams } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import { Problem } from '../../../models/problem'
import { GET_PROBLEM as API_GET_PROBLEM, POST_SOLUTION as API_POST_SOLUTION } from '../../../api'
import { IDEHandles } from '../../../components/IDE'
import Toast, { ToastHandles } from '../../../components/Toast'
import Main from './Main'
import ListSubmissions from './ListSubmissions'

interface TestCase {
    input: string;
    veredict: string;
    expectedOutput: string;
    compile_output: string | null;
    stdout: string | null;
    stderr: string | null;
}

export interface Submission {
    sourceCode: string
    languageID: number
    problemID: string
    judgeResult: {
        veredict: string;
        testCases: TestCase[]
    }
}

const ProblemDetail: React.FC = () => {
    const { request } = useFetch()
    const { id: idProblem } = useParams()
    const [problem, setProblem] = React.useState<Problem>()
    const toastRef = React.useRef<ToastHandles>(null)
    const IDERef = React.useRef<IDEHandles>(null)

    const [lastSubmissions, setLastSubmissions] = React.useState<Submission[]>([])

        React.useEffect(() => {
            const getProblem = async () => {
                const { url, options } = API_GET_PROBLEM(idProblem || '')
                const { json } = await request(url, options)
                setProblem(json as Problem)
            }
            if (problem === undefined) getProblem()
        }, [idProblem, problem, request])


    const handleSubmit = async () => {
        const IDE = IDERef.current
        const toast = toastRef.current
        if (!IDE || !toast) return

        if (IDE.getCode().length === 0) {
            toast.setMessage({ message: 'Insira um código', title: 'Atenção' })
            return
        }

        if (IDE.getLanguage() === undefined) {
            toast.setMessage({ message: 'Selecione uma linguagem', title: 'Atenção' })
            return
        }

        const { url, options } = API_POST_SOLUTION(
            idProblem || '',
            {
                language_id: IDE.getLanguage()?.id || 0,
                source_code: IDE.getCode()
            }
        )

        const { json } = await request(url, options)
        setLastSubmissions([...lastSubmissions, json as Submission ])
    }

    if (problem === undefined) return null

    return (
        <div className="m-5">
            <Toast ref={toastRef} />
            <div className="w-75 mx-auto">
                <Main 
                    problem={problem}
                    IDERef={IDERef}
                    handleSubmit={handleSubmit}
                />
                <ListSubmissions
                    lastSubmissions={lastSubmissions}
                />
            </div>
        </div>
    )
}

export default ProblemDetail
