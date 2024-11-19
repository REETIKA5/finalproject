import React, { useContext, createContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const UserAuthContext = createContext();

export const useUserAuth = () => useContext(UserAuthContext);

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Log In
  const logIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential.user;
  };

  // Sign Up
  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
    });
    setUser(user);
    return user;
  };

  // Google Sign In
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
    });
    setUser(user);
    return user;
  };

  // Log Out
  const logOut = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser ? { uid: currentUser.uid, email: currentUser.email } : null);
    });
    return unsubscribe;
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, logIn, signUp, googleSignIn, logOut }}>
      {children}
    </UserAuthContext.Provider>
  );
};
