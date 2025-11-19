import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import Movie from '../component/Movie';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContexts';
import { use } from 'react';
const MoviesDetails = () => {
    const { id } = useParams();
    const data = useLoaderData();
    const{user}=use(AuthContext);
    console.log(data);
    const MovieDetails = Array.isArray(data) ? data.find(Movie => Movie.id == parseInt(id)) : null;
    const {_id, title, plotSummary, posterUrl,duration,rating,cast} = data;
    const handleAddWatchlist = () => {
        const watchItem = {
            movieId:_id,
            movieName: title,
            photo: posterUrl,
            email: user.email
          };
         

            fetch('https://movie-world-server-navy.vercel.app/watchlist', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(watchItem)
            })
                .then(res => res.json())
                .then(data => {
                if (data.acknowledged) {
                    toast.success('Movie added to watchlist!');
                } else {
                    toast.error('Failed to add movie to watchlist.');
                }
                })
                .catch(error => {
                console.error('Error adding movie to watchlist:', error);
                toast.error('An error occurred while adding the movie to watchlist.');
                });
        
    }
   
    return (
        <div>
            <div className="card card-side flex flex-col md:flex-row lg:flex-row bg-base-100 shadow-sm items-center m-4 p-10">
                <figure>
                    <img
                        src={posterUrl}
                        alt="Movie" className='w-50'/>
                </figure>
                <div className="card-body text-2xl">
                    <h2 className="card-title">{title}</h2>
                    <p className='text-xl text-gray-600'>{plotSummary}</p>

                    <p className='text-blue-400'>rating:{rating}</p>
                    <p className='text-blue-400'>duration:{duration}</p>
                    <p>{cast}</p>

                    <div className="card-actions justify-end mt-4">
                        <button onClick={handleAddWatchlist} className="btn btn-primary">Add To Watchlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesDetails;