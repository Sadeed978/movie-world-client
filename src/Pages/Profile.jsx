import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContexts";
import {
  FaEnvelope, FaCalendarAlt, FaClock, FaUserCircle,
  FaStar, FaShieldAlt, FaBookmark, FaHeart, FaEdit
} from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);

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

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "N/A";

  const lastLogin = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "N/A";

  const provider = user?.providerData?.[0]?.providerId === "google.com" ? "Google" : "Email / Password";

  return (
    <div className="min-h-screen bg-base-100 p-6">

      {/* ── Cover ── */}
      <div className="rounded-3xl overflow-hidden shadow-xl h-44 bg-gradient-to-r from-primary via-secondary to-accent mb-0" />

      {/* ── Avatar (outside overflow-hidden, overlaps cover) ── */}
      <div className="flex justify-center -mt-12 mb-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-24 h-24 rounded-full ring-4 ring-base-100 object-cover shadow-xl"
          />
        ) : (
          <div className="w-24 h-24 rounded-full ring-4 ring-base-100 bg-base-300 flex items-center justify-center shadow-xl">
            <FaUserCircle className="text-5xl text-base-content/40" />
          </div>
        )}
      </div>

      {/* ── Name & Email ── */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold">{user?.displayName || "Movie Fan"}</h1>
        <p className="text-gray-500 flex items-center justify-center gap-2 mt-1">
          <FaEnvelope className="text-primary" /> {user?.email}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={`badge ${user?.emailVerified ? "badge-success" : "badge-error"} gap-1`}>
            <FaShieldAlt />
            {user?.emailVerified ? "Verified" : "Not Verified"}
          </span>
          <span className="badge badge-outline gap-1">
            {provider === "Google" ? "🔵" : "📧"} {provider}
          </span>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
        <div className="bg-base-200 rounded-2xl p-4 text-center border border-base-300 shadow">
          <FaBookmark className="text-primary text-2xl mx-auto mb-1" />
          <p className="text-3xl font-extrabold text-primary">{watchlistCount}</p>
          <p className="text-xs text-gray-500 mt-1">Watchlist</p>
        </div>
        <div className="bg-base-200 rounded-2xl p-4 text-center border border-base-300 shadow">
          <FaHeart className="text-secondary text-2xl mx-auto mb-1" />
          <p className="text-3xl font-extrabold text-secondary">{collectionCount}</p>
          <p className="text-xs text-gray-500 mt-1">Collection</p>
        </div>
        <div className="bg-base-200 rounded-2xl p-4 text-center border border-base-300 shadow">
          <FaStar className="text-warning text-2xl mx-auto mb-1" />
          <p className="text-3xl font-extrabold text-warning">4.8</p>
          <p className="text-xs text-gray-500 mt-1">Avg Rating</p>
        </div>
      </div>

      {/* ── Account Info ── */}
      <div className="max-w-2xl mx-auto bg-base-200 rounded-2xl p-6 border border-base-300 shadow">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FaUserCircle className="text-primary" /> Account Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Display Name",   value: user?.displayName || "Not set",  icon: <FaUserCircle className="text-primary" /> },
            { label: "Email",          value: user?.email,                      icon: <FaEnvelope className="text-secondary" /> },
            { label: "Member Since",   value: joinedDate,                       icon: <FaCalendarAlt className="text-accent" /> },
            { label: "Last Sign In",   value: lastLogin,                        icon: <FaClock className="text-info" /> },
            { label: "Auth Provider",  value: provider,                         icon: <FaShieldAlt className="text-warning" /> },
            { label: "Email Verified", value: user?.emailVerified ? "✅ Yes" : "❌ No", icon: <FaStar className="text-success" /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex items-center gap-3 bg-base-100 rounded-xl p-4 border border-base-300">
              <div className="text-lg">{icon}</div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                <p className="font-semibold text-sm mt-0.5 break-all">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;
