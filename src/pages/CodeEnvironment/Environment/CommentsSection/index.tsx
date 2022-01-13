import React from "react";
import TextArea from "../../../../components/Form/TextArea";
import CommentDisplay from "./CommentDisplay";
import { Comment } from "../interfaces/comment";

interface CommentsSectionProps {
    comments: Comment[]
    comment: string
    setComment: React.Dispatch<React.SetStateAction<string>>
    handleAddComment: () => void
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, comment, setComment, handleAddComment }) => {
    const [avatarColors, setAvatarColors] = React.useState<Map<string, string>>(new Map<string, string>())
    

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
