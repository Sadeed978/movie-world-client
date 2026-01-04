import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">
          About Movie World
        </h1>

        <p className="text-gray-300 leading-relaxed text-lg">
          Movie World is a modern movie discovery and personal movie
          management platform where users can explore movies, add
          favorites, and manage a private watchlist.
          <br /><br />
          Built with React, Vite, and Tailwind CSS, the platform focuses on
          performance, simplicity, and responsiveness. Firebase handles
          authentication and secure data storage, ensuring that user data
          remains private and accessible only to the authenticated user.
          <br /><br />
          Movie World is designed for movie lovers who want an organized,
          secure, and enjoyable way to manage their entertainment choices.
        </p>
      </div>
    </div>
  );
};

export default About;
