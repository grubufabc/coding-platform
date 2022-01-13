import React, { useCallback } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import { Problem } from '../../../models/problem'
import { GET_PROBLEM as API_GET_PROBLEM, GET_SUBMISSIONS as API_GET_SUBMISSIONS, POST_SOLUTION as API_POST_SOLUTION } from '../../../api'
import { IDEHandles } from '../../../components/IDE'
import Main from './Main'
import IDE from './IDE'
import Toast, { ToastHandles } from '../../../components/Toast'
import { AuthContext } from '../../../providers/AuthProvider'

interface TestCase {
    input: string;
    verdict: string;
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
        verdict: string;
        testCases: TestCase[]
    }
}

const ProblemDetail: React.FC = () => {
    const { request } = useFetch()
    const { id: idProblem } = useParams()
    const [problem, setProblem] = React.useState<Problem>()
    const IDERef = React.useRef<IDEHandles>(null)
    const toastRef = React.useRef<ToastHandles>(null)
    const [lastSubmissions, setLastSubmissions] = React.useState<Submission[]>([])
    const { authData } = React.useContext(AuthContext)
    const [judging, setJudging] = React.useState<boolean>(false)

    const getSubmissions = useCallback(async () => {
        const { url, options } = API_GET_SUBMISSIONS()
        const { json } = await request(url, options)
        setLastSubmissions(json as Submission[])
    }, [request])

    React.useEffect(() => {
        const getProblem = async () => {
            const { url, options } = API_GET_PROBLEM(idProblem || '')
            const { json } = await request(url, options)
            setProblem(json as Problem)
        }
        if (problem === undefined){
            if(authData.token){
                getSubmissions()    
            }
            getProblem()
            
        }
    }, [authData.token, getSubmissions, idProblem, problem, request])


    

    const handleSubmit = async () => {
        const IDE = IDERef.current
        const toast = toastRef.current
        if (!IDE || !toast) return

        if (IDE.getCode().length === 0) {
            toast.setMessage({ 
                message: 'Insira um código', 
                title: 'Atenção'
            })
            return
        }

        if (IDE.getLanguage() === undefined) {
            toast.setMessage({ 
                message: 'Selecione uma linguagem', 
                title: 'Atenção' 
            })
            return
        }

        toast.setMessage({ message: 'Solução submetida com sucesso', title: 'Tudo certo' })

        const { url, options } = API_POST_SOLUTION(
            idProblem || '',
            {
                language_id: IDE.getLanguage()?.id || 0,
                source_code: IDE.getCode()
            }
        )
        
        setJudging(true)
        const { json } = await request(url, options)
        const submission = json as Submission
        setJudging(false)

        toast.setMessage({ 
            message: submission.judgeResult.verdict, 
            title: 'Resultado' 
        })

        if(authData.token){
            getSubmissions()
        }
        else{
            setLastSubmissions([ ...lastSubmissions, submission ])
        }
    }

    if (problem === undefined) return null

    return (
        <div id="xxx" className="d-flex flex-grow-1" style={{ overflow: 'hidden' }}>
            <Main problem={problem} lastSubmissions={lastSubmissions}/>
            <IDE IDERef={IDERef} handleSubmit={handleSubmit} judging={judging}/>
            <Toast ref={toastRef} />
        </div>
    )
}

export default ProblemDetail
