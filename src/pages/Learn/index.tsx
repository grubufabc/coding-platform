import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../../api'
import Header from '../../components/Header'
import Card from './Course/Card'
import { Course } from './Course/interfaces/Course'




const Learn: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([])

    React.useEffect(() => {
        const getCourses = async () => {
            const response = await axios.get(`${API_URL}/courses`)
            const courses = response.data as Course[]
            setCourses(courses)
        }
        getCourses()
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="d-flex px-5 mt-5">
                {courses.map((course, index) => (
                    <Card
                        key={index}
                        course={course}
                    />
                ))}
            </div>
        </React.Fragment>
    )
}

export default Learn
