import React from 'react'
import IDE from '../../components/IDE'
import CodeInspectionIcon from './icons/CodeInspectionIcon'


const LandingPage: React.FC = () => {
    return (
        <div className="px-3">
            <div className="row vh-100 vw-100 d-flex px-5">
                <div className="col-6 h-75 px-5 d-flex">
                    <div className="align-self-center">
                        <h1>A melhor forma de aprender Ciência da Computação</h1>
                        <p className="lead">Aprenda Ciência da Computação na prática. <br /> Uma plataforma completa para programar</p>
                        <div className="mt-5">
                            <button className="btn btn-dark btn-lg px-5 me-5">Começar</button>
                            <button className="btn btn-outline-dark btn-lg border-0 px-5">
                                Explorar
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right ms-2" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex h-75 justify-content-center">
                    <div className="align-self-center">
                        <CodeInspectionIcon />
                    </div>
                </div>
            </div>
            <div style={{ height: '50vh' }} className="mb-5">
                <div className="row d-flex justify-content-evenly px-5">
                    <div className="col-3">
                        <div className="card h-100 ">
                            <div className="card-body p-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-globe mb-4 text-primary" viewBox="0 0 16 16">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                </svg>
                                <h5 className="card-title">Programe de onde quiser</h5>
                                <p className="card-text">Ambiente completo para programar, incluindo editor de código e compilador.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card h-100">
                            <div className="card-body p-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-clock mb-4 text-primary" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                </svg>
                                <h5 className="card-title">Estude no seu tempo</h5>
                                <p className="card-text">Grande número de questões, incluindo soluções detalhadas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card h-100">
                            <div className="card-body p-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-lightbulb mb-4 text-primary" viewBox="0 0 16 16">
                                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                                </svg>
                                <h5 className="card-title">Explore novas formas de resolver problemas</h5>
                                <p className="card-text">Leia soluções escritas por outras pessoas e aprenda novas formas de pensar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-5 mb-5 pb-5">
                <h1 className="mb-5">Experimente agora mesmo</h1>
                <div className="col-8 pt-3 pb-5">
                    <IDE />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
