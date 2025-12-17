import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import user_icon from '../assets/user_icon.png';
import id_icon from '../assets/id_icon.png';
import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';
import '../styles/Register.css';

export default function Register()
{
    return (
        <>
            <main className="register-container">
                <h1> Create Account </h1>
                <p> Sign up to WILDOCS AI to get started </p>
                <form>
                    <Link to="/">
                        <h2> WILDOCS AI </h2>
                        <h3> AI-Powered SDD Evaluator </h3>
                    </Link>
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
                        placeholder="Enter your password"
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
                        placeholder="Confirm your password"
                        required
                    />
                    {/* Terms & Conditions */}
                    <div className="terms-conditions"> 
                        <input type="checkbox"/> 
                        <span> I agree to the Terms & Conditions </span>
                    </div>
                    {/* Form Buttons */}
                    <div className="register-buttons"> 
                        <button type="button"> Reset </button>
                        <button type="submit"> Create Account </button>
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