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