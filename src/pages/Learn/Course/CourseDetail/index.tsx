import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../../../../api'
import Header from '../../../../components/Header'
import { Course } from '../interfaces/Course'
import Main from './Main'
import Menu from './Menu'



const CourseDetail: React.FC = () => {
    const { id } = useParams()
    const [course, setCourse] = useState<Course>()
    const [selectedChapter, setSelectedChapter] = useState<number>(0)
    
    React.useEffect(() => {
        const getCourse = async () => {
            const response = await axios.get(`${API_URL}/courses/${id}`)
            const course = response.data as Course
            setCourse(course)
        }
        getCourse()
    }, [id])

    if(!course){
        return null
    }

    return (
        <React.Fragment>
            <Header/>
            <div className="bg-info px-5 d-flex align-items-center" style={{ height: '10rem' }}>
                <div>
                    <h6 className="text-light">Explicação Detalhada de</h6>
                    <h1 className="text-white">{course.title}</h1>
                </div>
            </div>
            <div className="d-flex p-5" style={{ marginBottom: '10rem'}}>
                <Menu
                    selectedChapter={selectedChapter}
                    setSelectedChapter={setSelectedChapter}
                    chapters={course.chapters}
                />
                <Main
                    chapter={course.chapters[selectedChapter]}
                />
            </div>
        </React.Fragment>
    )
}

export default CourseDetail
