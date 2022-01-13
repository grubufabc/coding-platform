import ClockHistoryIcon from "./ClockHistoryIcon"
import { State } from "../interfaces/state"
import CommitDisplay from "./CommitDisplay"
import EyeFillIcon from "../icons/EyeFillIcon"
import EyeIcon from "../icons/EyeIcon"
import { buildGraphFromCommits } from "../CommitTreeSection"
import React from "react"
import GitIcon from "../icons/GitIcon"



interface BranchesSectionProps {
    graph: Map<string, string[]>
    selectedCommitId: string
    setSelectedCommitId: (commit_id: string) => void
}



const BranchesSection: React.FC<BranchesSectionProps> = ({ graph, selectedCommitId, setSelectedCommitId }) => {
    const [leaves, setLeaves] = React.useState<string[]>([])
    
    const findLeaves = (graph: Map<string, string[]>) => {
        const leaves: string[] = []

        graph.forEach((children, node) => {
            if (children.length === 0) {
                leaves.push(node)
            }
        })

        return leaves
    }

    const formatCommitId = (commit_id: string) => {
        const commit_id_parts = commit_id.split("-")
        return commit_id_parts[4]
    }

    React.useEffect(() => {
        setLeaves(findLeaves(graph))
    }, [graph])

    return (
        <div>
            <h3 className="mt-4">
                <GitIcon/>
                <span className="mx-2">{leaves.length}</span>
                {leaves.length > 1 ? "Branches" : "Branch"}
            </h3>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {findLeaves(graph).map((commit_id, index) => (
                        <li className="list-group-item" key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="nav-link">{formatCommitId(commit_id)}</span>
                                <button
                                    onClick={() => setSelectedCommitId(commit_id)}
                                    className="btn"
                                >
                                    {selectedCommitId === commit_id ? <EyeFillIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


interface CommitsSectionProps {
    handleCommit: () => void
    states: State[]
    selectedCommitId: string
    setSelectedCommitId: (commit_id: string) => void
}

const CommitsSection: React.FC<CommitsSectionProps> = ({ handleCommit, states, selectedCommitId, setSelectedCommitId }) => {
    return (
        <div className="col-3">
            <div className="input-group mb-3">
                <input type="text"
                    className="form-control"
                    placeholder="Descrição da mudança" />
                <button
                    className="btn btn-success px-3"
                    onClick={handleCommit}
                >Commit</button>
            </div>

            <div>
                <BranchesSection
                    graph={buildGraphFromCommits(states).graph}
                    selectedCommitId={selectedCommitId}
                    setSelectedCommitId={setSelectedCommitId}
                />
            </div>

            <div>
                <h3 className="mt-4">
                    <ClockHistoryIcon />
                    <span className="mx-2">{states.length}</span>
                    {states.length > 1 ? "Commits" : "Commit"}
                </h3>

                <div className="card m-0 p-0">
                    <ul className="list-group list-group-flush">

                        {[...states].reverse().map((commit, index) => (
                            <li key={index} className="list-group-item m-0 p-0">
                                <CommitDisplay
                                    active={commit.id === selectedCommitId}
                                    setSelectedCommitId={setSelectedCommitId}
                                    commit={{
                                        code: commit.code,
                                        timestamp: commit.timestamp,
                                        id: commit.id,
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CommitsSection