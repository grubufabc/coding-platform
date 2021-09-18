import React from 'react'
import './App.css'
import IDE from './components/IDE'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'


const App: React.FC = () => {
    return (
        <div className="row d-flex justify-content-center mt-5">
            <Router>
                <Routes>
                    <Route path="code-editor" element={(
                        <div className="col-6">
                            <IDE />
                        </div>
                    )} />
                    <Route path="markdown-editor" element={<h1>ola</h1>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
