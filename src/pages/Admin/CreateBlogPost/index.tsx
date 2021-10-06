import React from 'react'
import { POST_BLOG_POST as API_POST_BLOG_POST } from '../../../api'
import Input from '../../../components/Form/Input'
import InputImage, { InputImageHandles } from '../../../components/Form/InputImage'
import TextArea from '../../../components/Form/TextArea'
import MarkdownRender from '../../../components/MarkdownRender'
import useFetch from '../../../hooks/useFetch'


const CreateBlogPost = () => {
    const [preview, setPreview] = React.useState<boolean>(false)
    const {request} = useFetch()

    const [title, setTitle] = React.useState<string>('')
    const [content, setContent] = React.useState<string>('')
    const inputImageRef = React.useRef<InputImageHandles>(null)


    const handlePreview = () => {
        setPreview(old => !old)
    }

    const handleSave = async () => {
        const cover = inputImageRef.current?.getImgBase64() || ''
        const validateCover = () => cover.length > 0
        const validateTitle = () => title.length > 0
        const validateContent = () => content.length > 0

        const isValid = [
            validateCover,
            validateTitle,
            validateContent
        ].every(fn => fn())

        if(!isValid) return
        const { url, options } = API_POST_BLOG_POST({
            title,
            cover,
            content
        })
        const { json } = await request(url, options)
        console.log(json)
    }

    return (
        <div className="">
            <h1 className="mb-5">Nova Postagem</h1>

            <Input 
                value={title} 
                setValue={setTitle}
                placeholder="Insira um Título"
                label={{
                    text: 'Insira um Título',
                    id: 'title'
                }}
                className="mb-5"
            />

            <InputImage
                ref={inputImageRef}
                label="Insira uma imagem de capa"
                className="mb-5"
                heightImg="40vh"
            />

            <div className="mb-5">
                { preview ? (
                    <button onClick={handlePreview} className="btn btn-dark">Editar</button>
                ) : (
                    <button onClick={handlePreview} className="btn btn-dark">Preview</button>
                )}
                
            </div>

            <div>
                { preview ? (
                    <MarkdownRender text={content}/>
                ) : (
                    <TextArea
                        value={content}
                        onChange={setContent}
                        rows={30}
                    />
                )}
            </div>

            <div>
                <button 
                    className="btn btn-dark"
                    onClick={handleSave}
                >
                    Salvar
                </button>
            </div>
        </div>
    )
}

export default CreateBlogPost
