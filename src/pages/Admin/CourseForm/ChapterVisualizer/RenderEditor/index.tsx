import React from 'react'
import { Chapter } from '../../../../Learn/Course/interfaces/Chapter'
import { Code } from '../../../../Learn/Course/interfaces/Code'
import { Section } from '../../../../Learn/Course/interfaces/Section'
import ArrowDownIcon from '../../icons/ArrowDownIcon'
import ArrowUpIcon from '../../icons/ArrowUpIcon'
import TrashIcon from '../../icons/TrashIcon'
import { useCourse } from '../../useCourse'
import CodeEditor from './CodeEditor'
import MarkdownEditor from './MarkdownEditor'


interface SectionToolbarProps {
    section: Section
    chapter: Chapter
}

const SectionToolbar: React.FC<SectionToolbarProps> = ({
    section,
    chapter
}) => {
    const {
        moveSectionBackward,
        moveSectionForward,
        removeSection 
    } = useCourse()
    return (
        <div className="btn-group btn-group-sm" role="group">
            <button
                onClick={() => moveSectionBackward(chapter, section)}
                type="button"
                className="btn btn-outline-dark border-0"
            >
                <ArrowUpIcon/>
            </button>
            <button
                onClick={() => moveSectionForward(chapter, section)}
                type="button"
                className="btn btn-outline-dark border-0"
            >
                <ArrowDownIcon/>
            </button>
            <button
                onClick={() => removeSection(chapter, section)}
                type="button"
                className="btn btn-outline-dark border-0"
            >
                <TrashIcon />
            </button>
        </div>
    )
}

interface RenderEditorProps {
    section: Section
    chapter: Chapter
}


const RenderEditor: React.FC<RenderEditorProps> = ({
    section,
    chapter,
}) => {
    if (section.type === 'code') {
        return (
            <div className="card p-2 mb-3">
                <div className="d-flex flex-row-reverse mb-4">
                    <SectionToolbar
                        section={section}
                        chapter={chapter}
                    />
                </div>
                <CodeEditor
                    section={section as Code}
                />
            </div>
        )
    }

    if (section.type === 'markdown') {
        return (
            <div className="card p-2 mb-3">
                <div className="d-flex flex-row-reverse mb-4">
                    <SectionToolbar
                        section={section}
                        chapter={chapter}
                    />
                </div>
                <MarkdownEditor
                    section={section}
                />
            </div>
        )
    }

    return null
}

export default RenderEditor
