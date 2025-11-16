import React from 'react';
import { Link } from 'react-router';
import AuthContext from '../contexts/AuthContexts';
import { use } from 'react';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handlePassword = () => {
    setShowPassword(!showPassword);
  }
  const { setUser, createUser } = use(AuthContext);
  const handleRegister = (event) => {
    event.preventDefault();
    const Name = event.target.Name.value;
    const Photo = event.target.Photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUser(email, password)
      .then(result => {
        const user = result.user;
        setUser(user);
        toast.success((user.displayName || user.email) + 'you have create an Account')
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
      })

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{6,}$/;
    if (!passwordPattern.test(password)) {
      setError("Password must be 6 character,one upperletter and one lower class and should also one especial charater")
      return;
    }

  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" name='Name' className="input" placeholder="Your Name" required />
                <label className="label">Photo URL</label>
                <input type="text" name='Photo' className="input" placeholder="Photo URl" />
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />
                <div className='relative'>
                  <label className="label">Password</label>
                  <input type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" required />
                  <button onClick={handlePassword} className="btn btn-xs absolute top-6 right-20">{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {error && <p className='text-red-500'>{error}</p>}
            </form>
            <p>If You have An Account <Link className='text-blue-500' to='/Login'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;