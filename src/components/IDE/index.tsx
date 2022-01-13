import React, { useImperativeHandle, forwardRef } from 'react'
import TextArea from '../Form/TextArea'
import CodeEditor, { CodeEditorHandles } from '../CodeEditor'
import { languages } from './config'
import useFetch from '../../hooks/useFetch'
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
    setCode: (code: string, timestamp?: number) => void
    setLanguage: (language: string) => void
    setStdin: (stdin: string, timestamp?: number) => void
    cleanStdin: () => void
    cleanStdout: () => void
}

interface IDEProps {
    onChange?: (code: string, language: string, stdin: string) => void
    classNameCodeEditor?: string
}

const IDE: React.ForwardRefRenderFunction<IDEHandles, IDEProps> = ({ onChange, classNameCodeEditor="" }, ref) => {
    const { request, loading } = useFetch()

    const [stdinIDE, setStdinIDE] = React.useState<string>('')
    const [stdout, setStdout] = React.useState<StdoutState>({ message: '', error: false })
    const codeEditorRef = React.useRef<CodeEditorHandles>(null)
    const [currTimestamp, setCurrTimestamp] = React.useState<number>(0)

    const setCode = (code: string, timestamp?: number) => {
        const codeEditor = codeEditorRef.current
        if (!codeEditor) return

        if (timestamp === undefined) {
            codeEditor.setCode(code)
            return
        }

        if (currTimestamp < timestamp) {
            codeEditor.setCode(code)
            setCurrTimestamp(timestamp)
        }
    }

    const setLanguage = (language: string) => {
        codeEditorRef.current?.setLanguage(language)
    }

    const handleChangeIDE = (stdin: string) => {
        if (codeEditorRef.current && onChange) {
            const code = codeEditorRef.current.getCode()
            const language = codeEditorRef.current.getLanguage()
            onChange(code, language?.name || '', stdin)
        }
    }

    const handleChangeCodeEditor = (code: string, language: string, timestamp: number) => {
        if (onChange){
            onChange(code, language, stdinIDE)
            setCurrTimestamp(timestamp)
        }
    }

    const setStdin = (stdin: string, timestamp?: number) => {
        const codeEditor = codeEditorRef.current
        if (!codeEditor) return

        if (timestamp === undefined) {
            setStdinIDE(stdin)
            return
        }

        if (currTimestamp < timestamp) {
            setStdinIDE(stdin)
            setCurrTimestamp(timestamp)
        }
    }

    useImperativeHandle(ref, () => {
        return {
            getCode: () => codeEditorRef.current?.getCode() || '',
            getLanguage: () => codeEditorRef.current?.getLanguage(),
            getStdin: () => stdinIDE,
            getStdout: () => stdout.message,
            setCode,
            setLanguage,
            setStdin,
            cleanStdin: () => { setStdinIDE('') },
            cleanStdout: () => { setStdout({ message: '', error: false }) }
        }
    })

    const handleRunCode = async () => {
        if (!codeEditorRef.current) return

        const textEditor = codeEditorRef.current

        const validateCode = () => (textEditor.getCode() || '').length > 0
        const validateLanguage = () => textEditor.getLanguage() !== undefined

        const isValid = [
            validateCode,
            validateLanguage
        ].every(fn => fn())

        if (!isValid) return
        setStdout({ message: '', error: false })

        const { url, options } = API_POST_SUBMISSION({
            language_id: textEditor.getLanguage()!.id,
            source_code: textEditor.getCode(),
            stdin: stdinIDE
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
                <CodeEditor
                    className={classNameCodeEditor}
                    toolbar={[
                        (loading ? (
                            <button disabled={true} onClick={handleRunCode} type="button" className="btn btn-dark btn-lg w-25">Processando...</button>
                        ) : (
                            <button onClick={handleRunCode} type="button" className="btn btn-outline-dark btn-lg w-25">Executar</button>
                        ))
                    ]}
                    languages={languages}
                    ref={codeEditorRef}
                    onChange={handleChangeCodeEditor}
                />
            </div>
            <div className="row">
                <div className="col">
                    <TextArea
                        rows={5}
                        className="mb-3 nowrap-textarea"
                        label={{ text: 'stdin', id: 'stdin' }}
                        value={stdinIDE}
                        onChange={(value: string) => {
                            setStdinIDE(value)
                            handleChangeIDE(value)
                            setCurrTimestamp(new Date().getTime())
                        }}
                    />
                </div>
                <div className="col">
                    <TextArea
                        disabled={true}
                        rows={5}
                        className={`mb-3 nowrap-textarea ${stdout.error ? 'text-danger' : ''}`}
                        label={{ text: 'stdout', id: 'stdout' }}
                        value={loading ? '⚙️  🛠  Processando . . .' : stdout.message}
                    />
                </div>
            </div>
        </div>
    )
}

export default forwardRef(IDE)
