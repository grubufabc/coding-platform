import React from 'react'
import { useSidebar } from "../../useSidebar"


interface TabProps {
    id: string
}

const Tab: React.FC<TabProps> = ({ id, children }) => {
    const { selectPane, selectedPane } = useSidebar()

    return (
        <button
            className={`btn btn-outline-dark border-0 rounded-0 ${id === selectedPane ? 'active border-start border-4 border-primary' : 'border-0'}`}
            style={{ width: '4rem', height: '4rem', boxSizing: 'border-box' }}
            onClick={() => selectPane(id)}
        >
            {children}
        </button>
    )
}

export default Tab
