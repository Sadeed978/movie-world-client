import React from 'react';
import { Link } from 'react-router';

const Movie = ({ movie }) => {
    const { _id, title, plotSummary, posterUrl } = movie;
    return (
        <div className="transform transition-transform duration-300 hover:scale-105 hover:z-10">
            <div className="card bg-base-200 w-full h-full shadow-md hover:shadow-2xl transition-shadow duration-300">
                <figure className="pt-4 px-4">
                    <img
                        src={posterUrl}
                        alt={title}
                        className="rounded-xl w-full h-60 object-cover" />
                </figure>
                <div className="card-body items-center text-center p-4">
                    <h2 className="card-title text-base">{title}</h2>
                    <p className="text-sm line-clamp-2 text-gray-500">{plotSummary}</p>
                    <div className="card-actions mt-2">
                        <Link to={`/movies/${_id}`} className="btn btn-primary btn-sm">View More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
