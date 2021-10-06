import React from 'react'


const Footer: React.FC = () => {
    return (
        <footer>
            <div className="row p-5 bg-dark">
                <div className="col-3">
                    <img style={{ height: '50px'}} src="https://grubufabc.xyz/img/logo_semSub.png" alt="img"/>
                </div>
                <div className="col-3">
                    <ul>
                        <li>
                        <a href="/" className="text-white text-decoration-none fw-bold">Sobre nós</a>
                        </li>
                        <li>
                        <a href="/" className="text-white text-decoration-none fw-bold">Por trás da plataforma</a>
                        </li>
                    </ul>
                </div>
                <div className="col-3"></div>
            </div>
        </footer>
    )
}

export default Footer
