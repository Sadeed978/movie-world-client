import React from 'react';
import { use } from 'react';
import AuthContext from './contexts/AuthContexts';
import { Navigate, useLocation } from 'react-router';


const PrivateRoute = ({children}) => {
    const location =useLocation();
    const {user,loading}=use(AuthContext)
    if(loading){
        return <span className="loading loading-dots loading-xl"></span>;
    }
    
    if (user){
         return children
    }
    return (
        <Navigate state={location.pathname} to='/login'></Navigate> 
    );
};

export default PrivateRoute;