import React from 'react'
import { useParams } from 'react-router'
import useFetch from '../../../hooks/useFetch'
import { Problem } from '../../../models/problem'
import { GET_PROBLEM as API_GET_PROBLEM } from '../../../api'
import MarkdownRender from '../../../components/MarkdownRender'
import TestCaseItem from '../../../components/TestCaseItem'


const ProblemDetail: React.FC = () => {
    const { request } = useFetch()
    const { id } = useParams()
    const [problem, setProblem] = React.useState<Problem>()

    React.useEffect(() => {
        const getProblem = async () => {
            const { url, options } = API_GET_PROBLEM(id as string)
            const { json } = await request(url, options)
            console.log(json)
            setProblem(json as Problem)
        }
        if(problem === undefined) getProblem()
    }, [id, problem, request])

    if(problem === undefined) return null

    return (
        <div className="">
            <h1 className="mb-5">{ problem.title }</h1>
            <MarkdownRender text={problem?.description ||''} />
            <div className="mt-5">
            { problem.testCases.filter(({visible}) => visible).map(({ input, expectedOutput }) => (
                <div className="mb-3">
                    <TestCaseItem input={input} expectedOutput={expectedOutput}/>
                </div>
                
            ))}
            </div>
            
        </div>
    )
}

export default ProblemDetail
