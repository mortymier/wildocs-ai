import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authService.tsx';
import Footer from '../components/Footer.tsx';
import user_icon from '../assets/user_icon.png';
import id_icon from '../assets/id_icon.png';
import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';
import '../styles/Register.css';

export default function Register()
{
    type RegisterForm = 
    {
        firstName: string;
        lastName: string;
        idNum: string;
        email: string;
        password: string;
    };

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [confirmpw, setConfirmpw] = useState<string>('');
    const [formData, setFormData] = useState<RegisterForm>
    ({
        firstName: '',
        lastName: '',
        idNum: '',
        email: '',
        password: '',
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
        
        if(formData.password !== confirmpw)
        {
            setError('Passwords do not match');
            return;
        }

        try
        {
            setLoading(true);

            const result = await register(formData, role);

            setSuccess(result.message);

            setTimeout(() =>
            {
                navigate('/verify');

            }, 4000);
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
            <main className="register-container">
                <h1> Create Account </h1>
                <p> Sign up to WILDOCS AI to get started </p>
                <form onSubmit={handleSubmit}>
                    <Link to="/">
                        <h2> WILDOCS AI </h2>
                        <h3> AI-Powered SDD Evaluator </h3>
                    </Link>
                    {/* Role */}
                    <div className="icon-label">
                        <img src={user_icon} alt="User icon"/> 
                         <label htmlFor="role"> Role </label> 
                    </div>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'student' | 'teacher')}
                        required
                    >
                        <option value=""> </option>
                        <option value="student"> STUDENT </option>
                        <option value="teacher"> TEACHER </option>
                    </select>
                    {/* First Name */}
                    <div className="icon-label"> 
                        <img src={user_icon} alt="User icon"/> 
                        <label htmlFor="firstName"> First Name </label> 
                    </div>
                    <input 
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {/* Last Name */}
                    <div className="icon-label"> 
                        <img src={user_icon} alt="User icon"/> 
                        <label htmlFor="lastName"> Last Name </label> 
                    </div>
                    <input 
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {/* ID Number */}
                    <div className="icon-label"> 
                        <img src={id_icon} alt="IDc:\Users\sanie\Downloads\id_icon.png icon"/> 
                        <label htmlFor="idNum"> ID Number </label> 
                    </div>
                    <input 
                        id="idNum"
                        name="idNum"
                        type="text"
                        placeholder="Enter your ID number"
                        value={formData.idNum}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <hr/>
                    {/* Email */}
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
                        onBlur={handleBlur}
                        required
                    />
                    {/* Password */}
                    <div className="icon-label"> 
                        <img src={password_icon} alt="Password icon"/> 
                        <label htmlFor="password"> Password </label> 
                    </div>
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password (at least 6 characters)"
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {/* Confirm Password */}
                    <div className="icon-label"> 
                        <img src={password_icon} alt="Password icon"/> 
                        <label htmlFor="confirmpw"> Confirm Password </label> 
                    </div>
                    <input 
                        id="confirmpw"
                        name="confirmpw"
                        type="password"
                        placeholder="Confirm your password (at least 6 characters)"
                        minLength={6}
                        value={confirmpw}
                        onChange={(e) => setConfirmpw(e.target.value)}
                        onBlur={(e) => setConfirmpw(e.target.value.trimEnd())}
                        required
                    />
                    {/* Terms & Conditions */}
                    <div className="terms-conditions"> 
                        <input type="checkbox"/> 
                        <span> I agree to the Terms & Conditions </span>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    {/* Form Buttons */}
                    <div className="register-buttons"> 
                        <button type="button" disabled={loading}> Reset </button>
                        <button type="submit" disabled={loading}> 
                            {loading ? 'Registering...' : 'Create Account'}
                        </button>
                    </div>
                    {/* Sign In */}
                    <div className="account-actions2"> 
                        <span> Already have an account? </span>
                        <Link to="/login"> Sign in here </Link>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}