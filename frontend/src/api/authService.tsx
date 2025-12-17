import axios from 'axios';

export type RegisterForm =
{
    firstName: string;
    lastName: string;
    idNum: string;
    email: string;
    password: string;
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