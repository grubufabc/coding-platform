import React from 'react'
import TextEditor from '../TextEditor'


interface IDEProps {
    
}


const IDE: React.FC<IDEProps> = () => {
    return (
        <div>
            <h1>IDE</h1>
            <TextEditor />
        </div>
    )
}


export default IDE
