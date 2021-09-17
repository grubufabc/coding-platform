import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import './style.css'
import { Controlled as ControlledEditor } from 'react-codemirror2'


interface TextEditorProps {
    value: string
    language: string
    onChange: any
}

const TextEditor: React.FC<TextEditorProps> = ({ value, language, onChange }) => {
    
    function handleChange(value: string){
        onChange(value)
    }

    return (
        <div className="">
            <ControlledEditor 
                onBeforeChange={(_, __, value) => handleChange(value)}
                value={value}
                className="code-mirror-wrapper code-wrapper"
                options={{
                    lineWrapping: true,
                    mode: language,
                    theme: 'dracula',
                    lineNumbers: true,
                }}
            />
        </div>
    )
}

export default TextEditor
