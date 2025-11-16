import React from 'react';
import { NavLink } from 'react-router';
import { Link } from 'react-router';
import AuthContext from '../contexts/AuthContexts';
import { use} from 'react';
import { toast } from 'react-toastify';

const Navber = () => {
    const {user,signOutUser}= use(AuthContext);
    const linkClass = ({ isActive }) => (isActive ? 'text-blue-500  font-bold' : 'default');
    const links = <>
        <li><NavLink  to='/' className={linkClass}>Home</NavLink></li>
        <li><NavLink to='/Register'className={linkClass}>Registration</NavLink></li>
        <li><NavLink to='/Login'className={linkClass}>Login</NavLink></li>
    </>
    const handleLogOut = () => {
        signOutUser()
        .then(() => {
            toast.success('User signed out successfully');
           
        })
        .catch((error) => {
            toast.error('Error signing out: ' + error.message);
            
        });}
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">MOVIE <span className=' text-blue-400'>WORLD</span></a>
            </div>
            <div className="navbar-center hidden  lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
            <div className="navbar-end">
               { user?(
    
                <div className='flex item -end gap-3'>
                    <Link to="/Register"  className='relative group'>
                        { user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className='w-10 h-10 rounded-full'></img>
                        ):(
                            <FaRegUserCircle className='w-10 h-10'></FaRegUserCircle>
                        )}
                       <div className="pointer-events-none absolute right-0 mt-2 w-56 bg-white text-black p-2 rounded shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-sm z-20">
                                <div className="font-semibold truncate">{user.displayName || 'No name'}</div>
                                <div className="text-xs text-gray-600 ">{user.email || 'No email'}</div>
                            
                            </div>
                            </Link>
                            <button onClick={handleLogOut} className='btn btn-sm btn-outline btn-warning'>Log out</button>
                </div>) : ( 
                <Link to='/Login' className="btn btn-outline text-blue-600">Login</Link>)}
                
              
            </div>
            </div>
        </div>
    );
};

export default Navber;