import { State } from "../../../interfaces/state"


interface BranchDisplayProps {
    commit: State
    selectedCommitId: string
    setSelectedCommitId: (commit_id: string) => void
}

const BranchDisplay: React.FC<BranchDisplayProps> = ({
    commit,
    selectedCommitId,
    setSelectedCommitId,
}) => {
    const active = commit.id === selectedCommitId
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
            className={`list-group-item list-group-item-action ${active ? 'active' : ''}`}
            onClick={() => setSelectedCommitId(commit.id)}
        >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{date}</h5>
            </div>
            <p className="mb-1">{commit.message}</p>
            <small>Autor: { commit.username }</small> <br />
            <small>hash: {formatCommitId(commit.id)}</small>
        </button>
    )
}


export default BranchDisplay
