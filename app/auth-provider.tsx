"use client";

import type { ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { UserProfile } from "@/types/types";

type AuthContextValue = {
  user: UserProfile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        setUser(null)
        setLoading(false)
        return
      }

      const userProfile: UserProfile = {
        id: u.uid,
        name: u.displayName,
        email: u.email,
        bio: undefined,
        photoUrl: u.photoURL,
        provider: u.providerData[0].providerId
      }

      setUser(userProfile)
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
