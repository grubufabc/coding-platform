import React from 'react'


interface Options {
    label: string,
    value: string
}


interface SelectProps {
    options: Options[]
    className?: string
    onChange: React.Dispatch<React.SetStateAction<string>>
    value: string
    label: string
}


const Select: React.FC<SelectProps> = ({ options, className, onChange, value, label }) => {

    function handlChange({ value }: HTMLSelectElement) {
        onChange(value)
    }

    return (
        <div className={`form-floating ${className}`}>
            <select value={value} onChange={({ target }) => handlChange(target)} className="form-select">
                <option value="">Selecione uma linguagem</option>
                { 
                    options.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))
                } 
            </select>
            <label>{label}</label>
        </div>
    )
}

export default Select
