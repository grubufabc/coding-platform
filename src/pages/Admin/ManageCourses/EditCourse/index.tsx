import React from 'react'
import { useParams } from 'react-router'
import CourseForm from '../../CourseForm'


const EditCourse: React.FC = () => {
    const { id } = useParams()

    return (
        <div>
            <h1 className="mb-5">Editar Curso</h1>
            <CourseForm
                id={id}
            />
        </div>
    )
}

export default EditCourse
