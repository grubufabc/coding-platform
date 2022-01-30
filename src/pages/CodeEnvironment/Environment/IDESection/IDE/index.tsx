import React from 'react'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { useIDE } from '../useIDE'
import { languages } from '../../../../../components/IDE/config'
import './style.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'

const IDE: React.FC = () => {
    const { sourceCode, setSourceCode, languageId } = useIDE()

    const getModeLanguage = (languageId: number): string => {
        const modeLanguage = languages.find(language => language.id === languageId)
        if(modeLanguage) {
            return modeLanguage.mode
        }
        return 'text/plain'
    }   

    return (
        <div className="flex-grow-1" style={{ overflowY: 'scroll' }} >
            <ControlledEditor
                onBeforeChange={(_, __, value) => {
                    setSourceCode(value)                    
                }}
                value={sourceCode}
                className={`code-mirror-wrapper code-wrapper-100percent`}
                options={{
                    indentWithTabs: true,
                    tabSize: 4,
                    lineWrapping: true,
                    mode: getModeLanguage(languageId) || '',
                    theme: 'neat',
                    lineNumbers: true,
                    indentUnit: 4
                }}
            />
        </div>
    )
}

export default IDE
