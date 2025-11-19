import React from 'react';
import { useLoaderData } from 'react-router';
import Movie from '../component/Movie';
import { useState } from 'react';
import { FreeMode } from 'swiper/modules';
import { toast } from 'react-toastify';
const Movies = () => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [genres, setGenres] = useState('');
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const handleFilter = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/movies?genres=${genres}&minRating=${minRating}&maxRating=${maxRating}`)
            .then(res => res.json())
            .then(movies => {
                setFilteredMovies(movies);
                toast.success('Movies filtered successfully!');
            })
            .catch(error => {
                console.error('Error fetching filtered movies:', error);
                toast.error('Failed to filter movies. Please try again.');
            });        
    };
    const data = useLoaderData();
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn text-end" onClick={() => document.getElementById('my_modal_5').showModal()}>Movie Filter</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Filter Movies</h3>
                    <form onSubmit={handleFilter} className="flex flex-col gap-4 mt-4">
                    
                <input
                        type="text"
                        placeholder="Genres (comma-separated)"
                        value={genres}
                        onChange={(e) => setGenres(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <div className="flex gap-4">
                        <input
                            type="number"
                            placeholder="Min Rating"
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="number"
                            placeholder="Max Rating"
                            value={maxRating}
                            onChange={(e) => setMaxRating(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        </div>
                    <div className="modal-action">
                        <form method="dialog">

                         <button type='submit' className='btn btn-primary'>Apply Filter</button>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div> 
                    </form>
                </div>
            </dialog>
            <div className='m-4 '>
                <div className='text-center mb-8 p-4'>
                    <h1 className='text-3xl text-gray-500'>Trending <span className='text-blue-500'> Movies</span> </h1>
                    <p className='text-2xl text-gray-500'>Choose your favourite movies. click the movie and go to movie details page.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-4'>
                    {
                        data.map(movie => < Movie key={movie.id} movie={movie} />)
                    }
                </div>
            </div>
        </div>


    );
};

export default Movies;