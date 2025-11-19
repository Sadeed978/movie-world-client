import React, { useEffect, useState } from 'react';
import { use } from 'react';
import AuthContext from '../contexts/AuthContexts';
import { Link } from 'react-router';
const MyCollections = () => {
    const {user} = use(AuthContext)
    const handleDelete = (id) => {
        fetch(`https://movie-world-server-navy.vercel.app/movies/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount > 0) {
                alert("Movie Deleted!");
                setMovies(movies.filter(movie => movie._id !== id));
            }
        });}
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        if (!user?.email)return;
        fetch( `https://movie-world-server-navy.vercel.app/moviesMycollection?email=${user.email}` )
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
                    <div key={movie._id} className="card card-compact w-96 bg-base-100 shadow-xl m-4">
                        <figure><img src={movie.posterUrl} alt="Movie Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{movie.tittle}</h2>
                            <p>Rating: {movie.rating}</p>
                            <p>Publish Year: {movie.releaseYear}</p>
                            <div className='flex flex-row'>
                                <Link to={`/Movies/update/${movie._id}`}><button className="btn btn-primary">Edit</button></Link>
                                <button onClick={()=>handleDelete(movie._id)}className="btn btn-secondary ml-4">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCollections;