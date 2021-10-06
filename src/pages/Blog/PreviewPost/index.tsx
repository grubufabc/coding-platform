import React from 'react'
import { Link } from 'react-router-dom'


export interface IPost {
    _id: string
    title: string
    content: string
    cover: string
}

interface PreviewPostProps {
    post: IPost
    className: string
}

const PreviewPost: React.FC<PreviewPostProps> = ({ post, className }) => {
    return (
        <div className={`row ${className}`}>
            <div className="col-9">
                <Link to={post._id} className="text-decoration-none text-dark">
                    <h3>{ post.title }</h3>
                </Link>
                <p
                    className="text-muted"
                    style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                >{post.content}</p>
                <p className="text-muted">{(new Date()).toDateString()}</p>
            </div>
            <div className="col-3" style={{ backgroundImage: `url(${post.cover})`, backgroundSize: 'cover' }}>
            </div>
        </div>
    )
}

export default PreviewPost
