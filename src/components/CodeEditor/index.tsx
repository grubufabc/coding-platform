import React, { forwardRef, useImperativeHandle } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import './style.css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import Select from '../Form/Select'
import { Language } from '../../models/language'


interface CodeEditorProps {
    languages: Language[]
    toolbar: any[]
}

export interface CodeEditorHandles {
    getCode: () => string
    getLanguage: () => Language | undefined
    setCode: React.Dispatch<React.SetStateAction<string>>
    setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const CodeEditor: React.ForwardRefRenderFunction<CodeEditorHandles, CodeEditorProps> = ({ languages, toolbar }, ref) => {
    const [code, setCode] = React.useState<string>('')
    const [language, setLanguage] = React.useState<string>('')

    const getCode = () => code
    const getLanguage = () => languages.find(({ name }) => name === language)
    const getModeLanguage = () => {
        const language = getLanguage()
        return language ? language.mode : ''
    }

    useImperativeHandle(ref, () => {
        return {
            getCode,
            getLanguage,
            setCode,
            setLanguage
        }
    })

    return (
        <div>
            <div className="d-grid d-flex justify-content-between mb-4" role="group">
                <Select
                    options={languages.map(({ name }) => ({ label: name, value: name }))}
                    onChange={setLanguage}
                    value={language}
                    label="Linguagem"
                />
                {toolbar.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)}
            </div>

            <ControlledEditor
                onBeforeChange={(_, __, value) => setCode(value)}
                value={code}
                className="code-mirror-wrapper code-wrapper"
                options={{
                    indentWithTabs: true,
                    tabSize: 4,
                    lineWrapping: true,
                    mode: getModeLanguage(),
                    theme: 'dracula',
                    lineNumbers: true,
                    indentUnit: 4
                }}
            />
        </div>
    )
}

export default forwardRef(CodeEditor)
