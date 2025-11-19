import React from 'react';
import { use } from 'react';
import AuthContext from '../contexts/AuthContexts';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const Watchlist = () => {
    const {user}=use(AuthContext);
    const[watchlist,setWatchlist]=useState([]);
    useEffect(()=>{
        fetch(`https://movie-world-server-navy.vercel.app/watchlist?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>setWatchlist(data));
        console.log(watchlist);
    });

    const handleRemove=(id)=>{
        fetch(`https://movie-world-server-navy.vercel.app/watchlist/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
                toast.success('Movie removed from watchlist');
                setWatchlist(watchlist.filter(movie=>movie._id!==id));
            }
        });
    };
    
    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">My Watchlist</h2>
            <div className='grid md:grid-cols-3 gap-4'>
                {watchlist.map(movie=>(
                    <div key={movie._id} className="card card-compact w-full bg-base-100 shadow-xl">
                        <figure><img src={movie.photo} alt="Movie Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{movie.movieN}</h2>
                            <div className="card-actions justify-end">
                                <button onClick={()=>handleRemove(movie._id)} className="btn btn-secondary">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Watchlist;