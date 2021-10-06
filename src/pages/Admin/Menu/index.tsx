import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './style.css'

interface LinkProps {
    route: string
    label: string
}

interface MenuProps {
    links: LinkProps[]
}


const Menu: React.FC<MenuProps> = ({ links }) => {
    const location = useLocation()
    const [activeRoute, setActiveRoute] = React.useState<string>('')

    React.useEffect(() => {
        const pathname = location.pathname.split('/')
        setActiveRoute(pathname[pathname.length-1])
    }, [location])


    return (
        <ul className="list-group">
            { links.map(({route, label}, index) => (
                <Link 
                    key={index}
                    to={route} 
                    className={`list-group-item p-3 ${ route === activeRoute ? 'active' : ''}`}
                >{label}</Link>
            ))}
        </ul>
    )
}

export default Menu