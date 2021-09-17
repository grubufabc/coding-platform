import React from 'react'


interface TextAreaProps {
    value: string
    onChange?: React.Dispatch<React.SetStateAction<string>>
    rows?: number
    placeholder?: string
    className?: string
    label?: {
        text: string
        id: string
    }
    error?: boolean
    disabled?: boolean
}


const TextArea: React.FC<TextAreaProps> = ({ 
    value, 
    onChange, 
    rows, 
    placeholder, 
    className, 
    label, 
    error, 
    disabled 
}) => {

    function handleChange({value}: HTMLTextAreaElement) {
        if(onChange) onChange(value)
    }

    return (
        <div className="form-floating">
            <textarea 
                rows={rows} 
                value={value} 
                onChange={({target}) => handleChange(target)} 
                className={`form-control h-100 ${className} ${error ? 'is-invalid': ''}`} 
                placeholder={placeholder || ''} 
                id={label?.id || ''}
                disabled={disabled ? true : false}
            />
            { label && (<label htmlFor={label?.id || ''}>{label.text}</label>)}
        </div>
    )
}

export default TextArea
