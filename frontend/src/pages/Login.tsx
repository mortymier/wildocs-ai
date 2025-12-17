import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import email_icon from '../assets/email_icon.png';
import password_icon from '../assets/password_icon.png';
import '../styles/Login.css';

export default function Login()
{
    return (
        <>
            <main className="login-container">
                <h1> Welcome Wildcat </h1>
                <p> Sign in to your account to continue </p>
                <form>
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
                        required
                    />
                    <div className="account-actions">
                        <input type="checkbox"/> <span> Remember me </span>
                        <Link to="/"> Forgot password? </Link>
                    </div>
                    <button type="submit"> Login </button>
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