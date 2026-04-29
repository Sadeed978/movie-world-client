import React from 'react';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { EffectFade, Autoplay } from 'swiper/modules';

const Banner = () => {
    const images = [
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=80",
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&q=80",
        "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1400&q=80"
];
    return (
        <div>
            <div className="relative w-full h-[450px]">
            <Swiper
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-full"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  >
                  
                    <div className="max-w-md text-white p-8  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to <br />Movie <span className='text-blue-500'>World</span></h1>
                        <p className="mb-5">Dive into a world of movies where every story comes alive. Discover trending films, fan favorites, and timeless classics—all in one place.</p>
                         <input type="text" placeholder="🔍Search Your Movie" className='bg-black-400' />
                    </div>
                </div>
                </SwiperSlide>
              ))}
              
            </Swiper>
                    
            </div>
        </div>
    );
};

export default Banner;