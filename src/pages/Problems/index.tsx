import React from 'react'
import useFetch from '../../hooks/useFetch'
import { Problem } from '../../models/problem'
import { GET_PROBLEMS as API_GET_PROBLEMS } from '../../api'
import { Link } from 'react-router-dom'


const Problems: React.FC = () => {
    const { request, loading } = useFetch()
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
            {loading && (
                <div className="d-flex align-items-center">
                    <strong>Carregando problemas...</strong>
                    <div className="spinner-border ms-5" role="status" aria-hidden="true"></div>
                </div>
            )}

            {problems && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Título</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, index) => (
                            <tr>
                                <td className="border">-</td>
                                <td className="border p-3">
                                    <Link key={index} to={`${problem._id}`}>
                                        {problem.title}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Problems