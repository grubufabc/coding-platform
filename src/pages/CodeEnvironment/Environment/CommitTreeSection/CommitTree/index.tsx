import React from "react"
import EyeIcon from "../../icons/EyeIcon"
import AsteriskIcon from "../../icons/AsteriskIcon"
import ChevronDownIcon from "../../icons/ChevronDownIcon"
import ChevronRightIcon from "../../icons/ChevronRightIcon"
import EyeFillIcon from "../../icons/EyeFillIcon"

interface CommitTreeProps {
    graph: Map<string, string[]>
    root: string
    setSelectedCommitId: (commit_id: string) => void
    selectedCommitId: string
}

const CommitTree: React.FC<CommitTreeProps> = ({ graph, root, setSelectedCommitId, selectedCommitId }) => {
    const [expanded, setExpanded] = React.useState<boolean>(false)

    const handleClick = () => {
        setExpanded(!expanded)
    }

    const formatCommitId = (commit_id: string) => {
        const commit_id_parts = commit_id.split("-")
        return commit_id_parts[4]
    }

    return (
        <li className={`${expanded ? 'open' : ''}`}>
            <div className="d-flex align-items-center">
                <button
                    onClick={handleClick}
                    className="btn"
                >
                    <span className="pe-2" style={{ color: 'green' }}>
                        {(graph.get(root) || []).length > 0 ?
                            (
                                expanded ? <ChevronDownIcon /> : <ChevronRightIcon />
                            ) : (
                                <AsteriskIcon />
                            )}
                    </span>
                </button>
                
                

                <button
                    onClick={() => setSelectedCommitId(root)}
                    className="btn d-flex align-items-center"
                >
                    <span className="nav-link">{formatCommitId(root)}</span>
                    { selectedCommitId === root ? <EyeFillIcon/> : <EyeIcon /> }
                </button>
            </div>
            <ul className="commit-tree-node">
                {(graph.get(root) || []).map((children, index) => (
                    <CommitTree
                        key={index}
                        selectedCommitId={selectedCommitId}
                        setSelectedCommitId={setSelectedCommitId}
                        graph={graph}
                        root={children}
                    />
                ))}
            </ul>
        </li>
    )
}

export default CommitTree
