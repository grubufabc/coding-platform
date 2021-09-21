import React from 'react'
import './App.css'
import IDE from './components/IDE'
import { Routes, Route, BrowserRouter as Router, Link, Outlet } from 'react-router-dom'
import MarkdownEditor from './components/MarkdownEditor'
import Problems from './pages/Problems'
import ProblemDetail from './pages/Problems/ProblemDetail'
import CreateProblem from './pages/CreateProblem'


const App: React.FC = () => {
    return (
        <div className="row d-flex justify-content-center my-5 pb-5">
            <Router>
                <Routes>
                    <Route path="problems" element={<Outlet/>}>
                        <Route path="" element={<Problems/>}/>
                        <Route path=":id" element={<ProblemDetail/>}/>
                    </Route>
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
                    <Route path="create-problem" element={<CreateProblem />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
