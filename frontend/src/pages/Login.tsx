import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type{ LoginForm } from '../components/types.tsx';
import { login } from '../api/authService.tsx';
import Footer from '../components/Footer.tsx';
import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';
import '../styles/Login.css';

export default function Login()
{
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<LoginForm>
    ({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>
    {
         e.preventDefault();
         setError('');
         setLoading(true);

         try
         {
            const result = await login(formData);

            localStorage.setItem('authUser', JSON.stringify(result));

            switch(result.role)
            {
                case 'STUDENT':
                    navigate('/student/dashboard', { replace: true });
                    break;

                case 'TEACHER':
                    navigate('/teacher/dashboard', { replace: true });
                    break;

                case 'ADMIN':
                    // Add redirect to admin dashboard here
                    break;

                default:
                    setError('Invalid user role.');
                    localStorage.removeItem('authUser');
            }
         }
         catch(error: any)
         {
            setError(error.message);
         }
         finally
         {
            setLoading(false);
         }
    };

    return (
        <>
            <main className="login-container">
                <h1> Welcome Wildcat </h1>
                <p> Sign in to your account to continue </p>
                <form onSubmit={handleSubmit}>
                    <Link to="/">
                        <h2> WILDOCS AI </h2>
                        <h3> AI-Powered SDD Evaluator </h3>
                    </Link>
                    <div className="icon-label"> 
                        <img src={email_icon} alt="Email icon"/> 
                        <label htmlFor="email"> Email </label> 
                    </div>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.name@school.edu"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="icon-label"> 
                        <img src={password_icon} alt="Password icon"/> 
                        <label htmlFor="password"> Password </label> 
                    </div>
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="account-actions">
                        <input type="checkbox"/> <span> Remember me </span>
                        <Link to="/"> Forgot password? </Link>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="account-actions2"> 
                        <span> Don't have an account? </span>
                        <Link to="/register"> Sign up here </Link>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}