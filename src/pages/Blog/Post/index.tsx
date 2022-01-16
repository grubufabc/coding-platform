import React from 'react'
import { useParams } from 'react-router'
import { GET_BLOG_POST as API_GET_BLOG_POST } from '../../../api'
import Header from '../../../components/Header'
import MarkdownRender from '../../../components/MarkdownRender'
import useFetch from '../../../hooks/useFetch'
import { IPost } from '../PreviewPost'


const Post: React.FC = () => {
    const { request } = useFetch()
    const { id: idPost } = useParams()
    const [post, setPost] = React.useState<IPost>()

    React.useEffect(() => {
        const getPost = async () => {
            const { url, options } = API_GET_BLOG_POST(idPost || '')
            const { json } = await request(url, options)
            setPost(json as IPost)
        }

        if (post === undefined) getPost()
    })

    if (post === undefined) return null

    return (
        <React.Fragment>
            <Header />
            <div className="m-5">
                <div className="row m-0 d-flex justify-content-center">
                    <div className="col-7">
                        <div className="mb-5">
                            <h1 className="fw-bold">{post.title}</h1>
                            <p className="text-muted">{(new Date()).toDateString()}</p>
                        </div>
                        <div className="mb-5" style={{ height: '40vh', backgroundImage: `url(${post.cover})`, backgroundSize: 'cover' }}></div>
                        <div>
                            <MarkdownRender text={post.content} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Post