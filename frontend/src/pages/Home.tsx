import { Link } from 'react-router-dom';
import Header from '../components/Header.tsx';
import hero_image from '../assets/hero_image.webp';
import '../styles/Home.css';

export default function Home()
{
    return (
        <>
            <Header/>
            <main className="home-container">
                <section className="hero">
                    <div>
                        <h1> WILDOCS AI </h1>
                        <h2> AI-Powered SDD Document Evaluator System </h2>
                        <hr/>
                        <p> 
                            Streamline your software design document evaluation process
                            with our comprehensive analysis tools. Get detailed insights,
                            automated scoring, and collaborative review features all in
                            one platform.
                        </p>
                        <Link to="/"> Get Started </Link>
                    </div>
                    <div>
                        <img src={hero_image} alt="Hero section image about AI"/>
                    </div>
                </section>
            </main>
        </>
    );
}