import React from 'react'
import IDE from '../../components/IDE'


const Playground: React.FC = () => {
    return (
        <div className="m-5">
            <h1 className="mb-5">Playground</h1>
            <div className="w-75">
                <IDE/>
            </div>
        </div>
    )
}

export default Playground
