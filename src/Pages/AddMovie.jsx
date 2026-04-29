import { use, useState } from 'react';
import AuthContext from '../contexts/AuthContexts';
import { toast } from 'react-toastify';
import { FaFilm, FaLink, FaStar, FaCalendarAlt, FaUser, FaEnvelope } from 'react-icons/fa';

const AddMovie = () => {
    const { user } = use(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddMovieSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newMovie = {
            name: user.displayName,
            email: user.email,
            posterUrl: form.posterUrl.value,
            title: form.title.value,
            rating: form.rating.value,
            releaseYear: form.releaseYear.value,
        };

        setLoading(true);
        fetch('https://movie-world-server-navy.vercel.app/movies', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newMovie)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Movie added successfully!');
                form.reset();
            })
            .catch(() => toast.error('Failed to add movie. Try again.'))
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
            <div className="w-full max-w-xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <FaFilm className="text-3xl text-primary" />
                    </div>
                    <h1 className="text-3xl font-extrabold">
                        Add a <span className="text-primary">Movie</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">Fill in the details below to add a new movie to the collection.</p>
                </div>

                {/* Form Card */}
                <div className="bg-base-200 rounded-3xl shadow-xl border border-base-300 p-8">
                    <form onSubmit={handleAddMovieSubmit} className="flex flex-col gap-5">

                        {/* Name — readonly */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                <FaUser className="text-primary" /> Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered bg-base-100 opacity-60 cursor-not-allowed"
                                readOnly
                                defaultValue={user?.displayName || ''}
                            />
                        </div>

                        {/* Email — readonly */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                <FaEnvelope className="text-secondary" /> Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered bg-base-100 opacity-60 cursor-not-allowed"
                                readOnly
                                defaultValue={user?.email || ''}
                            />
                        </div>

                        {/* Divider */}
                        <div className="divider text-xs text-gray-400">Movie Details</div>

                        {/* Title */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                <FaFilm className="text-primary" /> Movie Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="e.g. Inception"
                                className="input input-bordered bg-base-100 focus:border-primary"
                            />
                        </div>

                        {/* Poster URL */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                <FaLink className="text-secondary" /> Poster URL
                            </label>
                            <input
                                type="url"
                                name="posterUrl"
                                required
                                placeholder="https://example.com/poster.jpg"
                                className="input input-bordered bg-base-100 focus:border-primary"
                            />
                        </div>

                        {/* Rating + Release Year side by side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <FaStar className="text-warning" /> Rating
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    required
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder="0 – 10"
                                    className="input input-bordered bg-base-100 focus:border-primary"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                    <FaCalendarAlt className="text-accent" /> Release Year
                                </label>
                                <input
                                    type="number"
                                    name="releaseYear"
                                    required
                                    min="1900"
                                    max="2100"
                                    placeholder="e.g. 2024"
                                    className="input input-bordered bg-base-100 focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full rounded-xl mt-2 text-base font-bold"
                        >
                            {loading ? <span className="loading loading-spinner loading-sm" /> : '🎬 Add Movie'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMovie;
