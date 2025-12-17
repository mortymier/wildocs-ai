import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Verify from './pages/Verify.tsx';

export default function App()
{
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Pages */}
                <Route index element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/verify" element={<Verify/>}/>
            </Routes>
        </BrowserRouter>
    );
}