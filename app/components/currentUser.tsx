"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  userId: number;
  currentUser: string;
  location: string;
  email: string;
  avatarUrl: string;
};

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const useCurrentUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  }
  return ctx;
};

export default function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("farmchain_user");
    if (stored && stored !== "undefined" && stored !== "null") {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.warn("Corrupted farmchain_user value removed");
        localStorage.removeItem("farmchain_user");
      }
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
