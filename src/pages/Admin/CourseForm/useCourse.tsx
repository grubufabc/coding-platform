import React, { useState } from 'react'
import axios from "axios"
import { Chapter } from '../../Learn/Course/interfaces/Chapter'
import { Section } from '../../Learn/Course/interfaces/Section'
import { useToast } from '../../../hooks/useToast'
import { API_URL } from '../../../api'
import { Course } from '../../Learn/Course/interfaces/Course'
import { Markdown } from '../../Learn/Course/interfaces/Markdown'
import { Code } from '../../Learn/Course/interfaces/Code'


interface CourseProviderProps {
    children: React.ReactNode
}

interface CourseContextData {
    id?: string
    title: string
    chapters: Chapter[]
    setTitle: (title: string) => void
    addNewChapter: () => void
    removeChapter: (chapter: Chapter) => void
    saveCourse: () => Promise<void>
    addCodeSection: (chapter: Chapter) => void
    addMarkdownSection: (chapter: Chapter) => void
    moveSectionForward: (chapter: Chapter, section: Section) => void
    moveSectionBackward: (chapter: Chapter, section: Section) => void
    removeSection: (chapter: Chapter, section: Section) => void
    updateSection: () => void
    getCourse: (id: string) => Promise<void>
    loading: boolean
    deleteCourse: () => Promise<void>
    updateChapter: () => void
    loadCourse: (courseId: string) => void
}


const CourseContext = React.createContext<CourseContextData>(
    {} as CourseContextData
)

const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
    const [title, setTitle] = useState<string>('New Course')
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [id, setId] = useState<string>('')
    const { setMessage: ToastSetMessage } = useToast()

    const deleteCourse = async () => {
        setLoading(true)
        ToastSetMessage({
            title: 'Deletando curso',
            body: 'Aguarde...'
        })
        await axios.delete(`${API_URL}/courses/${id}`)
        ToastSetMessage({
            title: 'Curso deletado',
            body: 'Curso deletado com sucesso'
        })
        setLoading(false)
    }

    const getCourse = async (id: string) => {
        setLoading(true)
        const response = await axios.get(`${API_URL}/courses/${id}`)
        setLoading(false)
        const course = response.data as Course
        setTitle(course.title)
        setId(course._id || "")
        setChapters(course.chapters)
    }

    const addNewChapter = () => {
        const newChapter: Chapter = {
            title: 'new Chapter',
            content: []
        }
        setChapters([...chapters, newChapter])
    }

    const removeChapter = (chapter: Chapter) => {
        setChapters(chapters.filter(chapterItem => chapterItem !== chapter))
    }

    const addCodeSection = (chapter: Chapter) => {
        const newCodeSection: Code = {
            type: 'code',
            sourceCode: '',
            language_id: 0
        }
        chapter.content.push(newCodeSection)
        setChapters([...chapters])
    }


    const moveSectionForward = (chapter: Chapter, section: Section) => {
        const index = chapter.content.indexOf(section)
        if (index === chapter.content.length - 1) return
        chapter.content.splice(index, 1)
        chapter.content.splice(index + 1, 0, section)
        setChapters([...chapters])
    }

    const moveSectionBackward = (chapter: Chapter, section: Section) => {
        const index = chapter.content.indexOf(section)
        if (index === 0) return
        chapter.content.splice(index, 1)
        chapter.content.splice(index - 1, 0, section)
        setChapters([...chapters])
    }

    const removeSection = (chapter: Chapter, section: Section) => {
        const index = chapter.content.indexOf(section)
        chapter.content.splice(index, 1)
        setChapters([...chapters])
    }


    const saveCourse = async () => {
        setLoading(true)
        
        ToastSetMessage({
            title: 'Salvando o curso',
            body: 'Aguarde...',
            icon: '⏳'
        })

        let course: Course = {} as Course
        if (id) {
            const response = await axios.put(`${API_URL}/courses/${id}`, {
                title,
                chapters
            })
            course = response.data as Course
        }
        else {
            const response = await axios.post(`${API_URL}/courses`, {
                title,
                chapters
            })
            course = response.data as Course
        }
        setTitle(course.title)
        setId(course._id || "")
        setChapters(course.chapters)

        ToastSetMessage({
            title: 'Sucesso',
            body: 'Curso salvo com sucesso',
            icon: '✅'
        })
        
        setLoading(false)
    }

    const addMarkdownSection = (chapter: Chapter) => {
        const newMarkdownSection: Markdown = {
            type: 'markdown',
            text: ''
        }
        chapter.content.push(newMarkdownSection)
        setChapters([...chapters])
    }

    const updateSection = () => {
        setChapters([...chapters])
    }

    const updateChapter = () => {
        setChapters([...chapters])
    }

    const loadCourse = (courseId: string) => {
        if(courseId !== id) {
            getCourse(courseId)
        }
    }

    return (
        <CourseContext.Provider value={{
            title,
            chapters,
            setTitle,
            addNewChapter,
            removeChapter,
            saveCourse,
            addCodeSection,
            addMarkdownSection,
            moveSectionForward,
            moveSectionBackward,
            removeSection,
            updateSection,
            getCourse,
            loading,
            deleteCourse,
            updateChapter,
            loadCourse
        }}>
            {children}
        </CourseContext.Provider>
    )
}

const useCourse: () => CourseContextData = () => {
    const context = React.useContext(CourseContext)
    return context
}

export { CourseProvider, useCourse }