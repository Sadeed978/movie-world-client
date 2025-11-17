import React from 'react';
import { useLoaderData } from 'react-router';
import Movie from '../component/Movie';

const Movies = () => {
    const data = useLoaderData();
    return (
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


    );
};

export default Movies;