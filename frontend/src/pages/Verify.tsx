import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/authService.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import '../styles/Verify.css';

export default function Verify()
{
    const [token, setToken] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try
        {
            await verifyEmail(token);

            setSuccess('Emailed verified successfully. Redirecting to login...');
            setTimeout(() =>
            {
                navigate('/login');
            }, 3000);
        }
        catch(error: any)
        {
            setError(error.message);
        }
    };

    return (
        <>
            <Header/>
            <main className="verify-container">
                <h1> Verify Your Email </h1>
                <p> 
                    We sent a verification token to your email <br/>
                    Please paste it here
                </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="token"> Verification Token </label>
                    <input
                        id="token"
                        name="token"
                        type="text"
                        placeholder="Enter received token here"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        onBlur={(e) => setToken(e.target.value.trimEnd())}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button type="submit"> Verify Email </button>
                    <div> <span> Didn't receive token? </span> <span> Resend Email </span> </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}