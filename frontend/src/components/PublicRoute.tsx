import { Navigate, Outlet } from 'react-router-dom';

type Role = 'STUDENT' | 'TEACHER' | 'ADMIN';

const getRedirectPath = (role: Role): string =>
{
    switch (role)
    {
        case 'STUDENT':
            return '/student/dashboard';
        case 'TEACHER':
            return '/teacher/dashboard';
        case 'ADMIN':
            return '/admin/dashboard';
        default:
            return '/';
    }
};

export default function PublicRoute()
{
    const storedUser = localStorage.getItem('authUser');

    if(storedUser)
    {
        const authUser = JSON.parse(storedUser) as { role: Role };
        console.log('Cannot access public route. Please log out first');
        return <Navigate to={getRedirectPath(authUser.role)} replace />;
    }

    return <Outlet/>;
}