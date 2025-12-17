import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import '../styles/Verify.css';

export default function Verify()
{
    return (
        <>
            <Header/>
            <main className="verify-container">
                <h1> Verify Your Email </h1>
                <p> 
                    We sent a verification token to your email <br/>
                    Please paste it here
                </p>
                <form>
                    <label htmlFor="token"> Verification Code </label>
                    <input
                        id="token"
                        name="token"
                        type="text"
                        placeholder="Enter received token here"
                        required
                    />
                    <button type="submit"> Verify Email </button>
                    <div> <span> Didn't receive token? </span> <span> Resend Email </span> </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}