import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext({});
 
export const AuthProvider = ({children}) => {

  const [currentUser,setCurrentUser] = useState(null)
  
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
   
  };
  const logout = () => {
    return signOut(auth).then(() => {
      db.collection("users").doc(currentUser.uid).update({
        isOnline:false
      })
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('user status changed: ', user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{
        currentUser,
        signUp,
        login,
        logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth () {
    return useContext(AuthContext);
}