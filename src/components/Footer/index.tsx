import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
    return (
        <div className="d-flex align-items-center px-5" style={{ backgroundColor: 'black', height: '8rem' }}>
            <div className="col-3">
                <img style={{ height: '50px' }} src="https://grubufabc.xyz/img/logo_semSub.png" alt="img" />
            </div>
            <div className="col-3">
                <ul style={{ listStyle: 'none' }}>
                    <li>
                        <Link to={'/'} className="text-white text-decoration-none">
                            Sobre Nós
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className="text-white text-decoration-none">
                            Por trás da plataforma
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
