import ClockHistoryIcon from "./ClockHistoryIcon"
import { State } from "../interfaces/state"
import CommitDisplay from "./CommitDisplay"
import { buildGraphFromCommits } from "../CommitTreeSection"
import React from "react"
import Input from "../../../../components/Form/Input"
import BranchesSection from "./BranchesSection"


interface CommitsSectionProps {
    handleCommit: () => void
    states: State[]
    selectedCommitId: string
    setSelectedCommitId: (commit_id: string) => void
    commitMessage: string
    setCommitMessage: (commitMessage: string) => void
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
}

const CommitsSection: React.FC<CommitsSectionProps> = ({
    handleCommit,
    states,
    selectedCommitId,
    setSelectedCommitId,
    commitMessage,
    setCommitMessage,
    username,
    setUsername
}) => {
    return (
        <div className="col-3">
            <Input
                value={username}
                setValue={setUsername}
                label={{
                    id: "comment_username_input",
                    text: "Nome"
                }}
                className="p-0 mb-3"
            />

            <div className="input-group mb-3">
                <input type="text"
                    className="form-control"
                    placeholder="Descrição da mudança"
                    onChange={(event) => setCommitMessage(event.target.value)}
                    value={commitMessage}
                />
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
                    commits={states}
                />
            </div>

            <div>
                <h3 className="mt-4">
                    <ClockHistoryIcon />
                    <span className="mx-2">{states.length}</span>
                    {states.length > 1 ? "Commits" : "Commit"}
                </h3>

                <div className="list-group">
                    {[...states].reverse().map((commit, index) => (
                        <CommitDisplay
                            key={index}
                            active={commit.id === selectedCommitId}
                            setSelectedCommitId={setSelectedCommitId}
                            commit={commit}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CommitsSection