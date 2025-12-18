import { useState } from 'react';
import type { CreateClassForm } from '../components/types';
import { createClass } from '../api/classService';
import Footer from '../components/Footer';
import '../styles/CreateClass.css';

export default function CreateClass()
{
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateClassForm>
    ({
        classCode: '',
        className: '',
        schoolYear: '',
        semester: '',
        section: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value.trimEnd()}));
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try
        {
            const storedUser = localStorage.getItem('authUser');

            if (!storedUser)
            {
                throw new Error('User is not authenticated');
            }

            const authUser = JSON.parse(storedUser);

            if (!authUser.email)
            {
                throw new Error('User email not found');
            }

            const result = await createClass(formData, authUser.email);

            setSuccess('Class created successfully');
            console.log('Created class:', result);
        }
        catch (error: any)
        {
            setError(error.message || 'Failed to create class');
        }
        finally
        {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="createclass-container">
                <h1> Create Class </h1>
                <p> Create a new class to start receiving SDD submissions </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="classCode"> Class Code </label> 
                    <input 
                        id="classCode"
                        name="classCode"
                        type="text"
                        placeholder="Enter class code"
                        value={formData.classCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <label htmlFor="className"> Class Name </label> 
                    <input 
                        id="className"
                        name="className"
                        type="text"
                        placeholder="Enter class name"
                        value={formData.className}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <label htmlFor="schoolYear"> School Year </label> 
                    <input
                        id="schoolYear"
                        name="schoolYear"
                        type="text"
                        placeholder="Enter school year"
                        value={formData.schoolYear}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <label htmlFor="semeter"> Semester </label> 
                    <input
                        id="semester"
                        name="semester"
                        type="text"
                        placeholder="Enter semester"
                        value={formData.semester}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <label htmlFor="section"> Section </label> 
                    <input 
                        id="section"
                        name="section"
                        type="text"
                        placeholder="Enter section"
                        value={formData.section}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <div className="createclass-buttons">
                        <button type="button" disabled={loading}> Reset </button>
                        <button type="submit" disabled={loading}> 
                            {loading ? 'Creating...' : 'Create Class'}
                        </button>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}