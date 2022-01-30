import React from 'react'
import { Chapter } from '../../interfaces/Chapter'
import SectionRender from './SectionRender'

interface MainProps {
    chapter: Chapter
}

const Main: React.FC<MainProps> = ({ chapter }) => {
    return (
        <div className="flex-grow-1 px-5">
            { chapter.content.map((section, index) => (
                <SectionRender key={index} section={section} />
            )) }
        </div>
    )
}

export default Main
