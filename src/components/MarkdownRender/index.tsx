import React from 'react'


interface MarkdownRenderProps {
    text: string
}


const MarkdownRender: React.FC<MarkdownRenderProps> = ({ text='' }) => {
    return (
        <div>
            { text }
        </div>
    )
}

export default MarkdownRender
