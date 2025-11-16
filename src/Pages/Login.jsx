import React from 'react';
import { use } from 'react';
import { Link } from 'react-router';
import AuthContext from '../contexts/AuthContexts';
import { toast } from 'react-toastify';
import { useLocation,useNavigate } from 'react-router';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const handlePassword = () => {
      setShowPassword(!showPassword);
    }
  const {signInUser,signInWithGoogle,setUser} = use(AuthContext);
   const location = useLocation();
   const navigate= useNavigate();
  const handleLogIn = (event) =>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInUser(email,password)
    .then(result=>{
      const user = result.user;
       toast.success((user.displayName ||user.email) + 'logged in successfully');
       navigate (location.state || '/');
       setUser(user);
    })
    .catch(error=>{
      toast.error('Error logging in: ' + error.message);
      
    })
    
  }
   const handleGoogleSignIn = () => {
     signInWithGoogle()
     .then(result => {
       const user = result.user;
       setUser(user);
       toast.success((user.displayName || user.email) + ' logged in with Google successfully');
       navigate (location.state || '/');
       fetch('http://localhost:3000/users',{
        method: 'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          console.log('get the data', data)
        })
     })
     .catch(error => {
       toast.error('Error during Google sign-in: ' + error.message);
       
     });
     
   }
   
    return (
       <div className="hero bg-base-600 text-3xl min-h-screen">
  <div className="hero-content  items-center">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleLogIn}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <div className='relative'>
                              <label className="label">Password</label>
                              <input type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" required />
                              <button onClick={handlePassword} className="btn btn-xs absolute top-6 right-20">{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
                            </div>
          <a  className="link link-hover">Forgot password?</a>
            <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </form>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
        
        <p>If you are new then go to <Link className='text-blue-500' to='/Register'>Register</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;