import axios from 'axios';
import type{ CreateClassForm } from '../components/types';

export const createClass = async(formData: CreateClassForm, email: string) =>
{
    try
    {
        const response = await axios.post
        (
            `http://localhost:8080/api/class/create`,
            formData,
            {
                params: { email },
                withCredentials: true 
            }
        );

        return response.data;
    }
    catch(error: any)
    {
        if (error.response?.data)
        {
            throw new Error(error.response.data);
        }

        throw new Error('Failed to create class. Please try again.');
    }
}