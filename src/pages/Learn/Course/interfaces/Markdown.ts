import { Section } from "./Section";

export interface Markdown extends Section {
    type: 'markdown'
    text: string
}
