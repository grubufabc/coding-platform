import React from 'react'
import IDE, { IDEHandles } from '../../components/IDE'
import { useLocation } from 'react-router-dom'
import Toast, { ToastHandles } from '../../components/Toast'


const Playground: React.FC = () => {
    const IDERef = React.useRef<IDEHandles>(null)
    const toastRef = React.useRef<ToastHandles>(null)
    const location = useLocation()


    const handleShareLink = () => {
        const IDE = IDERef.current
        if (!IDE) return

        const source_code = IDE.getCode()
        const stdin = IDE.getStdin()
        const language = IDE.getLanguage()

        const environment = {
            source_code,
            stdin,
            language: language?.name || ''
        }
        const searchParams = new URLSearchParams(environment);
        const origin = window.location.origin
        const link = `${origin}/playground?${searchParams.toString()}`
        navigator.clipboard.writeText(link)
        toastRef.current?.setMessage({ message: 'Link copiado para o clipboard', title: 'Tudo certo!' })
    }

    const handleBuildEnvironment = () => {
        const IDE = IDERef.current
        if (!IDE) return

        const url = new URLSearchParams(location.search)
        IDE.setCode(url.get('source_code') || '')
        IDE.setLanguage(url.get('language') || '')
        IDE.setStdin(url.get('stdin') || '')
    }

    React.useEffect(() => {
        handleBuildEnvironment()
    })


    return (
        <div className="m-5">
            <Toast ref={toastRef} />

            <h1 className="mb-5">Playground</h1>
            <button className="btn btn-outline-dark mb-3" onClick={handleShareLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill me-3" viewBox="0 0 16 16">
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                </svg>
                Compartilhar
            </button>
            <div className="w-75">
                <IDE ref={IDERef} />
            </div>
        </div>
    )
}

export default Playground
