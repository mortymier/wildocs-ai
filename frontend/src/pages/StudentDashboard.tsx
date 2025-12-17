import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authService';
import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer.tsx';
import '../styles/StudentDashboard.css';

type EnrolledClass = {
    id: string;
    code: string;
    archived: boolean;
    createdAt: string;
};

function IconHome()
{
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M12 3 3 10v11h6v-7h6v7h6V10l-9-7zm7 16h-2v-7H7v7H5v-8l7-5 7 5v8z"/>
        </svg>
    );
}

function IconBook()
{
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M18 2H8a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h10v-2H8a1 1 0 0 0-1 1V5a1 1 0 0 1 1-1h10v16H8a3 3 0 0 0-3 3h15V4a2 2 0 0 0-2-2z"/>
        </svg>
    );
}

function IconArchive()
{
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M20.5 6h-17A1.5 1.5 0 0 1 2 4.5V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.5A1.5 1.5 0 0 1 20.5 6zM4 8h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm5 4v2h6v-2H9z"/>
        </svg>
    );
}

function IconKey()
{
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M7 14a5 5 0 1 1 4.9-6H22v4h-2v2h-2v2h-4.1A5 5 0 0 1 7 14zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
    );
}

function IconSettings()
{
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.03 7.03 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.24-1.12.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 7.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.3.6.22l2.39-.96c.5.39 1.05.7 1.63.94l.36 2.54c.05.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.58-.24 1.12-.55 1.63-.94l2.39.96c.22.08.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z"/>
        </svg>
    );
}

function IconUser()
{
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2-8 4.5V21h16v-2.5C20 16 16.42 14 12 14z"/>
        </svg>
    );
}

