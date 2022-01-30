import React from 'react'
import { Link } from 'react-router-dom'
import { Course } from '../interfaces/Course'


interface CardProps {
    course: Course
}

const countItems = (course: Course): number => {
    return course.chapters.reduce((acc, chapter) => {
        return acc + chapter.content.length
    }, 0)
}

const PlayCircleIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
        </svg>
    )
}

const Card: React.FC<CardProps> = ({ course }) => {
    return (
        <div className="card d-flex flex-column" style={{ width: '18rem', height: '18rem', borderRadius: '1rem', overflow: 'hidden' }}>
            <div className="flex-grow-1 bg-info p-3 border-0" style={{ border: '1px solid gray' }}>
                <h6 className="text-light">Explicação Detalhada de</h6>
                <h2 className="text-white">{course.title}</h2>
            </div>
            <div className="d-flex flex-row justify-content-between px-3" style={{ height: '5rem' }}>
                <div className="d-flex align-items-center" >
                    <div className="text-center">
                        <span className="h4">{course.chapters.length}</span>
                        <br />
                        <small className="text-muted">Capítulos</small>
                    </div>
                </div>
                <div className="d-flex align-items-center" >
                    <div className="text-center">
                        <span className="h4">{countItems(course)}</span>
                        <br />
                        <small className="text-muted">Itens</small>
                    </div>
                </div>
                <div className="d-flex align-items-center" >
                    <Link to={`${course._id}`} className="btn text-primary p-0">
                        <PlayCircleIcon />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card
