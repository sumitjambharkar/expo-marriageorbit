import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null)

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)

  };

  const logout = async () => {
    try {
      await auth.signOut()
      await AsyncStorage.removeItem('userName')
      await db.collection("users").doc(currentUser.uid).update({ isOnline: false })
      setCurrentUser(null)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userName')
      if (jsonValue != null) {
        console.log(jsonValue);
        setCurrentUser(JSON.parse(jsonValue))
      }
    } catch (e) {
      console.log(e);
    }
  }

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

export default function useAuth() {
  return useContext(AuthContext);
}