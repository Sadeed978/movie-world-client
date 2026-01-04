import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContexts";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("https://movie-world-server-navy.vercel.app/users")
      .then(res => res.json())
      .then(data => {
        const matchedUser = data.find(u => u.email === user?.email);
        setProfile(matchedUser);
      });
  }, [user]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      
     
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full md:w-1/2 text-center">
        
       
        <img
          src={user?.photoURL || "https://i.ibb.co/2kRzJ3B/user.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-orange-500 mb-4 object-cover"
        />

       
        <h2 className="text-2xl font-semibold text-gray-800">
          {user?.displayName || "No Name"}
        </h2>

       
        <p className="text-gray-500 mt-1">
          {user?.email}
        </p>

      </div>
    </div>
  );
};

export default Profile;
