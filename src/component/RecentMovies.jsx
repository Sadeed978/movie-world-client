import React, { use } from 'react';
import Movie from './Movie';
const RecentMovies = ({latestMoviePromise}) => {
    const movie = use(latestMoviePromise);
    console.log(movie);
    return (
    
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-4'>
                {
                   movie.map(movie => < Movie key={movie.id} movie={movie} />)
                }
            </div>
        
    );
};

export default RecentMovies;