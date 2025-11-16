import React from 'react';

const Home = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://i.ibb.co.com/xSGFyz0Y/2019movies-900x789.jpg)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to <br />Movie <span className='text-blue-500'>World</span></h1>
                        <p className="mb-5">Dive into a world of movies where every story comes alive. Discover trending films, fan favorites, and timeless classics—all in one place.</p>
                         <input type="text" placeholder="🔍Search Your Movie" className='bg-black-400' />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;