import axios from 'axios';
import type{ LoginForm, RegisterForm } from '../components/types';

export const login = async(formData: LoginForm) =>
{
    try
    {
        const response = await axios.post
        (
            `http://localhost:8080/api/auth/login`,
            formData,
            { withCredentials: true }
        );

        return response.data;
    }
    catch(error: any)
    {
        if(error.response?.data)
        {
            throw new Error(error.response.data);
        }

        throw new Error('Login failed. Please try again.');
    }
};

export const register = async(formData: RegisterForm, role: 'student' | 'teacher') =>
{
    try
    {
        const response = await axios.post
        (
            `http://localhost:8080/api/auth/register/${role}`,
            formData
        );

        return response.data;
    }
    catch(error: any)
    {
        if(error.response?.data)
        {
            throw new Error(error.response.data);
        }

        throw new Error('Registration failed. Please try again.');
    }
};

export const verifyEmail = async(token: string) =>
{
    try
    {
        const response = await axios.get
        (
            `http://localhost:8080/api/auth/verify`, { params:{ token: token } }
        );

        return response.data;
    }
    catch(error: any)
    {
        if (error.response && error.response.data)
        {
            throw new Error(error.response.data);
        }

        throw new Error('Email verification failed. Please try again.');
    }
};

export const logout = async() =>
{
    try
    {
        const response = await axios.post
        (
            `http://localhost:8080/api/auth/logout`,
            {}, { withCredentials: true }
        );

        localStorage.removeItem('authUser');

        return response.data;
    }
    catch(error: any)
    {
        localStorage.removeItem('authUser');

        if (error.response?.data)
        {
            throw new Error(error.response.data);
        }

        throw new Error('Logout failed. Please try again.');
    }
};