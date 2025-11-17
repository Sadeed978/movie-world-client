import React from 'react';
import { Link } from 'react-router';


const Movie = ({ movie }) => {
    const {_id, title, plotSummery,  posterUrl } = movie;
    console.log(_id);
    return (
        <div >
           <Link to={`/movies/${movie._id}`}>
            <div className="card bg-base-100 image-full w-50 shadow-sm">
                <figure className=' h-full'>
                    <img 
                        src={posterUrl}
                        alt="" className=' h-auto'/>
                </figure>
                <div className="card-body">
                   
                    <p>{plotSummery}</p>

                    <h2 className="card-title">{title}</h2>
                   
                </div>
            </div> </Link>


        </div>
    );
};

export default Movie;