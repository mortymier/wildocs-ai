import { Navigate, Outlet } from 'react-router-dom';
import type { ProtectedRouteProps } from './types';

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps)
{
    const storedUser = localStorage.getItem('authUser');

    if(!storedUser)
    {
        console.log('Cannot access page. Please sign in.');
        return <Navigate to="/login" replace/>;
    }

    const user = JSON.parse(storedUser);

    if(!allowedRoles.includes(user.role))
    {
        console.log('You do not have permission to access this page.');
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
}