export default function StudentDashboard() {
    const navigate = useNavigate();

    const readStoredUser = () =>
    {
        const raw = localStorage.getItem('authUser');
        if(!raw) return null;
        try
        {
            return JSON.parse(raw);
        }
        catch
        {
            return null;
        }
    };

    const [storedUser, setStoredUser] = useState<any>(() => readStoredUser());

    useEffect(() =>
    {
        const onStorage = (e: StorageEvent) =>
        {
            if(e.key === 'authUser')
            {
                setStoredUser(readStoredUser());
            }
        };

        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const [activeNav, setActiveNav] = useState<'home' | 'enrolled' | 'archived' | 'classCode'>('home');
    const [activeTab, setActiveTab] = useState<'general' | 'results'>('general');

    const [classes, setClasses] = useState<EnrolledClass[]>(() => {
        const raw = localStorage.getItem('studentClasses');
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            if(!Array.isArray(parsed)) return [];

            return parsed
                .map((item: any) =>
                {
                    const code = typeof item?.code === 'string' ? item.code.trim() : '';
                    if(!code) return null;

                    return {
                        id: typeof item?.id === 'string' && item.id ? item.id : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                        code: code.toUpperCase(),
                        archived: Boolean(item?.archived),
                        createdAt: typeof item?.createdAt === 'string' && item.createdAt ? item.createdAt : new Date().toISOString(),
                    } as EnrolledClass;
                })
                .filter(Boolean) as EnrolledClass[];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('studentClasses', JSON.stringify(classes));
    }, [classes]);

    const enrolledClasses = useMemo(() => classes.filter(c => !c.archived), [classes]);
    const archivedClasses = useMemo(() => classes.filter(c => c.archived), [classes]);

    const [joinCode, setJoinCode] = useState('');

    const addClass = () => {
        const code = joinCode.trim();
        if (!code) {
            alert('Please enter a class code.');
            return;
        }

        const normalizedCode = code.toUpperCase();
        const exists = classes.some(c => c.code.toUpperCase() === normalizedCode);
        if (exists) {
            alert('You are already enrolled in this class code.');
            return;
        }

        const newClass: EnrolledClass = {
            id: (globalThis.crypto && 'randomUUID' in globalThis.crypto)
                ? globalThis.crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            code: normalizedCode,
            archived: false,
            createdAt: new Date().toISOString(),
        };

        setClasses(prev => [newClass, ...prev]);
        setJoinCode('');
        setActiveNav('enrolled');
    };

    const archiveClass = (id: string) => {
        setClasses(prev => prev.map(c => (c.id === id ? { ...c, archived: true } : c)));
    };

    const restoreClass = (id: string) => {
        setClasses(prev => prev.map(c => (c.id === id ? { ...c, archived: false } : c)));
    };

    const deleteClass = (id: string) => {
        setClasses(prev => prev.filter(c => c.id !== id));
    };

    const [profileOpen, setProfileOpen] = useState(false);

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

    const renderClassCards = (list: EnrolledClass[], mode: 'enrolled' | 'archived') => {
        if (list.length === 0) {
            return (
                <div className="student-dashboard-empty">
                    <h3>{mode === 'enrolled' ? 'No enrolled classes' : 'No archived classes'}</h3>
                    <p>{mode === 'enrolled' ? 'Join a class using a class code.' : 'Archived classes will appear here.'}</p>
                </div>
            );
        }

        return (
            <div className="student-dashboard-cards">
                {list.map(cls => (
                    <div className="student-dashboard-card" key={cls.id}>
                        <div className="student-dashboard-card-top">
                            <h3 className="student-dashboard-card-title">{cls.code}</h3>
                        </div>
                        <div className="student-dashboard-card-body">
                            <div className="student-dashboard-card-actions">
                                {mode === 'enrolled' ? (
                                    <button type="button" onClick={() => archiveClass(cls.id)}>Archive</button>
                                ) : (
                                    <button type="button" onClick={() => restoreClass(cls.id)}>Restore</button>
                                )}
                                <button type="button" className="danger" onClick={() => deleteClass(cls.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderHome = () => {
        return (
            <>
                <div className="student-dashboard-tabs-row">
                    <div className="student-dashboard-tabs">
                        <button
                            type="button"
                            className={`student-dashboard-tab ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button
                            type="button"
                            className={`student-dashboard-tab ${activeTab === 'results' ? 'active' : ''}`}
                            onClick={() => setActiveTab('results')}
                        >
                            Results
                        </button>
                    </div>
                </div>

                {activeTab === 'general' ? (
                    <div className="student-dashboard-section">
                        {renderClassCards(enrolledClasses, 'enrolled')}
                    </div>
                ) : (
                    <div className="student-dashboard-section">
                        <div className="student-dashboard-empty">
                            <h3>No results yet</h3>
                            <p>Your evaluation results will appear here once available.</p>
                        </div>
                    </div>
                )}
            </>
        );
    };

    const renderMain = () => {
        if (activeNav === 'classCode') {
            return (
                <div className="student-dashboard-section">
                    <h2 className="student-dashboard-section-title">Join a Class</h2>
                    <div className="student-dashboard-form">
                        <div className="student-dashboard-form-row single">
                            <label>
                                Class Code
                                <input value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="e.g. ABC123" />
                            </label>
                        </div>
                        <div className="student-dashboard-form-actions">
                            <button type="button" onClick={addClass}>Join</button>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeNav === 'archived') {
            return (
                <div className="student-dashboard-section">
                    <h2 className="student-dashboard-section-title">Archived Classes</h2>
                    {renderClassCards(archivedClasses, 'archived')}
                </div>
            );
        }

        if (activeNav === 'enrolled') {
            return (
                <div className="student-dashboard-section">
                    <h2 className="student-dashboard-section-title">Enrolled Classes</h2>
                    {renderClassCards(enrolledClasses, 'enrolled')}
                </div>
            );
        }

        return renderHome();
    };

    return (
        <div className="student-dashboard-page">
            <div className="student-dashboard-shell">
                <div className="student-dashboard-topbar">
                    <div className="student-dashboard-brand">
                        <div className="student-dashboard-logo" aria-label="Wildocs AI">
                            <span className="student-dashboard-logo-mark">W</span>
                            <span className="student-dashboard-logo-wordmark">WILDOCS AI</span>
                        </div>
                    </div>

                    <div className="student-dashboard-welcome">
                        WELCOME, {(storedUser?.firstName || 'STUDENT').toUpperCase()}
                    </div>

                    <div className="student-dashboard-actions">
                        <button className="student-dashboard-icon-btn" type="button" aria-label="settings">
                            <IconSettings/>
                        </button>

                        <div className="student-dashboard-profile">
                            <button
                                className="student-dashboard-icon-btn"
                                type="button"
                                aria-label="profile"
                                onClick={() => setProfileOpen(v => !v)}
                            >
                                <IconUser/>
                            </button>
                            {profileOpen ? (
                                <div className="student-dashboard-profile-menu">
                                    <div className="student-dashboard-profile-meta">
                                        <p className="student-dashboard-profile-name">{storedUser?.firstName} {storedUser?.lastName}</p>
                                        <p className="student-dashboard-profile-email">{storedUser?.email}</p>
                                    </div>
                                    <button type="button" className="student-dashboard-profile-logout" onClick={handleLogout}>Logout</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="student-dashboard-content">
                    <aside className="student-dashboard-sidebar">
                        <nav className="student-dashboard-nav">
                            <button
                                type="button"
                                className={activeNav === 'home' ? 'active' : ''}
                                onClick={() => setActiveNav('home')}
                            >
                                <span className="student-dashboard-nav-icon"><IconHome/></span>
                                Home
                            </button>
                            <button
                                type="button"
                                className={activeNav === 'enrolled' ? 'active' : ''}
                                onClick={() => setActiveNav('enrolled')}
                            >
                                <span className="student-dashboard-nav-icon"><IconBook/></span>
                                Enrolled
                            </button>
                            <button
                                type="button"
                                className={activeNav === 'archived' ? 'active' : ''}
                                onClick={() => setActiveNav('archived')}
                            >
                                <span className="student-dashboard-nav-icon"><IconArchive/></span>
                                Archived classes
                            </button>
                            <button
                                type="button"
                                className={activeNav === 'classCode' ? 'active' : ''}
                                onClick={() => setActiveNav('classCode')}
                            >
                                <span className="student-dashboard-nav-icon"><IconKey/></span>
                                Class Code
                            </button>
                        </nav>
                    </aside>

                    <main className="student-dashboard-main">
                        {renderMain()}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}