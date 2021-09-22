import React from 'react'
import useFetch from '../../hooks/useFetch'
import { Problem } from '../../models/problem'
import { GET_PROBLEMS as API_GET_PROBLEMS } from '../../api'
import { Link } from 'react-router-dom'


const Problems: React.FC = () => {
    const { request } = useFetch()
    const [problems, setProblems] = React.useState<Problem[]>()

    React.useEffect(() => {
        const listProblems = async () => {
            const { url, options } = API_GET_PROBLEMS()
            const { json } = await request(url, options)
            setProblems(json as Problem[])
        }
        if (problems === undefined) listProblems()
    }, [problems, request])

    return (
        <div className="m-5">
            <h1 className="mb-5">Problems</h1>
            {problems && problems.map((problem, index) => (
                <div key={index} className="card">
                    <div className="card-body">
                        <Link to={`${problem._id}`}>
                            {problem.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Problems