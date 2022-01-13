import React from "react"
import IDE, { IDEHandles } from "../../../../components/IDE"
import CommitPathVisualizer from "./CommitPathVisualizer"

interface IDESectionProps {
    IDERef: React.RefObject<IDEHandles>
    commit_path: string[]
    setSelectedCommitId: (commit_id: string) => void
}

const IDESection: React.FC<IDESectionProps> = ({ IDERef, commit_path, setSelectedCommitId }) => {
    return (
        <div className="col-9">
            <CommitPathVisualizer 
                commit_path={commit_path} 
                setSelectedCommitId={setSelectedCommitId}
            />
            <IDE
                classNameCodeEditor='code-wrapper-80'
                ref={IDERef}
            />
        </div>
    )
}

export default IDESection
