import React, { useEffect, useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase-config';
import type { UserProfile } from '../types/auth';
import { AuthContext, type AuthContextType } from './AuthContext';

const API_URL = import.meta.env.VITE_BACKEND_URL;


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from MongoDB
  const fetchUserProfile = async (user: FirebaseUser): Promise<UserProfile | null> => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Sync user with MongoDB (called after signup or first login)
  const syncUserWithBackend = async (user: FirebaseUser, name?: string): Promise<void> => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_URL}/api/auth/sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(name ? { name } : {}),
      });

      if (!response.ok) {
        throw new Error('Failed to sync user with backend');
      }

      const data = await response.json();
      console.log('User synced:', data.isNew ? 'New user created' : 'Existing user');
    } catch (error) {
      console.error('Error syncing user:', error);
    }
  };

  // Refresh user profile from backend
  const refreshProfile = async (): Promise<void> => {
    if (currentUser) {
      const profile = await fetchUserProfile(currentUser);
      setUserProfile(profile);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle the rest
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, name?: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }
      // Sync with backend immediately after registration
      await syncUserWithBackend(userCredential.user, name);
      // onAuthStateChanged will handle fetching the profile
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login with Google function
  const loginWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      // Sync with backend immediately after login
      await syncUserWithBackend(userCredential.user);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // User is signed in
        // First, sync with backend (in case it's a new user or first login)
        await syncUserWithBackend(user);
        
        // Then fetch the full profile from MongoDB
        const profile = await fetchUserProfile(user);
        setUserProfile(profile);
      } else {
        // User is signed out
        setUserProfile(null);
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
