export interface Commit {
    code: {
        source_code: string
        language_id: number
        stdin: string
    }
    timestamp: number
    id: string
}
