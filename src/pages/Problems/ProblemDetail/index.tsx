import React, { useCallback } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import { Problem } from '../../../models/problem'
import { GET_PROBLEM as API_GET_PROBLEM, GET_SUBMISSIONS as API_GET_SUBMISSIONS, POST_SOLUTION as API_POST_SOLUTION } from '../../../api'
import { IDEHandles } from '../../../components/IDE'
import Main from './Main'
import IDE from './IDE'
import { AuthContext } from '../../../providers/AuthProvider'
import { useToast } from '../../../hooks/useToast'

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
    const [lastSubmissions, setLastSubmissions] = React.useState<Submission[]>([])
    const { authData } = React.useContext(AuthContext)
    const [judging, setJudging] = React.useState<boolean>(false)
    const { setMessage: ToastSetMessage } = useToast()


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
        if (!IDE) return

        if (IDE.getCode().length === 0) {
            ToastSetMessage({ 
                title: 'Atenção',
                body: 'Insira um código'
            })
            return
        }

        if (IDE.getLanguage() === undefined) {
            ToastSetMessage({ 
                title: 'Atenção',
                body: 'Selecione uma linguagem'
            })
            return
        }

        ToastSetMessage({ 
            title: 'Tudo certo', 
            body: 'Solução submetida com sucesso'
        })

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

        ToastSetMessage({ 
            title: 'Resultado',
            body: submission.judgeResult.verdict
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
        </div>
    )
}

export default ProblemDetail
