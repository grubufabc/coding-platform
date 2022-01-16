import React from "react";
import TextArea from "../../../../components/Form/TextArea";
import CommentDisplay from "./CommentDisplay";
import { useCodeEnvironment } from "../../../../hooks/useCodeEnvironment";
import { useToast } from "../../../../hooks/useToast";

interface CommentsSectionProps {
    username: string
    selectedCommitId: string
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ username, selectedCommitId }) => {
    const [avatarColors, setAvatarColors] = React.useState<Map<string, string>>(new Map<string, string>())
    const [comment, setComment] = React.useState<string>('')

    const { codeEnvironment, addComment } = useCodeEnvironment()
    const { setMessage: ToastSetMessage } = useToast()
    const { comments } = codeEnvironment

    React.useEffect(() => {
        const usernames = new Set<string>(comments.map(comment => comment.username))
        const colors = new Map<string, string>()
        const color_palette = [
            "#fd0a54",
            "#029b99",
            "#23192d",
            "#24c0eb",
            "#df8615",
            "#c9729f",
            "#583b7e"
        ]

        let index = 0
        usernames.forEach(username => {
            colors.set(username, color_palette[(index++) % color_palette.length])
        })

        setAvatarColors(colors)
    }, [comments])

    const handleAddComment = () => {
        if (!username) {
            ToastSetMessage({
                title: 'Erro ao comentar',
                body: 'Digite seu nome para comentar',
                icon: '❌'
            })
            return
        }

        if (!comment) {
            ToastSetMessage({
                title: 'Erro ao comentar',
                body: 'Digite um comentário',
                icon: '❌'
            })
            return
        }

        if (!selectedCommitId) {
            ToastSetMessage({
                title: 'Erro ao comentar',
                body: 'Selecione um commit para comentar',
                icon: '❌'
            })
        }

        addComment({
            username,
            text: comment,
            commit_id: selectedCommitId.toString()
        })

        setComment('')
    }

    const formatCommitId = (commit_id: string) => {
        const commit_id_parts = commit_id.split("-")
        return commit_id_parts[4]
    }


    return (
        <div className="d-flex flex-column h-100" >
            <div>
                <h4 className="mb-3">Comentários ({comments.filter(comment => comment.commit_id === selectedCommitId).length})</h4>
                {comments.filter(comment => comment.commit_id === selectedCommitId).length === 0 && <p>Nenhum comentário</p>}

                <p>
                    commit:
                    <span
                        style={{
                            backgroundColor: '#e9ecef',
                        }}
                        className="ms-2 py-1 px-2 rounded-2 font-monospace fw-bold text-dark"
                    >
                        {formatCommitId(selectedCommitId)}
                    </span>
                </p>
            </div>


            <div className="flex-grow-1">
                {comments.filter(comment => comment.commit_id === selectedCommitId).map((comment, index) => (
                    <CommentDisplay
                        key={index}
                        color_avatar={avatarColors.get(comment.username) || '#000000'}
                        comment={comment}
                    />
                ))}
            </div>


            <div className="py-4">
                <h4 className="my-3">Adicionar comentário</h4>
                <TextArea
                    value={comment}
                    onChange={setComment}
                    label={{
                        id: "comment_message_input",
                        text: "Comentário"
                    }}
                    className="mt-3"
                    rows={5}
                />
                <div className="d-grid gap-2">
                    <button
                        className="btn btn-lg btn-primary mt-3"
                        type="button"
                        onClick={handleAddComment}
                    >
                        Enviar comentário
                    </button>
                </div>
            </div>
        </div >
    )
}

export default CommentsSection
