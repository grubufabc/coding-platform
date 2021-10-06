import { Problem } from './models/problem'
import { Submission } from './models/submission'
// const API_URL = 'https://ce.judge0.com'
// const API_URL = 'http://34.133.58.104'
// export const API_URL = 'http://localhost:5000'

export const API_URL = 'https://backend-coding-platform.herokuapp.com'


export function POST_SUBMISSION(submission: Submission){
    return {
        url: `${API_URL}/codes`,
        options: {
            method: 'POST',
            headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(submission)
        }
    }
}

export function POST_PROBLEM(problem: Problem) {
    return {
        url: `${API_URL}/problems`,
        options: {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(problem)
        }
    }
}

export function GET_PROBLEMS() {
    return {
        url: `${API_URL}/problems`,
        options: {
            method: 'GET',
        }
    }
}

export function GET_PROBLEM(id: string) {
    return {
        url: `${API_URL}/problems/${id}`,
        options: {
            method: 'GET',
        }
    }
}

export function POST_SOLUTION(
    idProblem: string, 
    code: {language_id: number, source_code: string}
){
    return {
        url: `${API_URL}/solutions`,
        options: {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                problem_id: idProblem,
                ...code
            })
        }
    }
}

export function POST_BLOG_POST(
    blogPost: { title: string, content: string, cover: string }
){
    return {
        url: `${API_URL}/blog-posts`,
        options: {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        }
    }
}

export function GET_BLOG_POSTS(){
    return {
        url: `${API_URL}/blog-posts`,
        options: {
            method: 'GET',
        }
    }
}


export function GET_BLOG_POST(id: string){
    return {
        url: `${API_URL}/blog-posts/${id}`,
        options: {
            method: 'GET',
        }
    }
}
