import React from 'react'


interface InputProps {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    className?: string
    label?: {
        text: string
        id: string
    }
    placeholder?: string
}

const Input: React.FC<InputProps> = ({ value, setValue, className, label, placeholder }) => {
    return (
        <div className={`form-floating ${className}`}>
            <input 
                value={value} 
                onChange={({ target }) => setValue(target.value||'')} 
                className="form-control" id={`input-${label?.id||''}`} 
                placeholder={placeholder || ''}
            />
            { label && <label htmlFor={`input-${label.id}`}>{ label.text }</label>}
        </div>
    )
}

export default Input
