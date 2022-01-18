import React from 'react'


declare var bootstrap: any

interface PopoverProps {
    children: React.ReactNode
    content: string
    html?: boolean
    placement?: string
}

const Popover: React.FC<PopoverProps> = ({ children, content, html, placement }) => {
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (ref.current) {
            new bootstrap.Popover(ref.current)
        }   
    }, [ref])


    return (
        <span
            ref={ref}
            className="d-inline-block p-0"
            tabIndex={0}
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-content={content}
            data-bs-html={`${html ? 'true' : 'false'}`}
            data-bs-placement={placement}
        >
            {children}
        </span>
    )
}

export default Popover
