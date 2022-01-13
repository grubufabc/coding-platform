import React from "react";
import Input from "../../../../components/Form/Input";
import TextArea from "../../../../components/Form/TextArea";
import CommentDisplay from "./CommentDisplay";
import { Comment } from "../interfaces/comment";

interface CommentsSectionProps {
    comments: Comment[]
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    comment: string
    setComment: React.Dispatch<React.SetStateAction<string>>
    handleAddComment: () => void
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, username, setUsername, comment, setComment, handleAddComment }) => {
    const [avatarColors, setAvatarColors] = React.useState<Map<string, string>>(new Map<string, string>())

    const getRandomColor = () => {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

    React.useEffect(() => {
        const usernames = new Set<string>(comments.map(comment => comment.username))
        const colors = new Map<string, string>()

        usernames.forEach(username => {
            colors.set(username, getRandomColor())
        })

        setAvatarColors(colors)
    }, [comments])

    return (
        <div className="row my-5 pb-5">
            <h3 className="mb-3">Discussão ({comments.length})</h3>
            {comments.length === 0 && <p>Nenhum comentário</p>}

            <div>
                {comments.map((comment, index) => (
                    <CommentDisplay
                        key={index}
                        color_avatar={avatarColors.get(comment.username) || '#000000'}
                        comment={comment}
                    />
                ))}
            </div>

            <h4 className="my-3">Adicionar comentário</h4>
            <div>
                <Input
                    value={username}
                    setValue={setUsername}
                    label={{
                        id: "comment_username_input",
                        text: "Nome"
                    }}
                    className="p-0"
                />

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

                <button
                    className="btn btn-lg btn-primary mt-3"
                    type="button"
                    onClick={handleAddComment}
                >
                    Enviar comentário
                </button>
            </div>

        </div >
    )
}

export default CommentsSection
