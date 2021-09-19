import { Submission } from './models/submission'
// const API_URL = 'https://ce.judge0.com'
const API_URL = 'http://34.133.58.104/'


export function POST_SUBMISSION(submission: Submission){
    return {
        url: `${API_URL}/submissions/?base64_encoded=true&wait=true`,
        options: {
            method: 'POST',
            headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(submission)
        }
    }
}
