import { Comment } from "../../interfaces/comment"

interface CommentDisplayProps {
    comment: Comment
    color_avatar: string
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ comment, color_avatar }) => {
    return (
        <div className="card p-2 mb-3">
            <h5 style={{ color: color_avatar }}>
                { comment.username }
            </h5>
            <pre className="p-0 m-0">
                { comment.text }
            </pre>
        </div>
    )
}

export default CommentDisplay
