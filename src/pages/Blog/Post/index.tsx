import React from 'react'
import MarkdownRender from '../../../components/MarkdownRender'
import { IPost } from '../PreviewPost'



const post: IPost = {
    id: "xxx",
    title: "Aprenda tudo sobre programação dinâmica",
    date: "10/10/2021",
    content: "You don’t need to spend $10k on a Bootcamp to become a backend developer in 2021. Whether you need to learn: Node, Express, SQL, NoSQL, REST, JSON, APIs, or the latest fancy technologies, you can do it for free, leveraging the power of the internet. I’ve personally gathered, watched, tested, and reviewed thousands of resources, to come up with the only: JavaScript-based backend roadmap you’ll ever need in 2021.\n ## 1. The Start of Your Backend Journey: Learn how the web works",
    cover: "https://images.unsplash.com/photo-1560785496-3c9d27877182?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80"
}


const Post: React.FC = ({ }) => {
    return (
        <div className="m-5">
            <div className="row m-0 d-flex justify-content-center">
                <div className="col-6">
                    <div className="mb-5">
                        <h1 className="fw-bold">{post.title}</h1>
                    </div>
                    <div className="mb-5" style={{ height: '40vh', backgroundImage: `url(${post.cover})`, backgroundSize: 'cover'}}></div>
                    <div>
                        <MarkdownRender text={post.content}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post