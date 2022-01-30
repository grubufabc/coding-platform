import { Section } from "./Section";

export interface Code extends Section {
    type: 'code'
    sourceCode: string
    language_id: number
}
