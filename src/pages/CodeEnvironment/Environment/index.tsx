import React from 'react'
import { useParams } from 'react-router'
import { languages } from '../../../components/IDE/config'
import { useCodeEnvironment } from '../../../hooks/useCodeEnvironment'
import CommentsSection from './CommentsSection'
import CommitsSection from './CommitsSection'
import CommitTreeSection from './CommitTreeSection'
import ShareIcon from './icons/ShareIcon'
import IDESection from './IDESection'
import { State } from './interfaces/state'
import { useLocation } from 'react-router-dom'
import { useToast } from '../../../hooks/useToast'
import GitIcon from './icons/GitIcon'
import Sidebar from './Sidebar'
import FacebookIcon from './icons/FacebookIcon'
import LinkIcon from './icons/LinkIcon'
import GitHubIcon from './icons/GitHubIcon'
import ChatLeftText from './icons/ChatLeftText'
import Toolbar from './Toolbar'
import { useIDE } from './IDESection/useIDE'
import PlayIcon from './icons/PlayIcon'
import PersonIcon from './icons/PersonIcon'
import TerminalIcon from './icons/TerminalIcon'

const shareIcons = new Map<string, React.FC>([
    ['facebook', FacebookIcon],
    ['url', LinkIcon]
])

const Environment: React.FC = () => {
    const { id: environment_id } = useParams()
    const {
        codeEnvironment,
        loadCodeEnvironment,
        changeEnvironmentName,
    } = useCodeEnvironment()
    const [selectedCommitId, setSelectedCommitId] = React.useState<string>("")
    const [username, setUsername] = React.useState<string>('Anônimo')
    const [commitPath, setCommitPath] = React.useState<string[]>([])
    const location = useLocation()
    const { setMessage: ToastSetMessage } = useToast()

    const [environmentName, setEnvironmentName] = React.useState<string>('')
    const { setSourceCode, setLanguageId, setStdin, runCode, loading } = useIDE()


    const getPathFromCurrentCommitToRoot = (commit_id: string, states: State[]) => {
        const path: string[] = []
        const parent_commit = new Map<string, string>()

        for (const commit of states) {
            parent_commit.set(commit.id, commit.parent_commit)
        }

        while (commit_id !== "") {
            path.push(commit_id)
            commit_id = parent_commit.get(commit_id) || ""
        }

        return path.reverse()
    }

    React.useEffect(() => {
        if (codeEnvironment._id !== environment_id) {
            loadCodeEnvironment(environment_id!)
            setEnvironmentName(codeEnvironment.name)
        }
    }, [environment_id, loadCodeEnvironment, codeEnvironment])

    React.useEffect(() => {
        if (codeEnvironment.states.length > 0) {
            const url = new URLSearchParams(location.search)
            const commit_id = url.get('commit_id') || ""

            if (commit_id && codeEnvironment.states.find(state => state.id === commit_id)) {
                setSelectedCommitId(commit_id)
                setCommitPath(getPathFromCurrentCommitToRoot(commit_id, codeEnvironment.states))
            }
            else {
                const lastCommitId = codeEnvironment.states[codeEnvironment.states.length - 1].id
                setSelectedCommitId(lastCommitId)
                setCommitPath(getPathFromCurrentCommitToRoot(lastCommitId, codeEnvironment.states))
            }
        }
        setEnvironmentName(codeEnvironment.name)
    }, [codeEnvironment, location.search])

    React.useEffect(() => {
        const commit = codeEnvironment.states.find(commit => commit.id === selectedCommitId)
        if (!commit) {
            return
        }

        const language = languages.find(language => language.id === commit.code.language_id)
        if (!language) {
            return
        }

        setSourceCode(commit.code.source_code)
        setLanguageId(commit.code.language_id)
        setStdin(commit.code.stdin)

    }, [codeEnvironment.states, selectedCommitId, setLanguageId, setSourceCode, setStdin])


    const handleChangeEnvironmentName = () => {
        if (!environmentName) {
            ToastSetMessage({
                title: 'Erro ao alterar o nome do ambiente',
                body: 'Digite um nome para o ambiente',
                icon: '❌'
            })
            setEnvironmentName(codeEnvironment.name)
            return
        }
        if (environmentName !== codeEnvironment.name) {
            changeEnvironmentName(environmentName)
        }
    }

    const handleShareEnvironment = (format: string) => {
        const formatters = new Map<string, (url: string) => string>([
            ['facebook', (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}`],
            ['url', (url: string) => url]
        ])
        const formatter = formatters.get(format)
        const Icon = shareIcons.get(format)

        if (!Icon || !formatter) {
            return
        }

        const url = `${window.location.origin}/code-environment/${codeEnvironment._id}?commit_id=${selectedCommitId}`
        navigator.clipboard.writeText(formatter(url))
        ToastSetMessage({
            title: 'Link copiado!',
            body: 'Link copiado para a área de transferência!',
            icon: <Icon />
        })
    }

    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex px-3 justify-content-between">
                <h1>
                    <input
                        className='border-0'
                        value={environmentName}
                        onChange={(e) => setEnvironmentName(e.target.value)}
                        onBlur={() => handleChangeEnvironmentName()}
                    />
                </h1>
                <div>
                    <div className="dropdown">
                        <button
                            type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="btn dropdown-toggle d-flex justify-content-center my-2 align-items-center"
                            style={{ backgroundColor: '#e9ecef', width: '15rem' }}>
                            <span className="me-2">
                                <PersonIcon />
                            </span>
                            {username}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: '15rem' }}>
                            <input
                                className="form-control"
                                placeholder="Digite o nome do usuário"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <button
                        className="btn d-flex my-2 px-4 align-items-center me-2"
                        style={{ backgroundColor: '#e9ecef' }}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#terminal"
                        aria-expanded="false"
                        aria-controls="terminal"
                    >
                        <TerminalIcon />
                    </button>
                    <button
                        className="btn d-flex my-2 px-4 align-items-center"
                        style={{ backgroundColor: '#e9ecef' }}
                        onClick={() => runCode()}
                    >
                        { loading ? (
                            <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : <PlayIcon /> }
                    </button>
                </div>
            </div>
            <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
                <div className="d-flex h-100">
                    <Sidebar.Container>
                        <Sidebar.Tabs>
                            <Sidebar.Tab id="share">
                                <ShareIcon />
                            </Sidebar.Tab>
                            <Sidebar.Tab id="git">
                                <GitHubIcon />
                            </Sidebar.Tab>
                            <Sidebar.Tab id="commit-tree">
                                <GitIcon />
                            </Sidebar.Tab>
                            <Sidebar.Tab id="comments">
                                <ChatLeftText />
                            </Sidebar.Tab>
                        </Sidebar.Tabs>

                        <Sidebar.Panes>
                            <Sidebar.Pane id="share">
                                <div>
                                    <h2 className="mb-5">Compartilhar</h2>
                                    <div className="btn-group" role="group" >
                                        {Array.from(shareIcons.entries()).map(([format, Icon], index) => {
                                            return (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark px-3"
                                                    key={index}
                                                    onClick={() => handleShareEnvironment(format)}
                                                >
                                                    <Icon />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Sidebar.Pane>
                            <Sidebar.Pane id="git">
                                <div>
                                    <h2 className="mb-5">Git</h2>
                                    <CommitsSection
                                        selectedCommitId={selectedCommitId}
                                        setSelectedCommitId={setSelectedCommitId}
                                        username={username}
                                    />
                                </div>
                            </Sidebar.Pane>
                            <Sidebar.Pane id="commit-tree">
                                <h2 className="mb-5">Árvore de commits</h2>
                                <CommitTreeSection
                                    states={codeEnvironment.states}
                                    selectedCommitId={selectedCommitId}
                                    setSelectedCommitId={(commit_id: string) => {
                                        setCommitPath(getPathFromCurrentCommitToRoot(commit_id, codeEnvironment.states))
                                        setSelectedCommitId(commit_id)
                                    }}
                                />
                            </Sidebar.Pane>
                            <Sidebar.Pane id="comments">
                                <div className="d-flex flex-column h-100">
                                    <h2 className="mb-5">Discussão</h2>
                                    <div className="flex-grow-1">
                                        <CommentsSection
                                            username={username}
                                            selectedCommitId={selectedCommitId}
                                        />
                                    </div>
                                </div>
                            </Sidebar.Pane>
                        </Sidebar.Panes>
                    </Sidebar.Container>

                    <div className="flex-grow-1 border-start border-2">
                        <IDESection
                            commitPath={commitPath}
                            setSelectedCommitId={setSelectedCommitId}
                            selectedCommitId={selectedCommitId}
                        />
                    </div>
                </div>
            </div >
            <Toolbar />
        </div >
    )
}

export default Environment
