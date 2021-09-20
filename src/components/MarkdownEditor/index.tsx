import React from 'react'
import TextArea from '../Form/TextArea'
import MarkdownRender from '../MarkdownRender'


interface MarkdownEditorProps {
    
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = () => {
    const [text, setText] = React.useState<string>('')

    return (
        <div>
            <h1>Markdown</h1>
            <div className="row">
                <div className="col-6">
                <TextArea value={text} onChange={setText} />
                </div>
                <div className="col-6">
                    <MarkdownRender text={text} />
                </div>
            </div>
        </div>
    )    
}

export default MarkdownEditor
