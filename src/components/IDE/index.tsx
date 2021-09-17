import React from 'react'
import TextArea from '../Form/TextArea'
import Select from '../Form/Select'
import TextEditor from '../TextEditor'
import { languages } from './config'
import useFetch from '../../hooks/useFetch'
import { b64_to_utf8, utf8_to_b64 } from '../../utils'
import { Submission } from '../../models/Submission'
import { POST_SUBMISSION as API_POST_SUBMISSION} from '../../api'


interface StdoutState {
    message: string
    error: boolean
}


interface IDEProps {

}


const IDE: React.FC<IDEProps> = () => {
    const { request, loading } = useFetch()

    const [code, setCode] = React.useState<string>('')
    const [language, setLanguage] = React.useState<string>('')
    const [stdin, setStdin] = React.useState<string>('')
    const [stdout, setStdout] = React.useState<StdoutState>({ message: '', error: false })

    const getModeLanguage = (): string => {
        const result = languages.find(({ name }) => name === language)
        return result ? result.mode : ''
    }

    const getIdLanguage = (): number =>  {
        const result = languages.find(({ name }) => name === language)
        return result ? result.id : 0
    }


    const handleRunCode = async () => {
        const validateCode = () => code.length > 0
        const validateLanguage = () => language.length > 0
        const isValid = [
            validateCode,
            validateLanguage
        ].every(fn => fn())

        if (!isValid) return
        setStdout({message: '', error: false})

        const { url, options } = API_POST_SUBMISSION({
            language_id: getIdLanguage(),
            source_code: utf8_to_b64(code),
            stdin: utf8_to_b64(stdin)
        })
        const { json } = await request(url, options)
        const submission = json as Submission

        if (submission.compile_output) {
            setStdout({
                message: `Error: ${b64_to_utf8(submission.compile_output)}`,
                error: true
            })
        }

        if (submission.stderr) {
            setStdout({
                message: `Error: ${b64_to_utf8(submission.stderr)}`,
                error: true
            })
        }

        if (submission.stdout) {
            setStdout({
                message: b64_to_utf8(submission.stdout),
                error: false
            })
        }
        
        if(submission.status!.description === 'Time Limit Exceeded'){
            setStdout({
                message: `Time Limit Exceeded`,
                error: true
            })
        }
    }

    return (
        <div>
            <h1>IDE</h1>
            <div className="row mb-3">
                <div className="col">
                    <Select
                        options={languages.map(({ name }) => ({ label: name, value: name }))}
                        onChange={setLanguage}
                        value={language}
                        label="linguagem"
                    />
                </div>
                <div className="col text-end">
                    { loading ? (
                        <button disabled={true} onClick={handleRunCode} type="button" className="btn btn-secondary btn-lg px-5 h-100">Processando...</button>
                    ) : (
                        <button onClick={handleRunCode} type="button" className="btn btn-secondary btn-lg h-100 px-5">Executar</button>
                    )}
                </div>
            </div>

            <TextEditor
                language={getModeLanguage()}
                onChange={setCode}
                value={code}
            />
            <div className="row mt-5">
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
                        className={`mb-3 ${stdout.error ? 'text-danger': ''}`} 
                        label={{ text: 'stdout', id: 'stdout' }} 
                        value={loading ? '⚙️  🛠  Processando . . .' : stdout.message}
                    />
                </div>
            </div>
        </div>
    )
}


export default IDE
