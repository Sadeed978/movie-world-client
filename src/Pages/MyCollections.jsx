import React, { useEffect, useState } from 'react';
import { use } from 'react';
import AuthContext from '../contexts/AuthContexts';
const MyCollections = () => {
    const {user} = use(AuthContext)
    
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        if (!user?.email)return;
        fetch( `http://localhost:3000/moviesMycollection?email=${user.email}` )
        .then(res=>res.json())
        .then(data=>setMovies(data))

    },[user]);

    return (
        <div>
            <div className='mb-4 text-center'>
                <h1 className='text-3xl border-amber-500 text-blue-500'>My Colection</h1>
            </div>
            <div className='grid md:grid-cols-3 '>
                { movies.map(movie=>(
                    <div key={movie.id} className="card card-compact w-96 bg-base-100 shadow-xl m-4">
                        <figure><img src={movie.photo} alt="Movie Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{movie.movieName}</h2>
                            <p>Rating: {movie.rating}</p>
                            <p>Publish Year: {movie.publishYear}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCollections;