import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import Movie from '../component/Movie';

const MoviesDetails = () => {
    const { id } = useParams();
    const data = useLoaderData();
    console.log(data);
    const MovieDetails = Array.isArray(data) ? data.find(Movie => Movie.id == parseInt(id)) : null;
    const { title, plotSummary, posterUrl,duration,rating,cast} = data;
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-sm items-center m-4 p-10">
                <figure>
                    <img
                        src={posterUrl}
                        alt="Movie" className='w-50'/>
                </figure>
                <div className="card-body text-2xl">
                    <h2 className="card-title">{title}</h2>
                    <p >{plotSummary}</p>

                    <p className='text-blue-400'>rating:{rating}</p>
                    <p className='text-blue-400'>duration:{duration}</p>
                    <p>{cast}</p>

                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesDetails;