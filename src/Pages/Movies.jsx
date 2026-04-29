import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import Movie from '../component/Movie';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Movies = () => {
    const data = useLoaderData();
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return data;
        return data.filter(movie =>
            movie.title?.toLowerCase().includes(q) ||
            movie.plotSummary?.toLowerCase().includes(q)
        );
    }, [query, data]);

    return (
        <div className="p-4">

            {/* ── Centered Header ── */}
            <div className="text-center py-10 px-4">
                <h1 className="text-4xl font-extrabold">
                    Trending <span className="text-primary">Movies</span>
                </h1>
                <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base">
                    Choose your favourite movie and click to see details.
                </p>

                {/* ── Search Bar ── */}
                <div className="relative max-w-md mx-auto mt-6">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search movies by title or genre..."
                        className="input input-bordered w-full pl-10 pr-10 rounded-full focus:outline-none focus:border-primary"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-error transition-colors"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>

                {/* Result count */}
                {query && (
                    <p className="text-sm text-gray-500 mt-3">
                        {filtered.length === 0
                            ? 'No movies found'
                            : `${filtered.length} movie${filtered.length > 1 ? 's' : ''} found`}
                    </p>
                )}
            </div>

            {/* ── Movie Grid ── */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 pb-10">
                    {filtered.map(movie => (
                        <Movie key={movie._id || movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <FaSearch className="text-5xl mx-auto mb-4 opacity-30" />
                    <p className="text-xl font-semibold">No movies match "{query}"</p>
                    <p className="text-sm mt-1">Try a different title or keyword</p>
                </div>
            )}
        </div>
    );
};

export default Movies;
