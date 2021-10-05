import React from 'react'
import { Link } from 'react-router-dom'


export interface IPost {
    id: string
    title: string
    date: string
    content: string
    cover: string
    author?: {
        avatar: string
        name: string
    }
}

interface PreviewPostProps {
    post: IPost
}

const PreviewPost: React.FC<PreviewPostProps> = ({ post }) => {
    return (
        <div className="row border">
            <div className="col-10">
            <Link to={post.id} className="text-decoration-none text-dark">
                <h3>{ post.title }</h3>
            </Link>
            
            <p className="text-muted">{ post.content }</p>
            <p className="text-muted">{ post.date }</p>
            </div>
            <div className="col-2" style={{ backgroundImage: `url(${post.cover})`, backgroundSize: 'cover'}}>
                a
            </div>
        </div>
    )
}

export default PreviewPost
