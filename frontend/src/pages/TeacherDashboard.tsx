import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authService';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer.tsx';
import '../styles/TeacherDashboard.css';

function IconHome() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M12 3 3 10v11h6v-7h6v7h6V10l-9-7zm7 16h-2v-7H7v7H5v-8l7-5 7 5v8z"/>
        </svg>
    );
}

function IconBook() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M18 2H8a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h10v-2H8a1 1 0 0 0-1 1V5a1 1 0 0 1 1-1h10v16H8a3 3 0 0 0-3 3h15V4a2 2 0 0 0-2-2z"/>
        </svg>
    );
}

function IconArchive() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M20.5 6h-17A1.5 1.5 0 0 1 2 4.5V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.5A1.5 1.5 0 0 1 20.5 6zM4 8h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm5 4v2h6v-2H9z"/>
        </svg>
    );
}

function IconAssignment() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm-7 11H7v-2h5v2zm3-4H7V8h8v2z"/>
        </svg>
    );
}

function IconSettings() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.03 7.03 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.24-1.12.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 7.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.3.6.22l2.39-.96c.5.39 1.05.7 1.63.94l.36 2.54c.05.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.58-.24 1.12-.55 1.63-.94l2.39.96c.22.08.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z"/>
        </svg>
    );
}

function IconUser() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2-8 4.5V21h16v-2.5C20 16 16.42 14 12 14z"/>
        </svg>
    );
}

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);
    const [activeNav, setActiveNav] = useState<'home' | 'teaching' | 'assignments' | 'archived'>('home');
    const [storedUser, setStoredUser] = useState<any>(() => {
        const raw = localStorage.getItem('authUser');
        if (!raw) return null;
        try { return JSON.parse(raw); } catch { return null; }
    });

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'authUser') setStoredUser(JSON.parse(e.newValue || 'null'));
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setStoredUser(null);
            navigate('/login', { replace: true });
        } catch (error: any) {
            console.error(error.message);
            alert(error.message);
        }
    };

    const renderMain = () => {
        switch (activeNav) {
            case 'teaching':
                return (
                    <div className="teacher-dashboard-section">
                        <h2 className="teacher-dashboard-section-title">Teaching Classes</h2>
                        <div className="teacher-dashboard-empty">
                            <h3>No classes being taught</h3>
                            <p>Your teaching classes will appear here.</p>
                        </div>
                    </div>
                );
            case 'assignments':
                return (
                    <div className="teacher-dashboard-section">
                        <h2 className="teacher-dashboard-section-title">Assignments</h2>
                        <div className="teacher-dashboard-empty">
                            <h3>No assignments yet</h3>
                            <p>Create or review assignments for your classes here.</p>
                        </div>
                    </div>
                );
            case 'archived':
                return (
                    <div className="teacher-dashboard-section">
                        <h2 className="teacher-dashboard-section-title">Archived Classes</h2>
                        <div className="teacher-dashboard-empty">
                            <h3>No archived classes</h3>
                            <p>Archived classes will appear here.</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="teacher-dashboard-section">
                        <div className="teacher-dashboard-tabs-row">
                            <div className="teacher-dashboard-tabs">
                                <button className="teacher-dashboard-tab active">Overview</button>
                            </div>
                        </div>
                        <div className="teacher-dashboard-section">
                            <div className="teacher-dashboard-empty">
                                <h3>Welcome, {(storedUser?.firstName || 'TEACHER').toUpperCase()}!</h3>
                                <p>Select a section from the sidebar to manage your classes and assignments.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="teacher-dashboard-page">
            <div className="teacher-dashboard-shell">
                <div className="teacher-dashboard-topbar">
                    <div className="teacher-dashboard-brand">
                        <div className="teacher-dashboard-logo" aria-label="Wildocs AI">
                            <span className="teacher-dashboard-logo-mark">W</span>
                            <span className="teacher-dashboard-logo-wordmark">WILDOCS AI</span>
                        </div>
                    </div>
                    <div className="teacher-dashboard-welcome">
                        WELCOME, {(storedUser?.firstName || 'TEACHER').toUpperCase()}
                    </div>
                    <div className="teacher-dashboard-actions">
                        <button className="teacher-dashboard-icon-btn" type="button" aria-label="settings">
                            <IconSettings/>
                        </button>
                        <div className="teacher-dashboard-profile">
                            <button
                                className="teacher-dashboard-icon-btn"
                                type="button"
                                aria-label="profile"
                                onClick={() => setProfileOpen(v => !v)}
                            >
                                <IconUser/>
                            </button>
                            {profileOpen && (
                                <div className="teacher-dashboard-profile-menu">
                                    <div className="teacher-dashboard-profile-meta">
                                        <p className="teacher-dashboard-profile-name">{storedUser?.firstName} {storedUser?.lastName}</p>
                                        <p className="teacher-dashboard-profile-email">{storedUser?.email}</p>
                                    </div>
                                    <button className="teacher-dashboard-profile-logout" onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="teacher-dashboard-content">
                    <aside className="teacher-dashboard-sidebar">
                        <nav className="teacher-dashboard-nav">
                            <button className={activeNav === 'home' ? 'active' : ''} onClick={() => setActiveNav('home')}>
                                <span className="teacher-dashboard-nav-icon"><IconHome/></span>
                                Home
                            </button>
                            <button className={activeNav === 'teaching' ? 'active' : ''} onClick={() => setActiveNav('teaching')}>
                                <span className="teacher-dashboard-nav-icon"><IconBook/></span>
                                Teaching
                            </button>
                            <button className={activeNav === 'assignments' ? 'active' : ''} onClick={() => setActiveNav('assignments')}>
                                <span className="teacher-dashboard-nav-icon"><IconAssignment/></span>
                                Assignments
                            </button>
                            <button className={activeNav === 'archived' ? 'active' : ''} onClick={() => setActiveNav('archived')}>
                                <span className="teacher-dashboard-nav-icon"><IconArchive/></span>
                                Archived Classes
                            </button>
                        </nav>
                    </aside>
                    <main className="teacher-dashboard-main">
                        {renderMain()}
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
