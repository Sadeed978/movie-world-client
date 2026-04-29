import React, { Suspense, use, useEffect } from 'react';
import Banner from '../component/Banner';
import FAQ from '../component/FAQ';
import { useLoaderData } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import RecentMovies from '../component/RecentMovies';
import Contact from '../component/Contact';
import Aos from 'aos';
import 'aos/dist/aos.css';

const totalUsersPromise = fetch('https://movie-world-server-navy.vercel.app/users').then((res) => res.json());
const totalMoviesPromise = fetch('https://movie-world-server-navy.vercel.app/movies').then((res) => res.json());

const reviews = [
    { name: "Alex Johnson", avatar: "https://i.pravatar.cc/60?img=1", rating: 5, text: "Movie World is absolutely amazing! The collection is huge and the UI is so clean. I find new movies every day." },
    { name: "Sarah Williams", avatar: "https://i.pravatar.cc/60?img=5", rating: 5, text: "Love the watchlist feature. I can keep track of everything I want to watch. Best movie app I've used!" },
    { name: "Mike Chen", avatar: "https://i.pravatar.cc/60?img=3", rating: 4, text: "Great platform with a fantastic movie database. The filtering options make it easy to find exactly what I'm in the mood for." },
    { name: "Emily Davis", avatar: "https://i.pravatar.cc/60?img=9", rating: 5, text: "The dark mode is gorgeous and the movie details page has everything I need. Highly recommend to all movie lovers!" },
    { name: "Carlos Rivera", avatar: "https://i.pravatar.cc/60?img=7", rating: 4, text: "Smooth experience from start to finish. Adding movies to my collection is super easy and the site loads fast." },
    { name: "Priya Patel", avatar: "https://i.pravatar.cc/60?img=11", rating: 5, text: "I've been using Movie World for months now. The recommendations are spot on and I love the clean design!" },
];

const StarRating = ({ rating }) => (
    <div className="flex gap-1 my-2">
        {[1,2,3,4,5].map(star => (
            <span key={star} className={star <= rating ? "text-yellow-400 text-lg" : "text-gray-500 text-lg"}>★</span>
        ))}
    </div>
);

const Home = () => {
    const data = useLoaderData();
    const totalMovies = use(totalMoviesPromise);
    const totalUsers = use(totalUsersPromise);

    const latestMoviePromise = fetch('https://movie-world-server-navy.vercel.app/latestMovies').then((res) => res.json());

    useEffect(() => {
        Aos.init({ duration: 1000, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div>
            <Banner />

            {/* ── Best Movies Section ── */}
            <div className='text-center my-10 px-4'>
                <h1 className='text-4xl font-bold'>Best <span className='text-primary'>Movies</span></h1>
                <p className='text-gray-500 mt-2 max-w-2xl mx-auto'>Explore our curated selection of top-rated movies, handpicked for your viewing pleasure.</p>
            </div>

            {/* ── Stylish Swiper Poster Slider ── */}
            <div className="my-6 px-2" data-aos="fade-up">
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    coverflowEffect={{ rotate: 40, stretch: 0, depth: 120, modifier: 1, slideShadows: true }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Autoplay, Pagination]}
                    className="w-full pb-10"
                >
                    {data.map((movie) => (
                        <SwiperSlide key={movie._id || movie.id} style={{ width: '200px', height: '300px' }}>
                            <div className="relative w-full h-full group rounded-xl overflow-hidden shadow-2xl">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <h2 className="text-white text-sm font-bold leading-tight">{movie.title}</h2>
                                    <p className="text-gray-300 text-xs mt-1 line-clamp-2">{movie.plotSummary}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ── Stats Bar ── */}
            <div data-aos="fade-up" className="mx-4 mt-6 mb-10 rounded-2xl overflow-hidden shadow-xl bg-primary text-primary-content">
                <div className="grid grid-cols-3 divide-x divide-primary-content/30">
                    <div className="flex flex-col items-center justify-center py-8 gap-1">
                        <span className="text-5xl font-extrabold">{totalMovies.length}</span>
                        <span className="text-sm uppercase tracking-widest opacity-80">Movies</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 gap-1">
                        <span className="text-5xl font-extrabold">{totalUsers.length}</span>
                        <span className="text-sm uppercase tracking-widest opacity-80">Users</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 gap-1">
                        <span className="text-5xl font-extrabold">1.2K</span>
                        <span className="text-sm uppercase tracking-widest opacity-80">Reviews</span>
                    </div>
                </div>
            </div>

            {/* ── FAQ ── */}
            <div className='px-2'>
                <FAQ />
            </div>

            {/* ── User Reviews ── */}
            <div data-aos="fade-up" className="my-12 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold">What Our <span className="text-primary">Users Say</span></h2>
                    <p className="text-gray-500 mt-2">Real reviews from real movie lovers</p>
                </div>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    spaceBetween={24}
                    loop={true}
                    breakpoints={{
                        0:    { slidesPerView: 1 },
                        640:  { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {reviews.map((review, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-base-200 rounded-2xl p-6 shadow-lg border border-base-300 h-full flex flex-col gap-3 hover:border-primary transition-colors duration-300">
                                <div className="flex items-center gap-3">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary" />
                                    <div>
                                        <p className="font-bold text-base">{review.name}</p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed flex-1">"{review.text}"</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ── Recent Movies ── */}
            <div data-aos="fade-up" className='my-10 px-4'>
                <Suspense fallback={<div className='text-center text-3xl text-primary'>Loading...</div>}>
                    <RecentMovies latestMoviePromise={latestMoviePromise} />
                </Suspense>
            </div>

            {/* ── Contact ── */}
            <div className='px-4'>
                <Contact />
            </div>
        </div>
    );
};

export default Home;