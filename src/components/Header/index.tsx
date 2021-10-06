import React from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import { Link } from 'react-router-dom'


const Header: React.FC = () => {
    const [token] = React.useContext(AuthContext)

    return (
            <header className="text-dark">
                <div className="container-fluid">
                    <div className="row d-flex">
                        <div className="col-2">
                            <Link to="/" className="text-decoration-none">
                                <h1 className="text-dark p-2">GRUB</h1>
                            </Link>
                        </div>
                        <div className="col-7 pt-4 text-center">
                            <Link to="/problems" className="text-decoration-none fw-bold text-dark me-4">Problemas</Link>
                            <Link to="/playground" className="text-decoration-none fw-bold text-dark mx-4">Playground</Link>
                            <Link to="/pair-programming" className="text-decoration-none fw-bold text-dark mx-4">Pair programming</Link>
                            <Link to="/blog" className="text-decoration-none fw-bold text-dark mx-4">Blog</Link>
                        </div>
                        <div className="col-3 pt-3">
                            {token ? (
                                <React.Fragment>
                                    <Link to="/admin" className="rounded-pill py-2 px-4 btn btn-outline-dark text-decoration-none border-white fw-bold mx-3">Admin</Link>
                                    <Link to="/logout" className="rounded-pill py-2 px-4 btn btn-outline-dark text-decoration-none border-white fw-bold">Sair</Link>
                                </React.Fragment>
                            ) : (
                                <Link to="/login" className="rounded-pill py-2 px-4 btn btn-outline-dark text-decoration-none border-white fw-bold mx-5">Entrar</Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>
    )
}

export default Header