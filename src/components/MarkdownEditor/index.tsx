import React, { forwardRef, useImperativeHandle, KeyboardEvent } from 'react'
import MarkdownRender from '../MarkdownRender'


interface MarkdownEditorProps {
    value?: string
    onChange?: React.Dispatch<React.SetStateAction<string>>
}


export interface MarkdownEditorHandles {
    getText: () => string
}


const MarkdownEditor: React.ForwardRefRenderFunction<MarkdownEditorHandles, MarkdownEditorProps> = ({ value, onChange }, ref) => {
    const [text, setText] = React.useState<string>(value || '')
    const rows = 10

    React.useEffect(() => {
        if (onChange) onChange(text)
    }, [text, onChange])


    const getText = () => text

    useImperativeHandle(ref, () => {
        return {
            getText
        }
    })


    function handleIndentation(textarea: HTMLTextAreaElement) {
        const [start, end] = [textarea.selectionStart, textarea.selectionEnd]
        const append = "      "
        textarea.value = [
            textarea.value.substring(0, start),
            append,
            textarea.value.substring(end)
        ].join('')
        textarea.selectionStart = textarea.selectionEnd = start + append.length;
    }

    function textAreaAdjust(textarea: HTMLTextAreaElement) {
        textarea.rows = rows
        while (textarea.scrollHeight > textarea.clientHeight) {
            textarea.rows += 2
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        textAreaAdjust(event.target as HTMLTextAreaElement)
        if (event.key === 'Tab') {
            event.preventDefault()
            handleIndentation(event.target as HTMLTextAreaElement)
        }
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className="form-floating">
                    <textarea
                        className="form-control h-100"
                        value={value}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        rows={rows}
                        onChange={({ target }) => {
                            textAreaAdjust(target)
                            setText(target.value)
                        }}
                    />
                </div>
            </div>
            <div className="col-6">
                <MarkdownRender text={text} />
            </div>
        </div>
    )
}

export default forwardRef(MarkdownEditor)
