import React, { useContext, createContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const UserAuthContext = createContext();

// Hook to use UserAuthContext
export const useUserAuth = () => useContext(UserAuthContext);

// UserAuthContext Provider Component
export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login with email and password
  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
      });
      setUser(user);
      return user;
    } catch (error) {
      console.error("Sign-Up Error:", error.message);
      throw error;
    }
  };

  // Sign in with Google
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
      });
      setUser(user);
      return user;
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error;
    }
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, logIn, signUp, googleSignIn }}>
      {children}
    </UserAuthContext.Provider>
  );
};
