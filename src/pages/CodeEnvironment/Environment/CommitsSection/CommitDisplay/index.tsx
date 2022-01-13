import { Commit } from "../../interfaces/commit"

interface CommitDisplayProps {
    commit: Commit
    setSelectedCommitId: (commit_id: string) => void
    active: boolean
}

const CommitDisplay: React.FC<CommitDisplayProps> = ({ commit, setSelectedCommitId, active }) => {
    const date = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date(commit.timestamp))

    const formatCommitId = (commit_id: string) => {
        const commit_id_parts = commit_id.split("-")
        return commit_id_parts[4]
    }


    return (
        <button
            className={`btn rounded-0 p-0 w-100 ${active ? "btn-primary" : ""}`}
            onClick={() => setSelectedCommitId(commit.id)}
        >
            <div className="text-start p-2">
                <h5>{date}</h5>
                <h6>{formatCommitId(commit.id)}</h6>
            </div>
        </button >

    )
}

export default CommitDisplay
