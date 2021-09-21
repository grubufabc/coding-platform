import React, { useImperativeHandle, forwardRef } from 'react'

declare var bootstrap: any

interface ToastContent {
    message: string
    title: string
}

export interface ToastHandles {
    setMessage: ({ message, title }: ToastContent) => void
}



const Toast: React.ForwardRefRenderFunction<ToastHandles> = (_, ref) => {
    const toastRef = React.useRef(null)
    const [toast, setToast] = React.useState<ToastContent>({ message: '', title: '' })

    const setMessage = ({ message, title }: ToastContent) => {
        if (!toastRef.current) return
        const toast = new bootstrap.Toast(toastRef.current)
        toast.show()
        setToast({ message, title })
    }

    useImperativeHandle(ref, () => {
        return {
            setMessage
        }
    })

    return (

        <div className="bg-dark position-fixed fixed-bottom">
            <div className="toast-container position-absolute p-3 bottom-0 end-0" id="toastPlacement">
                <div ref={toastRef} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">{toast.title}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {toast.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Toast)
