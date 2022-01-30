import React from 'react'
import { Outlet } from 'react-router'
import Header from '../../components/Header'
import Menu from './Menu'


const Admin: React.FC = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="m-5 min-vh-100">
                <h1 className="mb-5">Admin</h1>
                <div className="row d-flex pe-5">
                    <div className="col-3">
                        <Menu links={[
                            {
                                route: '',
                                label: 'Início'
                            },
                            {
                                route: 'create-problem',
                                label: 'Criar problema'
                            },
                            {
                                route: 'create-blog-post',
                                label: 'Criar nova postagem'
                            },
                            {
                                route: 'create-course',
                                label: 'Criar novo curso'
                            },
                            {
                                route: 'manage-courses',
                                label: 'Gerenciar cursos'
                            }
                        ]} />
                    </div>
                    <div className="col-9 px-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}



export default Admin
