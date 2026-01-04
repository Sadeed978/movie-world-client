import React from 'react';
import { Link } from 'react-router';


const Movie = ({ movie }) => {
    const { _id, title, plotSummary, posterUrl } = movie;
    console.log(_id);
    return (
        <div >
            
                <div className="card bg-gray-400 w-70 shadow-sm">
                    <figure className=" pt-8">
                        <img
                            src={posterUrl}
                            alt="Movies"
                            className="rounded-xl w-40 h-30" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{title}</h2>
                        <p>{plotSummary}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary"><Link to={`/movies/${movie._id}`}>View More </Link></button>
                        </div>
                    </div>
                </div>


        </div>
    );
};

export default Movie;