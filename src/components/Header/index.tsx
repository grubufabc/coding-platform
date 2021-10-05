import React from 'react'


const Header: React.FC = () => {
    return (
        <header className="text-dark">
            <div className="container-fluid">
                <div className="row d-flex">
                    <div className="col-2">
                        <a className="text-decoration-none" href="/">
                            <h1 className="text-dark p-2">GRUB</h1>
                        </a>
                    </div>
                    <div className="col-8 pt-4 text-center">
                        <a href="/problems" className="text-decoration-none fw-bold text-dark me-4">Problemas</a>
                        <a href="/playground" className="text-decoration-none fw-bold text-dark mx-4">Playground</a>
                        <a href="/pair-programming" className="text-decoration-none fw-bold text-dark mx-4">Pair programming</a>
                        <a href="/blog" className="text-decoration-none fw-bold text-dark mx-4">Blog</a>
                    </div>
                    <div className="col-2 pt-3">
                        <a href="/login" className="rounded-pill py-2 px-4 btn btn-outline-dark text-decoration-none border-white fw-bold mx-5">Entrar</a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header