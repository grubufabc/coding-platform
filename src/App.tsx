import React from 'react';
import {
	Routes,
	Route,
	BrowserRouter as Router,
	Outlet,
} from 'react-router-dom';
import Problems from './pages/Problems';
import ProblemDetail from './pages/Problems/ProblemDetail';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';
import CreateProblem from './pages/Admin/CreateProblem';
import Blog from './pages/Blog';
import Post from './pages/Blog/Post';
import CreateBlogPost from './pages/Admin/CreateBlogPost';
import { AuthProvider } from './providers/AuthProvider';
import Logout from './pages/Logout';
import CodeEnvironment from './pages/CodeEnvironment';
import { CodeEnvironmentProvider } from './hooks/useCodeEnvironment';
import Environment from './pages/CodeEnvironment/Environment';
import { ToastProvider } from './hooks/useToast';
import { IDEProvider } from './pages/CodeEnvironment/Environment/IDESection/useIDE';
import Learn from './pages/Learn';
import CreateCourse from './pages/Admin/CreateCourse';
import ManageCourses from './pages/Admin/ManageCourses';
import CourseDetail from './pages/Learn/Course/CourseDetail';
import EditCourse from './pages/Admin/ManageCourses/EditCourse';
import { PairProgramming, PairProgrammingMenu } from './pages/PairProgramming';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<CodeEnvironmentProvider>
				<ToastProvider>
					<Router>
						<Routes>
							<Route path="code-environment" element={<Outlet />}>
								<Route path="" element={<CodeEnvironment />} />
								<Route
									path=":id"
									element={
										<IDEProvider>
											<Environment />
										</IDEProvider>
									}
								/>
							</Route>
						</Routes>

						<Routes>
							<Route path="" element={<LandingPage />} />
							<Route path="login" element={<Login />} />
							<Route path="logout" element={<Logout />} />
							<Route path="problems" element={<Outlet />}>
								<Route path="" element={<Problems />} />
								<Route path=":id" element={<ProblemDetail />} />
							</Route>
							<Route path="pair-programming" element={<Outlet />}>
								<Route path="" element={<PairProgrammingMenu />} />
								<Route path=":id" element={<PairProgramming />} />
							</Route>
							<Route path="admin" element={<Admin />}>
								<Route path="create-problem" element={<CreateProblem />} />
								<Route path="create-blog-post" element={<CreateBlogPost />} />
								<Route path="create-course" element={<CreateCourse />} />
								<Route path="manage-courses" element={<ManageCourses />} />
								<Route path="manage-courses/:id" element={<EditCourse />} />
							</Route>
							<Route path="blog" element={<Outlet />}>
								<Route path="" element={<Blog />} />
								<Route path=":id" element={<Post />} />
							</Route>
							<Route path="learn" element={<Outlet />}>
								<Route path="" element={<Learn />} />
								<Route path=":id" element={<CourseDetail />} />
							</Route>
						</Routes>
					</Router>
				</ToastProvider>
			</CodeEnvironmentProvider>
		</AuthProvider>
	);
};

export default App;
