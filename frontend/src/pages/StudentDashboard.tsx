import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authService';

export default function StudentDashboard()
{
    const navigate = useNavigate();

    const handleLogout = async() =>
    {
        try
        {
            await logout();
            navigate('/login', { replace: true });
        }
        catch(error: any)
        {
            console.error(error.message);
            alert(error.message);
        }
    };

    return (
        <>
            <h1> Welcome, Student! </h1>
            <button onClick={handleLogout}> Logout </button>
        </>
    );
}