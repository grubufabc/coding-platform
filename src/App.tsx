import React from 'react'
import './App.css'
import IDE from './components/IDE'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import MarkdownEditor from './components/MarkdownEditor'


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
                    <Route path="markdown-editor" element={(
                        <div className="col-10">
                            <MarkdownEditor />
                        </div>
                    )} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
