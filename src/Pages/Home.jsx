import React, { Suspense, useEffect } from 'react';
import Banner from '../component/Banner';
import { useLoaderData } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import RecentMovies from '../component/RecentMovies';
import Aos from 'aos';
import 'aos/dist/aos.css';
const Home = () => {
    const data = useLoaderData();
    const latestMoviePromise = fetch('http://localhost:3000/latestMovies')
    .then((res) => res.json());
    useEffect(() => {
        Aos.init({ duration: 1000, 
        easing : 'ease-in-out',
        once: true,});
    }, []);
    return (
        <div>
            <Banner></Banner>
            <div className='text-center my-10 p-4'>

                <h1 className='text-3xl text-gray-500'>Best <span className='text-blue-500'> Movies</span> </h1>
                <p className='text-2xl text-gray-500'>Explore our curated selection of top-rated movies, handpicked for your viewing pleasure. Dive into captivating stories and unforgettable performances.</p>
            </div>
            <div className="my-5">
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={6}
                    spaceBetween={30} 
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 90,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="w-full h-[400px]"
                >
                    {data.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="relative w-full h-full" data-aos="fade-up" data-aos-delay= "200">
                                
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover rounded-lg transform transition-transform duration-200 hover:scale-110"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
                                    <h2 className="text-2xl font-bold">{movie.title}</h2>
                                    <p className="text-sm">{movie.plotSummary}</p>
                                </div>
                            </div>
                            </SwiperSlide>
                    ))}
                </Swiper>
            </div>
                  <div data-aos="fade-up" data-aos-delay="100" className='my-10 p-4'>
                   <Suspense fallback={<div className='text-center text-3xl text-blue-500'>Loading...</div>}>
                   <RecentMovies latestMoviePromise={latestMoviePromise}></RecentMovies>
                   </Suspense>
                  

                  </div>

            
            </div>
         
        
    );
};

export default Home;