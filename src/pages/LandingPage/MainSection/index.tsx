import React from 'react';
import CodeInspectionIcon from "../icons/CodeInspectionIcon"


const MainSection: React.FC = () => {
    return (
        <div className="landing-page-slide" style={{ height: 'calc(100vh - 4rem)' }}>
            <div style={{ width: '50%', paddingBottom: '8rem' }}>
                <h1 className="display-1 fw-bolder">Aprenda Praticando</h1>
                <p className="fs-5 text-secondary my-4">Aprenda Ciência da Computação na prática. <br /> Uma plataforma completa de programação.</p>
                <button className="btn btn-dark btn-lg px-5 me-5">Começar</button>
            </div>
            <div style={{ width: '50%' }}>
                <CodeInspectionIcon />
            </div>
        </div>
    )
}

export default MainSection
