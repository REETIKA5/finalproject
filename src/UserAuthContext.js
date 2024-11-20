
import React, { useContext, createContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut } from 'firebase/auth';


import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const auth = getAuth();


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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserRole(currentUser.uid);
      } else {
        setUser(null);
        setRole('');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchUserRole = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
      } else {
        console.error("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const signUp = async (email, password, selectedRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: selectedRole
      });
      setRole(selectedRole);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      await fetchUserRole(user.uid);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole('');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserAuthContext.Provider value={{ user, role, signUp, logIn, logOut }}>

      {children}
    </UserAuthContext.Provider>
  );
};


export const useUserAuth = () => {
  return useContext(UserAuthContext);
};

