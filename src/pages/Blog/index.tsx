import React from 'react';
import { GET_BLOG_POSTS as API_GET_BLOG_POSTS } from '../../api';
import Header from '../../components/Header';
import useFetch from '../../hooks/useFetch';
import PreviewPost, { IPost } from './PreviewPost';

const Blog: React.FC = () => {
	const { request, loading } = useFetch();
	const [posts, setPosts] = React.useState<IPost[]>();

	React.useEffect(() => {
		const getBlogPosts = async () => {
			const { url, options } = API_GET_BLOG_POSTS();
			const { json } = await request(url, options);
			setPosts(json as IPost[]);
		};
		if (posts === undefined) getBlogPosts();
	}, [posts, request]);

	return (
		<React.Fragment>
			<Header />
			<div className="m-5">
				<h1 className="mb-5">Blog</h1>
				{loading && (
					<div className="d-flex align-items-center">
						<strong>Carregando posts...</strong>
						<div
							className="spinner-border ms-5"
							role="status"
							aria-hidden="true"
						></div>
					</div>
				)}
				<div className="row m-0">
					<div className="col-8">
						{posts &&
							posts.map((post, index) => (
								<PreviewPost className="mb-5" post={post} key={index} />
							))}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Blog;
