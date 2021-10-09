import React from 'react'

interface ITab {
    label: any
    content: React.ReactNode
}

interface TabsProps {
    tabs: ITab[]
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = React.useState<string>('')

    const changeTab = (tabName: string) => {
        setActiveTab(tabName)
    }

    const getText = (node: any) => {
        return node.props.children || ''
    }

    React.useEffect(() => {
        if (!activeTab) setActiveTab(getText(tabs[0].label))
    }, [activeTab, tabs])

    return (
        <React.Fragment>
            <ul className="nav nav-tabs">
                {tabs.map(({ label }, index) => (
                    <li key={index} className="nav-item">
                        <button 
                            className={`nav-link ${getText(label) === activeTab ? 'active': ''}`} 
                            onClick={() => changeTab(getText(label))}
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabs.map(({ content, label }, index) => (
                    <div 
                        key={index} 
                        className={`tab-pane fade ${getText(label) === activeTab ? 'show active': ''}`}
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
