import { use, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContexts';
import { NavLink } from 'react-router';
import { FaFilm, FaHeart, FaBookmark, FaUserCircle, FaClock, FaCalendarAlt, FaEnvelope, FaStar } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = use(AuthContext);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [watchlistCount, setWatchlistCount] = useState(0);
    const [collectionCount, setCollectionCount] = useState(0);

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch user stats
    useEffect(() => {
        if (!user?.email) return;
        fetch(`https://movie-world-server-navy.vercel.app/watchlist?email=${user.email}`)
            .then(res => res.json())
            .then(data => setWatchlistCount(Array.isArray(data) ? data.length : 0))
            .catch(() => {});

        fetch(`https://movie-world-server-navy.vercel.app/myMovies?email=${user.email}`)
            .then(res => res.json())
            .then(data => setCollectionCount(Array.isArray(data) ? data.length : 0))
            .catch(() => {});
    }, [user]);

    const greeting = () => {
        const h = currentTime.getHours();
        if (h < 12) return 'Good Morning';
        if (h < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatTime = (date) =>
        date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const formatDate = (date) =>
        date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const joinedDate = user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';

    const lastLogin = user?.metadata?.lastSignInTime
        ? new Date(user.metadata.lastSignInTime).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'N/A';

    const quickLinks = [
        { to: '/dashboard/add', icon: <FaFilm className="text-3xl" />, label: 'Add Movie', color: 'bg-primary/10 text-primary border-primary/30' },
        { to: '/dashboard/MyColection', icon: <FaHeart className="text-3xl" />, label: 'My Collection', color: 'bg-secondary/10 text-secondary border-secondary/30' },
        { to: '/dashboard/Watchlist', icon: <FaBookmark className="text-3xl" />, label: 'Watchlist', color: 'bg-accent/10 text-accent border-accent/30' },
        { to: '/dashboard/profile', icon: <FaUserCircle className="text-3xl" />, label: 'Profile', color: 'bg-info/10 text-info border-info/30' },
    ];

    return (
        <div className="min-h-screen bg-base-100 p-6">

            {/* ── Greeting Banner ── */}
            <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/60 text-primary-content p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="avatar" className="w-20 h-20 rounded-full ring-4 ring-primary-content/40 object-cover" />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-primary-content/20 flex items-center justify-center">
                            <FaUserCircle className="text-5xl text-primary-content/70" />
                        </div>
                    )}
                    <div>
                        <p className="text-primary-content/70 text-sm font-medium uppercase tracking-widest">{greeting()}</p>
                        <h1 className="text-3xl font-extrabold mt-1">{user?.displayName || 'Movie Fan'} 👋</h1>
                        <p className="text-primary-content/70 text-sm mt-1 flex items-center gap-2">
                            <FaEnvelope /> {user?.email}
                        </p>
                    </div>
                </div>
                {/* Live Clock */}
                <div className="text-center bg-primary-content/10 rounded-xl px-8 py-4 backdrop-blur-sm">
                    <p className="text-4xl font-mono font-bold tracking-wider">{formatTime(currentTime)}</p>
                    <p className="text-primary-content/70 text-sm mt-1 flex items-center justify-center gap-2">
                        <FaCalendarAlt /> {formatDate(currentTime)}
                    </p>
                </div>
            </div>

            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-base-200 rounded-2xl p-5 shadow border border-base-300 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm font-medium">Watchlist</span>
                        <FaBookmark className="text-primary text-xl" />
                    </div>
                    <p className="text-4xl font-extrabold text-primary">{watchlistCount}</p>
                    <p className="text-xs text-gray-500">Movies saved to watch</p>
                </div>

                <div className="bg-base-200 rounded-2xl p-5 shadow border border-base-300 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm font-medium">Collection</span>
                        <FaHeart className="text-secondary text-xl" />
                    </div>
                    <p className="text-4xl font-extrabold text-secondary">{collectionCount}</p>
                    <p className="text-xs text-gray-500">Movies in your collection</p>
                </div>

                <div className="bg-base-200 rounded-2xl p-5 shadow border border-base-300 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm font-medium">Member Since</span>
                        <FaCalendarAlt className="text-accent text-xl" />
                    </div>
                    <p className="text-lg font-bold text-accent">{joinedDate}</p>
                    <p className="text-xs text-gray-500">Account created</p>
                </div>

                <div className="bg-base-200 rounded-2xl p-5 shadow border border-base-300 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm font-medium">Last Login</span>
                        <FaClock className="text-info text-xl" />
                    </div>
                    <p className="text-sm font-bold text-info">{lastLogin}</p>
                    <p className="text-xs text-gray-500">Most recent session</p>
                </div>
            </div>

            {/* ── Quick Links ── */}
            <h2 className="text-xl font-bold mb-4 text-base-content">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {quickLinks.map(({ to, icon, label, color }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 ${color} hover:scale-105 transition-transform duration-200 shadow`}
                    >
                        {icon}
                        <span className="font-semibold text-sm">{label}</span>
                    </NavLink>
                ))}
            </div>

            {/* ── User Info Card ── */}
            <h2 className="text-xl font-bold mb-4 text-base-content">Account Details</h2>
            <div className="bg-base-200 rounded-2xl p-6 shadow border border-base-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Display Name', value: user?.displayName || 'Not set', icon: <FaUserCircle className="text-primary" /> },
                        { label: 'Email Address', value: user?.email, icon: <FaEnvelope className="text-secondary" /> },
                        { label: 'Account Created', value: joinedDate, icon: <FaCalendarAlt className="text-accent" /> },
                        { label: 'Last Sign In', value: lastLogin, icon: <FaClock className="text-info" /> },
                        { label: 'Email Verified', value: user?.emailVerified ? '✅ Verified' : '❌ Not Verified', icon: <FaStar className="text-warning" /> },
                        { label: 'Auth Provider', value: user?.providerData?.[0]?.providerId === 'google.com' ? '🔵 Google' : '📧 Email/Password', icon: <FaUserCircle className="text-primary" /> },
                    ].map(({ label, value, icon }) => (
                        <div key={label} className="flex items-center gap-4 bg-base-100 rounded-xl p-4 border border-base-300">
                            <div className="text-xl">{icon}</div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                                <p className="font-semibold text-sm mt-0.5">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
