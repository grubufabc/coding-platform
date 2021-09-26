import React from 'react'


export interface MessageProps {
    content: string
    author: string
}


const Message: React.FC<MessageProps> = ({ content, author }) => {
    return (
        <div className="border rounded-3 p-2 mb-2">
            <h5>{author}</h5>
            <p>{content}</p>
        </div>
    )
}

export default Message
