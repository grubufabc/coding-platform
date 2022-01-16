import React from 'react'
import { useSidebar } from '../../useSidebar'

interface PaneProps {
    id: string
}

const Pane: React.FC<PaneProps> = ({ id, children }) => {
    const { selectedPane } = useSidebar()
    return (
        <div
            className={`flex-grow-1 ${selectedPane === id ? 'd-block' : 'd-none'}`}
        >
            {children}
        </div>
    )
}

export default Pane
