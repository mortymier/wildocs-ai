import type { JSX } from 'react';

export type LoginForm =
{
    email: string;
    password: string;
}

export type RegisterForm =
{
    firstName: string;
    lastName: string;
    idNum: string;
    email: string;
    password: string;
};

export type AuthenticatedUser = 
{
    firstName: string;
    lastName: string;
    email: string;
    idNum: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
};

export type ProtectedRouteProps =
{
    allowedRoles: Array<'ADMIN' | 'TEACHER' | 'STUDENT'>;
};

