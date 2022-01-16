import React from 'react'


interface TabsProps {
    children: React.ReactNode
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Tabs
