import React from 'react'
import { useSidebar } from '../useSidebar'

interface PanesProps {
    children: React.ReactNode
}

const Panes: React.FC<PanesProps> = ({ children }) => {
    const { selectedPane } = useSidebar()
    return (
        <div
            className='h-100'
            style={{
                width: selectedPane ? '24rem' : '0rem',
                transition: 'width 0.2s',
            }}
        >
            <div className="ps-2 pe-5 d-flex flex-column h-100">
                { children }
            </div>
        </div>
    )
}

export default Panes
