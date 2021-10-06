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
import CreateProblem from './pages/Admin/CreateProblem'
import PairProgramming from './pages/PairProgramming'
import Blog from './pages/Blog'
import Post from './pages/Blog/Post'
import CreateBlogPost from './pages/Admin/CreateBlogPost'


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
                        <Route path="pair-programming" element={<PairProgramming/>} />
                        <Route path="admin" element={<Admin/>}>
                            <Route path="create-problem" element={<CreateProblem />} />
                            <Route path="create-blog-post" element={<CreateBlogPost/>} />
                        </Route>
                        <Route path="blog" element={<Outlet/>}>
                            <Route path="" element={<Blog/>}/>
                            <Route path=":id" element={<Post/>}/>
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
