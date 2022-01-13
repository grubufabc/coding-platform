import { Comment } from "../../interfaces/comment"

interface CommentDisplayProps {
    comment: Comment
    color_avatar: string
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ comment, color_avatar }) => {
    return (
        <div className="card p-2 mb-3">
            <h4 style={{ color: color_avatar }}>
                { comment.username }
            </h4>
            <pre>
                { comment.text }
            </pre>
        </div>
    )
}

export default CommentDisplay
