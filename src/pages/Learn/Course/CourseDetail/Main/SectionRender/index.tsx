import React from 'react'
import CodeRender from './renders/CodeRender'
import MarkdownRender from './renders/MarkdownRender'


interface Section {
    type: 'markdown' | 'code'
}

interface Markdown extends Section {
    type: 'markdown'
    text: string
}

interface Code extends Section {
    type: 'code'
    sourceCode: string
    language_id: number    
}


interface SectionRenderProps {
    section: Section
}


const SectionRender: React.FC<SectionRenderProps> = ({ section }) => {
    if(section.type === 'markdown') {
        return (
            <MarkdownRender 
                text={(section as Markdown).text} 
            />
        )
    }

    if(section.type === 'code') {
        return (
            <CodeRender 
                sourceCode={(section as Code).sourceCode} 
                language_id={(section as Code).language_id} 
            />
        )
    }

    return null
}

export default SectionRender
