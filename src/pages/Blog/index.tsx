import React from 'react'
import PreviewPost, { IPost } from './PreviewPost'




const posts: IPost[] = [
    {
        id: "xxx",
        title: "Aprenda tudo sobre programação dinâmica",
        date: "10/10/2021",
        content: "Conteudo do post",
        cover: "https://images.unsplash.com/photo-1560785496-3c9d27877182?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80"
    }
]

const Blog: React.FC = () => {
    return (
        <div className="m-5 border">
            <h1 className="mb-5">Blog</h1>
            <div className="row m-0">
                <div className="col-8 border">
                { posts.map((post, index) => (
                        <PreviewPost post={post} key={index} />
                    ))}
                </div>
                <div className="col-4">
                    
                </div>
            </div>
        </div>
    )
}

export default Blog