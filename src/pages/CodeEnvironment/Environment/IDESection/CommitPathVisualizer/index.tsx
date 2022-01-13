import React from "react"
import ChevronRightIcon from "../../icons/ChevronRightIcon"

interface CommitPathVisualizerProps {
    commit_path: string[]
    setSelectedCommitId: (commit_id: string) => void
}

const CommitPathVisualizer: React.FC<CommitPathVisualizerProps> = ({ commit_path, setSelectedCommitId }) => {
    const formatCommitId = (commit_id: string) => {
        const commit_id_parts = commit_id.split("-")
        return commit_id_parts[4]
    }

    return (
        <div className="mb-3">
            {commit_path.map((commit_id, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <ChevronRightIcon />}
                    <button
                        className="btn"
                        type="button"
                        style={{
                            backgroundColor: index+1 === commit_path.length ? "#e9ecef" : "",
                        }}
                        onClick={() => setSelectedCommitId(commit_id)}
                    >
                        {formatCommitId(commit_id)}
                    </button>
                </React.Fragment>
            ))}
        </div>
    )
}

export default CommitPathVisualizer
