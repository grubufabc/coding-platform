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


interface TextEditorProps {
    languages: Language[]
    toolbar: any[]
}

export interface TextEditorHandles {
    getText: () => string
    getLanguage: () => Language | undefined
}

const TextEditor: React.ForwardRefRenderFunction<TextEditorHandles, TextEditorProps> = ({ languages, toolbar }, ref) => {
    const [text, setText] = React.useState<string>('')
    const [language, setLanguage] = React.useState<string>('')

    const getText = () => text
    const getLanguage = () => languages.find(({ name }) => name === language)
    const getModeLanguage = () => {
        const language = getLanguage()
        return language ? language.mode : ''
    }

    useImperativeHandle(ref, () => {
        return {
            getText,
            getLanguage
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
                { toolbar.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>) }
            </div>

            <ControlledEditor
                onBeforeChange={(_, __, value) => setText(value)}
                value={text}
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

export default forwardRef(TextEditor)
