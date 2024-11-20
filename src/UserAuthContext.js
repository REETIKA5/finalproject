import React, { useContext, createContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
 
const UserAuthContext = createContext();
 
export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
 
  // Fetch user role from Firestore
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
 
  // Sign Up
  const signUp = async (email, password, selectedRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      setUser(newUser);
 
      // Save user data to Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        uid: newUser.uid,
        email: newUser.email,
        role: selectedRole,
      });
      setRole(selectedRole);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };
 
  // Log In
  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      setUser(loggedInUser);
      await fetchUserRole(loggedInUser.uid);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };
 
  // Google Sign In
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      setUser(googleUser);
 
      // Save user data if not already in Firestore
      const userDoc = await getDoc(doc(db, 'users', googleUser.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', googleUser.uid), {
          uid: googleUser.uid,
          email: googleUser.email,
          role: 'user', // Default role, can be adjusted as needed
        });
      }
      await fetchUserRole(googleUser.uid);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      throw error;
    }
  };
 
  // Log Out
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole('');
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };
 
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
  }, []);
 
  return (
    <UserAuthContext.Provider value={{ user, role, signUp, logIn, googleSignIn, logOut }}>
      {children}
    </UserAuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(UserAuthContext);
};