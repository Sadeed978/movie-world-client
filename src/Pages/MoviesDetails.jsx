import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import Movie from '../component/Movie';

const MoviesDetails = () => {
    const { id } = useParams();
    const data = useLoaderData();
    const MovieDetails = Array.isArray(data) ? data.find(Movie => Movie.id == parseInt(id)) : null;
    const { title, plotSummery, posterUrl,duration,rating} = Movie;
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-sm items-center m-4 p-10">
                <figure>
                    <img
                        src={posterUrl}
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{plotSummery}</p>

                    <p>rating:{rating}</p>
                    <p>duration:{duration}</p>

                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesDetails;