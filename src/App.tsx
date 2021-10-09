import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter as Router, Outlet } from 'react-router-dom'
import Problems from './pages/Problems'
import ProblemDetail from './pages/Problems/ProblemDetail'
import Login from './pages/Login'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import Playground from './pages/Playground'
import Admin from './pages/Admin'
import CreateProblem from './pages/Admin/CreateProblem'
import PairProgramming from './pages/PairProgramming'
import Blog from './pages/Blog'
import Post from './pages/Blog/Post'
import CreateBlogPost from './pages/Admin/CreateBlogPost'
import { AuthProvider } from './providers/AuthProvider'
import Logout from './pages/Logout'


const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="vh-100 d-flex flex-column p-0 m-0">
                    <div>
                        <Header />
                    </div>
                        <Routes>
                            <Route path="" element={<LandingPage />} />
                            <Route path="login" element={<Login />} />
                            <Route path="logout" element={<Logout />} />
                            <Route path="problems" element={<Outlet />}>
                                <Route path="" element={<Problems />} />
                                <Route path=":id" element={<ProblemDetail />} />
                            </Route>
                            <Route path="playground" element={<Playground />} />
                            <Route path="pair-programming" element={<PairProgramming />} />
                            <Route path="admin" element={<Admin />}>
                                <Route path="create-problem" element={<CreateProblem />} />
                                <Route path="create-blog-post" element={<CreateBlogPost />} />
                            </Route>
                            <Route path="blog" element={<Outlet />}>
                                <Route path="" element={<Blog />} />
                                <Route path=":id" element={<Post />} />
                            </Route>
                        </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
