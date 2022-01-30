import React from 'react'
import { Markdown } from '../../../../../Learn/Course/interfaces/Markdown'
import { Section } from '../../../../../Learn/Course/interfaces/Section'
import { useCourse } from '../../../useCourse'

interface MarkdownEditorProps {
    section: Section
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ section }) => {
    const { updateSection } = useCourse()

    const autoGrow = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const element = event.target
        element.style.height = "5px"
        element.style.height = (element.scrollHeight) + "px"
        element.style.overflow = "hidden"
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        autoGrow(event)
        const text = event.target.value as string
        (section as Markdown).text = text
        updateSection()
    }

    return (
        <div>
            <textarea
                className="form-control border-0"
                value={(section as Markdown).text}
                onChange={handleChange}
                placeholder="Digite o conteúdo da seção"
            />
        </div>
    )
}

export default MarkdownEditor
