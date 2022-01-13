import React from 'react'
import { useParams } from 'react-router'
import { IDEHandles } from '../../../components/IDE'
import { languages } from '../../../components/IDE/config'
import { useCodeEnvironment } from '../../../hooks/useCodeEnvironment'
import CommentsSection from './CommentsSection'
import CommitsSection from './CommitsSection'
import CommitTreeSection from './CommitTreeSection'
import ShareIcon from './icons/ShareIcon'
import IDESection from './IDESection'
import { State } from './interfaces/state'
import { useLocation } from 'react-router-dom'


const Environment: React.FC = () => {
    const { id: environment_id } = useParams()
    const { codeEnvironment, commitCodeEnvironment, loadCodeEnvironment, addComment } = useCodeEnvironment()
    const IDERef = React.useRef<IDEHandles>(null)
    const [selectedCommitId, setSelectedCommitId] = React.useState<string>("")
    const [username, setUsername] = React.useState<string>('Anônimo')
    const [comment, setComment] = React.useState<string>('')
    const [commitPath, setCommitPath] = React.useState<string[]>([])
    const location = useLocation()

    const getPathFromCurrentCommitToRoot = (commit_id: string, states: State[]) => {
        const path: string[] = []
        const parent_commit = new Map<string, string>()

        for(const commit of states){
            parent_commit.set(commit.id, commit.parent_commit)
        }

        while(commit_id !== ""){
            path.push(commit_id)
            commit_id = parent_commit.get(commit_id) || ""
        }

        return path.reverse()
    }
    

    React.useEffect(() => {
        if (codeEnvironment._id !== environment_id) {
            loadCodeEnvironment(environment_id!)
        }
    }, [environment_id, loadCodeEnvironment, codeEnvironment])

    React.useEffect(() => {
        if (codeEnvironment.states.length > 0) {
            const url = new URLSearchParams(location.search)
            const commit_id = url.get('commit_id') || ""

            if(commit_id && codeEnvironment.states.find(state => state.id === commit_id)){
                setSelectedCommitId(commit_id)
                setCommitPath(getPathFromCurrentCommitToRoot(commit_id, codeEnvironment.states))
            }
            else{
                const lastCommitId = codeEnvironment.states[codeEnvironment.states.length - 1].id
                setSelectedCommitId(lastCommitId)
                setCommitPath(getPathFromCurrentCommitToRoot(lastCommitId, codeEnvironment.states))
            }
        }
    }, [codeEnvironment, location.search])

    React.useEffect(() => {
        const IDE = IDERef.current
        const commit = codeEnvironment.states.find(commit => commit.id === selectedCommitId)

        if (!IDE || !commit) {
            return
        }

        const language = languages.find(language => language.id === commit.code.language_id)

        if (!language) {
            return
        }

        IDE.setCode(commit.code.source_code)
        IDE.setLanguage(language.name)
        IDE.setStdin(commit.code.stdin)
    }, [codeEnvironment.states, selectedCommitId])

    const handleCommit = async () => {
        const IDE = IDERef.current
        if (!IDE) return

        const code = IDE.getCode() || ''
        const language = IDE.getLanguage()
        const stdin = IDE.getStdin() || ''

        if (!language) {
            return
        }

        commitCodeEnvironment({
            code: {
                source_code: code,
                language_id: language.id,
                stdin
            },
            parent_commit: selectedCommitId,
        })
    }

    const handleAddComment = () => {
        if (!username) {
            setUsername('Anônimo')
            return
        }

        if (!comment || !selectedCommitId) {
            return
        }

        addComment({
            username,
            text: comment,
            commit_id: selectedCommitId.toString()
        })

        setUsername('Anônimo')
        setComment('')
    }

    const handleShareEnvironment = () => {
        navigator.clipboard.writeText(`${window.location.origin}/code-environment/${codeEnvironment._id}?commit_id=${selectedCommitId}`)
    }

    return (
        <div className="m-5 pb-5">
            <div>
                <h1>Projeto: {codeEnvironment.name}</h1>
                <h5>ID: {codeEnvironment._id}</h5>

                <button
                    className="btn btn-outline-dark"
                    onClick={handleShareEnvironment}
                >
                    <ShareIcon/> 
                    <span className="ms-2">Compartilhar</span>
                </button>

                <CommitTreeSection
                    states={codeEnvironment.states}
                    setSelectedCommitId={(commit_id: string) => {
                        setCommitPath(getPathFromCurrentCommitToRoot(commit_id, codeEnvironment.states))
                        setSelectedCommitId(commit_id)
                    }}
                    selectedCommitId={selectedCommitId}
                />
            </div>

            <div className="row mt-5">
                <CommitsSection
                    handleCommit={handleCommit}
                    states={codeEnvironment.states}
                    selectedCommitId={selectedCommitId}
                    setSelectedCommitId={(commit_id: string) => {
                        setCommitPath(getPathFromCurrentCommitToRoot(commit_id, codeEnvironment.states))
                        setSelectedCommitId(commit_id)
                    }}
                />
                <IDESection
                    IDERef={IDERef}
                    commitPath={commitPath}
                    setSelectedCommitId={setSelectedCommitId}
                    selectedCommitId={selectedCommitId}
                />
            </div>

            <CommentsSection
                comments={codeEnvironment.comments
                    .filter(comment => selectedCommitId && comment.commit_id === selectedCommitId.toString())
                }
                username={username}
                setUsername={setUsername}
                comment={comment}
                setComment={setComment}
                handleAddComment={handleAddComment}
            />
        </div>
    )
}

export default Environment
