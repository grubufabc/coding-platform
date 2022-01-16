import { State } from "../../interfaces/state"
import React from 'react'
import GitIcon from "../../icons/GitIcon"
import BranchDisplay from "./BranchDisplay"

interface BranchesSectionProps {
    graph: Map<string, string[]>
    selectedCommitId: string
    setSelectedCommitId: (commit_id: string) => void
    commits: State[]
}

const BranchesSection: React.FC<BranchesSectionProps> = ({
    graph,
    selectedCommitId,
    setSelectedCommitId,
    commits
}) => {
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

    React.useEffect(() => {
        setLeaves(findLeaves(graph))
    }, [graph])

    return (
        <div>
            <h4 className="mt-4">
                <GitIcon />
                <span className="mx-2">{leaves.length}</span>
                {leaves.length > 1 ? "Branches" : "Branch"}
            </h4>

            <div className="list-group">
                {commits
                    .filter(commit => leaves.includes(commit.id))
                    .map((commit, index) => (
                        <BranchDisplay
                            key={index}
                            commit={commit}
                            selectedCommitId={selectedCommitId}
                            setSelectedCommitId={setSelectedCommitId}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BranchesSection
