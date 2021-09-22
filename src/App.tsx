import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter as Router, Outlet } from 'react-router-dom'
import Problems from './pages/Problems'
import ProblemDetail from './pages/Problems/ProblemDetail'
import Login from './pages/Login'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import Playground from './pages/Playground'
import Admin from './pages/Admin'
import CreateProblem from './pages/CreateProblem'


const App: React.FC = () => {
    return (
        <div className="min-vh-100 d-flex" style={{ flexDirection: 'column' }}>
            <div>
                <Header />
            </div>
            <div>
                <Router>
                    <Routes>
                        <Route path="" element={<LandingPage />} />
                        <Route path="login" element={<Login />} />
                        <Route path="problems" element={<Outlet />}>
                            <Route path="" element={<Problems />} />
                            <Route path=":id" element={<ProblemDetail />} />
                        </Route>
                        <Route path="playground" element={<Playground/>} />
                        <Route path="admin" element={<Admin/>}>
                            <Route path="create-problem" element={<CreateProblem />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default App
