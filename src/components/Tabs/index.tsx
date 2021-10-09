import React from 'react'

interface ITab {
    label: any
    content: React.ReactNode
}

interface TabsProps {
    tabs: ITab[]
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = React.useState<number>(0)

    const changeTab = (index: number) => {
        setActiveTab(index)
    }

    return (
        <React.Fragment>
            <ul className="nav nav-tabs">
                {tabs.map(({ label }, index) => (
                    <li key={index} className="nav-item">
                        <button 
                            className={`nav-link ${index === activeTab ? 'active': ''}`} 
                            onClick={() => changeTab(index)}
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabs.map(({ content }, index) => (
                    <div 
                        key={index} 
                        className={`tab-pane fade ${index === activeTab ? 'show active': ''}`}
                        style={{ overflow: 'scroll'}}
                    >
                        {content}
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default Tabs
