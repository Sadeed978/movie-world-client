import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaEnvelope, FaGlobe, FaClock } from "react-icons/fa";
import "swiper/css";

const Contact = () => {
  return (
    <div className=" bg-orange-500 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">
          Contact Us
        </h1>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {/* Website Card */}
          <SwiperSlide>
            <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-xl text-center max-w-md mx-auto">
              <FaGlobe className="text-4xl mx-auto mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">
                Official Website
              </h3>
              <p className="text-gray-600 break-all">
                https://movie-world-client.web.app/
              </p>
            </div>
          </SwiperSlide>

          {/* Email Card */}
          <SwiperSlide>
            <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-xl text-center max-w-md mx-auto">
              <FaEnvelope className="text-4xl mx-auto mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">
                Email Support
              </h3>
              <p className="text-gray-600">
                support@movieworld.app
              </p>
            </div>
          </SwiperSlide>

          {/* Response Time Card */}
          <SwiperSlide>
            <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-xl text-center max-w-md mx-auto">
              <FaClock className="text-4xl mx-auto mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">
                Response Time
              </h3>
              <p className="text-gray-600">
                Within 24–48 hours
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Contact;
