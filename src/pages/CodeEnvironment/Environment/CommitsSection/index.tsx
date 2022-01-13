import ClockHistoryIcon from "./ClockHistoryIcon"
import { State } from "../interfaces/state"
import CommitDisplay from "./CommitDisplay"


interface CommitsSectionProps {
    handleCommit: () => void
    states: State[]
    selectedCommitId: string | null
    setSelectedCommitId: (commit_id: string) => void
}

const CommitsSection: React.FC<CommitsSectionProps> = ({ handleCommit, states, selectedCommitId, setSelectedCommitId }) => {
    return (
        <div className="col-3">
            <button className="btn btn-success px-3" onClick={handleCommit}>Commit</button>

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
    )
}

export default CommitsSection