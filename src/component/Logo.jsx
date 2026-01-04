import React from 'react';

const Logo = () => {
    return (
        <div className='flex flex-row border rounded p-5 bg-amber-500'>
            <img src='https://i.ibb.co.com/GfSCnRZW/png-clipart-movies-logo-backsheet-hand-painted.png' alt="" className='w-7 md:9' />
            <a className="btn btn-ghost text-xl">MOVIE <span className=' text-blue-600'>WORLD</span></a>
        </div>
    );
};

export default Logo;