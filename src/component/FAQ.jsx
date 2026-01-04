import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Faq = () => {
    const faqData = [
        {
          question: "Is Movie World free to use?",
          answer: "Yes, Movie World is completely free for all users."
        },
        {
          question: "Do I need an account?",
          answer: "You can browse movies without login, but authentication is required for favorites and watchlists."
        },
        {
          question: "Is my data private?",
          answer: "Yes. Firebase ensures secure authentication and private data access."
        },
        {
          question: "Can I edit my watchlist?",
          answer: "Yes. You can add, update, or remove movies anytime."
        },
        {
          question: "Which technologies are used?",
          answer: "React, Vite, Tailwind CSS, Firebase, Swiper, AOS, and React Router."
        }
      ];
  return (
    <div className=" bg-gray-900 text-gray-100 px-4 py-9">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">
          Frequently Asked Questions
        </h1>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {faqData.map((faq, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-800 h-full p-6 rounded-xl shadow-lg border border-gray-700 hover:border-primary transition">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};



export default Faq;
