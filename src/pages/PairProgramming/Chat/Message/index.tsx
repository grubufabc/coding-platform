import React from 'react'
import { User } from '../..'


export interface MessageProps {
    content: string
    author?: User
}


const Message: React.FC<MessageProps> = ({ content, author }) => {

    if(!author) return null

    return (
        <div className="border rounded-3 p-2 mb-2">
            <h5 style={{ color: author.avatar.color }}>{author.avatar.name}</h5>
            <p>{content}</p>
        </div>
    )
}

export default Message
