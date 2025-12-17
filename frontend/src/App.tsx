import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from './components/PublicRoute.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

// Public Pages
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Verify from './pages/Verify.tsx';

// Student Pages
import StudentDashboard from './pages/StudentDashboard.tsx';

// Teacher Pages
import TeacherDashboard from './pages/TeacherDashboard.tsx';

export default function App()
{
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Pages */}
                <Route element={<PublicRoute/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/verify" element={<Verify/>}/>
                </Route>

                {/* Student Pages */}
                <Route element={<ProtectedRoute allowedRoles={['STUDENT']}/>}>
                    <Route path="/student/dashboard" element={<StudentDashboard/>}/>
                </Route>

                {/* Teacher Pages */}
                <Route element={<ProtectedRoute allowedRoles={['TEACHER']}/>}>
                    <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
                </Route>

                {/* Admin Pages */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']}/>}>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}