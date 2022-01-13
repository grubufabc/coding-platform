import React from 'react'
import EyeFillIcon from '../icons/EyeFillIcon'
import EyeIcon from '../icons/EyeIcon'
import { State } from '../interfaces/state'
import CommitTree from './CommitTree'
import './style.css'



interface CommitTreeSectionProps {
    states: State[]
    setSelectedCommitId: (commit_id: string) => void
    selectedCommitId: string
}

const buildGraphFromCommits = (commits: State[]) => {
    const graph = new Map<string, string[]>()
    let root: string = ""

    for (const commit of commits) {
        if (!commit.parent_commit) {
            root = commit.id
            continue
        }

        if (!graph.has(commit.id)) {
            graph.set(commit.id, [])
        }

        if (!graph.has(commit.parent_commit)) {
            graph.set(commit.parent_commit, [])
        }
        const children = graph.get(commit.parent_commit) || []
        children.push(commit.id)
        graph.set(commit.parent_commit, children)
    }

    return { root, graph }
}

interface BranchesSectionProps {
    graph: Map<string, string[]>
    selectedCommitId: string
    setSelectedCommitId: (commit_id: string) => void
}
const BranchesSection: React.FC<BranchesSectionProps> = ({ graph, selectedCommitId, setSelectedCommitId }) => {
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

    return (
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
    )
}

const CommitTreeSection: React.FC<CommitTreeSectionProps> = ({ states, setSelectedCommitId, selectedCommitId }) => {
    return (
        <div className="row d-flex justify-content-between mt-5">
            <div className="col-4">
                <h5>Branches</h5>
                <BranchesSection
                    graph={buildGraphFromCommits(states).graph}
                    selectedCommitId={selectedCommitId}
                    setSelectedCommitId={setSelectedCommitId}
                />
            </div>
            <div className="col-6">
                <h5>Árvore de commits</h5>
                <nav className="commit-tree">
                    <ul>
                        <CommitTree
                            selectedCommitId={selectedCommitId}
                            setSelectedCommitId={setSelectedCommitId}
                            {...buildGraphFromCommits(states)}
                        />
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default CommitTreeSection
export { buildGraphFromCommits }