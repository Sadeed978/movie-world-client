import React, { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';

import AuthContext from '../contexts/AuthContexts';
const MovieUpdates = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = use(AuthContext);
    const [movieData, setMovieData] = useState(null);
    console.log(id)

    useEffect(() => {
        fetch(`http://localhost:3000/moviesById/${id}`)
            .then(res => res.json())
            .then(data => setMovieData(data));
    }, [id]);
    if (!movieData) return <span className="loading loading-dots loading-xl"></span>;
    const handleUpdate = (event) => {
        event.preventDefault();
        const movieName = event.target.movieName.value;
        const photo = event.target.photo.value;
        const rating = event.target.rating.value;
        const publishYear = event.target.publishYear.value;
        const updatedMovie = {
            name: user.displayName,
            email: user.email,
            photo: photo,
            movieName: movieName,
            rating: rating,
            publishYear: publishYear,
        };
        fetch(`http://localhost:3000/movies/${id}?email=${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedMovie)
        })
            .then(res => res.json())
            .then(data => {
                console.log('get the data', data);
                navigate('/Movies/MyCollections');
            });
    };
    return (
        <div className="p-5 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Update Movie</h2>

            <form onSubmit={handleUpdate} className="space-y-4">

                <input
                    type="text"
                    name="movieName"
                    defaultValue={movieData.movieName}
                    className="input input-bordered w-full"
                    placeholder="Movie Name"
                />

                <input
                    type="text"
                    name="photo"
                    defaultValue={movieData.photo}
                    className="input input-bordered w-full"
                    placeholder="Photo URL"
                />

                <input
                    type="text"
                    name="rating"
                    defaultValue={movieData.rating}
                    className="input input-bordered w-full"
                    placeholder="Rating"
                />

                <input
                    type="text"
                    name="publishYear"
                    defaultValue={movieData.publishYear}
                    className="input input-bordered w-full"
                    placeholder="Publish Year"
                />

                <button type="submit" className="btn btn-neutral w-full">
                    Update Movie
                </button>
            </form>
        </div>
    );
};


export default MovieUpdates;