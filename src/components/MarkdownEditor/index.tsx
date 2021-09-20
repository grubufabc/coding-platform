import React, { forwardRef, useImperativeHandle } from 'react'
import TextArea from '../Form/TextArea'
import MarkdownRender from '../MarkdownRender'
import { TextEditorHandles } from '../TextEditor'




interface MarkdownEditorProps {
    value?: string
}


interface MarkdownEditorHandles {
    getText: () => string
}

const MarkdownEditor: React.ForwardRefRenderFunction<TextEditorHandles, MarkdownEditorProps> = ({ value }) => {
    const [text, setText] = React.useState<string>(value || '')

    const getText = (): string => {
        return text
    }

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

export default forwardRef(MarkdownEditor)
