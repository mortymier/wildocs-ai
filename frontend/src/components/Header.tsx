import { Link } from 'react-router-dom';
import citu_logo from '../assets/citu_logo.png';
import '../styles/Header.css';

export default function Header()
{
    return (
        <header className="header-container">
            <Link to="/"> <img src={citu_logo} alt="Wildocs AI logo"/> </Link>
            <Link to="/" className="header-text"> 
                <h1> WILDOCS AI &ensp; </h1> 
                <h2> AI-Powered SDD Evaluator </h2> 
            </Link>
            <div className="header-space"></div>
            <div className="header-buttons">
                <Link to="/login"> Login </Link>
                <Link to="/"> Register </Link>
            </div>
        </header>
    );
}