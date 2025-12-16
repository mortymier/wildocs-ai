import { Link } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import hero_image from '../assets/hero_image.webp';
import check_icon from '../assets/check_icon.png';
import team_icon from '../assets/team_icon.png';
import chart_icon from '../assets/chart_icon.png';
import '../styles/Home.css';

export default function Home()
{
    return (
        <>
            <Header/>
            <main className="home-container">
                {/* Hero Section */}
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
                {/* Features Section */}
                <section className="features">
                    <h2> Platform Features </h2>
                    <p> 
                        Discover the comprehensive tools that make SDD evaluation efficient
                        and thorough
                    </p>
                    <div className="feature-card-container">
                        <div className="feature-card">
                            <img src={check_icon} alt="Check Icon"/>
                            <h3> Automated Analysis </h3>
                            <p> 
                                Advanced algorithms analyze your software design documents
                                for completeness, consistency, and best practices compliance.
                            </p>
                        </div>
                        <div className="feature-card">
                            <img src={team_icon} alt="Check Icon"/>
                            <h3> Team Collaboration </h3>
                            <p>
                                Enable seamless collaboration with real-time commenting,
                                version control, and team-based review workflows.
                            </p>
                        </div>
                        <div className="feature-card">
                            <img src={chart_icon} alt="Check Icon"/>
                            <h3> Detailed Evaluation </h3>
                            <p>
                                Generate comprehensive evaluation reports with scoring metrics,
                                improvement suggestions, and compliance tracking.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}