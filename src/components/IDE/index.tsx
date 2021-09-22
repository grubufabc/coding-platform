import React, {useImperativeHandle, forwardRef} from 'react'
import TextArea from '../Form/TextArea'
import TextEditor, { TextEditorHandles } from '../TextEditor'
import { languages } from './config'
import useFetch from '../../hooks/useFetch'
import { utf8_to_b64 } from '../../utils'
import { Submission } from '../../models/submission'
import { POST_SUBMISSION as API_POST_SUBMISSION } from '../../api'
import { CompileOutputHandler, StderrHandler, StdoutHandler, TimeLimitExceededHandler } from './submission-handle'
import { StdoutState } from './submission-handle/stdout-state'
import { Language } from '../../models/language'


export interface IDEHandles {
    getCode: () => string
    getLanguage: () => Language | undefined
    getStdin: () => string
    getStdout: () => string
    cleanStdin: () => void
    cleanStdout: () => void
}

const IDE: React.ForwardRefRenderFunction<IDEHandles> = (_, ref) => {
    const { request, loading } = useFetch()

    const [stdin, setStdin] = React.useState<string>('')
    const [stdout, setStdout] = React.useState<StdoutState>({ message: '', error: false })
    const textEditorRef = React.useRef<TextEditorHandles>(null)

    useImperativeHandle(ref, () => {
        return {
            getCode: () => textEditorRef.current?.getText() || '',
            getLanguage: () => textEditorRef.current?.getLanguage(),
            getStdin: () => stdin,
            getStdout: () => stdout.message,
            cleanStdin: () => { setStdin('') },
            cleanStdout: () => { setStdout({ message: '', error: false }) }
        }
    })

    const handleRunCode = async () => {
        if (!textEditorRef.current) return

        const textEditor = textEditorRef.current

        const validateCode = () => (textEditor.getText() || '').length > 0
        const validateLanguage = () => textEditor.getLanguage() !== undefined

        const isValid = [
            validateCode,
            validateLanguage
        ].every(fn => fn())

        if (!isValid) return
        setStdout({ message: '', error: false })

        const { url, options } = API_POST_SUBMISSION({
            language_id: textEditor.getLanguage()!.id,
            source_code: utf8_to_b64(textEditor.getText()),
            stdin: utf8_to_b64(stdin)
        })
        const { json } = await request(url, options)
        const submission = json as Submission

        const compileOutputHandler = new CompileOutputHandler()
        compileOutputHandler
            .setNextHandler(new StderrHandler())
            .setNextHandler(new StdoutHandler())
            .setNextHandler(new TimeLimitExceededHandler())

        compileOutputHandler.handle(submission, setStdout)
    }

    return (
        <div>
            <div className="row mb-4">
                <TextEditor
                    toolbar={[
                        (loading ? (
                            <button disabled={true} onClick={handleRunCode} type="button" className="btn btn-dark btn-lg w-25">Processando...</button>
                        ) : (    
                            <button onClick={handleRunCode} type="button" className="btn btn-outline-dark btn-lg w-25">Executar</button>
                        ))
                    ]}
                    languages={languages}
                    ref={textEditorRef}
                />
            </div>
            <div className="row">
                <div className="col">
                    <TextArea
                        rows={5}
                        className="mb-3"
                        label={{ text: 'stdin', id: 'stdin' }}
                        value={stdin}
                        onChange={setStdin}
                    />
                </div>
                <div className="col">
                    <TextArea
                        disabled={true}
                        rows={5}
                        className={`mb-3 ${stdout.error ? 'text-danger' : ''}`}
                        label={{ text: 'stdout', id: 'stdout' }}
                        value={loading ? '⚙️  🛠  Processando . . .' : stdout.message}
                    />
                </div>
            </div>
        </div>
    )
}

export default forwardRef(IDE)
