import React, { useEffect } from 'react';
import { useState } from 'react';
import AuthContext from './AuthContexts';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,  } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';


const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
    const createUser=(email,password)=> {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle= () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const signInUser= (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signOutUser= () => {
        setLoading(true);
         return signOut(auth);
    }
   

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {unsubscribe();};  
    },[]) 
   
    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInWithGoogle,
        signInUser,
        signOutUser,
    };
    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;