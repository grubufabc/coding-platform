import React from 'react'
import TextArea from '../Form/TextArea'
import TextEditor, { TextEditorHandles } from '../TextEditor'
import { languages } from './config'
import useFetch from '../../hooks/useFetch'
import { utf8_to_b64 } from '../../utils'
import { Submission } from '../../models/submission'
import { POST_SUBMISSION as API_POST_SUBMISSION } from '../../api'
import { CompileOutputHandler, StderrHandler, StdoutHandler, TimeLimitExceededHandler } from './submission-handle'
import { StdoutState } from './submission-handle/stdout-state'


const IDE: React.FC = () => {
    const { request, loading } = useFetch()

    const [stdin, setStdin] = React.useState<string>('')
    const [stdout, setStdout] = React.useState<StdoutState>({ message: '', error: false })
    const textEditorRef = React.useRef<TextEditorHandles>(null)

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
            <h1>IDE</h1>
            <div className="row mb-4">
                <TextEditor
                    toolbar={[
                        (loading ? (
                            <button disabled={true} onClick={handleRunCode} type="button" className="btn btn-secondary btn-lg w-25">Processando...</button>
                        ) : (
                            <button onClick={handleRunCode} type="button" className="btn btn-secondary btn-lg w-25">Executar</button>
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
            <div className="row mb-3">
                
            </div>
        </div>
    )
}


export default IDE
