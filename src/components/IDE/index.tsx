import React from 'react'
import Select from '../Form/Select'
import TextEditor from '../TextEditor'
import { languages } from './config'


interface IDEProps {
    
}


const IDE: React.FC<IDEProps> = () => {
    const [code, setCode] = React.useState<string>('')
    const [language, setLanguage] = React.useState<string>('')

    return (
        <div>
            <h1>IDE</h1>
            <Select
                options={languages.map(({ name }) => ({ label: name, value: name}))}
                onChange={setLanguage}
                value={language}
                className="mb-3"
            />
            <TextEditor
                language={(() => {
                    const result = languages.find(({ name }) => name === language)
                    return result ? result.mode : ''
                })()} 
                onChange={setCode} 
                value={code} 
            />
        </div>
    )
}


export default IDE
