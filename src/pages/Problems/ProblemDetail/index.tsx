import React from 'react'
import { useParams } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import { Problem } from '../../../models/problem'
import { GET_PROBLEM as API_GET_PROBLEM, POST_SOLUTION as API_POST_SOLUTION } from '../../../api'
import MarkdownRender from '../../../components/MarkdownRender'
import TestCaseItem from '../../../components/TestCaseItem'
import IDE, { IDEHandles } from '../../../components/IDE'
import Toast, { ToastHandles } from '../../../components/Toast'
import { utf8_to_b64 } from '../../../utils'


const ProblemDetail: React.FC = () => {
    const { request } = useFetch()
    const { id: idProblem } = useParams()
    const [problem, setProblem] = React.useState<Problem>()
    const toastRef = React.useRef<ToastHandles>(null)
    const IDERef = React.useRef<IDEHandles>(null)
    const [stateProblem, setStateProblem] = React.useState<Boolean>()

    React.useEffect(() => {
        const getProblem = async () => {
            const { url, options } = API_GET_PROBLEM(idProblem || '')
            const { json } = await request(url, options)
            setProblem(json as Problem)
        }
        if(problem === undefined) getProblem()
    }, [idProblem, problem, request])


    const handleSubmit = async () => {
        const IDE = IDERef.current
        const toast = toastRef.current
        if(!IDE || !toast) return

        if(IDE.getCode().length === 0){
            toast.setMessage({ message: 'Insira um código', title: 'Atenção' })
            return
        }
        
        if(IDE.getLanguage() === undefined){
            toast.setMessage({ message: 'Selecione uma linguagem', title: 'Atenção' })
            return
        }

        const { url, options } = API_POST_SOLUTION(
            idProblem || '', 
            {
                language_id: IDE.getLanguage()?.id || 0,
                source_code: utf8_to_b64(IDE.getCode())
            }
        )

        const { json } = await request(url, options)
        setStateProblem(json as boolean)
        if(json === true) toast.setMessage({ message: 'Solução correta', title: 'Parabéns'})
        else toast.setMessage({ message: 'Solução incorreta', title: 'Tente outra vez'})
    }

    if(problem === undefined) return null

    return (
        <div className="m-5">
            <Toast ref={toastRef}/>
            <div className="w-75 mx-auto">
                <h1 className="mb-5">{ problem.title }</h1>
                { stateProblem === true ? (
                    <div className="alert alert-success" role="alert">
                    Solução aceita
                  </div>
                ) : (null)}
                { stateProblem === false ? (
                    <div className="alert alert-danger" role="alert">
                    Solução inválida
                  </div>
                ) : (null)}

                <MarkdownRender text={problem?.description ||''} />
                <div className="my-5">
                    { problem.testCases.filter(({visible}) => visible).map(({ input, expectedOutput }) => (
                        <div className="mb-3">
                            <TestCaseItem input={input} expectedOutput={expectedOutput}/>
                        </div>
                    ))}
                </div>
                <IDE ref={IDERef}/>

                <button onClick={handleSubmit} className="btn btn-outline-dark btn-lg mt-3">Enviar solução</button>
            </div>
        </div>
    )
}

export default ProblemDetail
