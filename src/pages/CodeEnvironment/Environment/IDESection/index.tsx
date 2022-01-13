import React from "react"
import IDE, { IDEHandles } from "../../../../components/IDE"
import CommitPathVisualizer from "./CommitPathVisualizer"

interface IDESectionProps {
    IDERef: React.RefObject<IDEHandles>
    commitPath: string[]
    setSelectedCommitId: (commit_id: string) => void
    selectedCommitId: string
}

const IDESection: React.FC<IDESectionProps> = ({ IDERef, commitPath, setSelectedCommitId, selectedCommitId }) => {
    return (
        <div className="col-9">
            <CommitPathVisualizer 
                commitPath={commitPath} 
                setSelectedCommitId={setSelectedCommitId}
                selectedCommitId={selectedCommitId}
            />
            <IDE
                classNameCodeEditor='code-wrapper-80'
                ref={IDERef}
            />
        </div>
    )
}

export default IDESection
