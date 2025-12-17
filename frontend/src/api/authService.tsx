import axios from 'axios';

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

export type RegisterForm =
{
    firstName: string;
    lastName: string;
    idNum: string;
    email: string;
    password: string;
};

export const registerStudent = async(formData: RegisterForm) =>
{
    try
    {
        const response = await axios.post
        (
            `http://localhost:8080/api/auth/register/student`,
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