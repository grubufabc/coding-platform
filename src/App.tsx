import React from 'react'
import './App.css'
import IDE from './components/IDE'
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import MarkdownEditor from './components/MarkdownEditor'
import CreateProblem from './pages/CreateProblem'


const App: React.FC = () => {
    return (
        <div className="row d-flex justify-content-center mt-5">
            <Router>
                <nav className="mb-4">
                    <li className="nav-item">
                        <Link to="code-editor">code-editor</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="markdown-editor">markdown-editor</Link>
                    </li>
                </nav>
                <Routes>
                    <Route path="/" element={<CreateProblem/>}/>
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
