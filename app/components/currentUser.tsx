// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// type User = {
//   userId: number;
//   currentUser: string;
//   location: string;
//   email: string;
//   avatarUrl: string;
// };

// type UserContextType = {
//   user: User | null;
//   setUser: (u: User | null) => void;
// };

// const UserContext = createContext<UserContextType | null>(null);

// export const useCurrentUser = () => {
//   const ctx = useContext(UserContext);
//   if (!ctx) {
//     throw new Error("useCurrentUser must be used inside CurrentUserProvider");
//   }
//   return ctx;
// };

// export default function CurrentUserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("farmchain_user");
//     if (stored && stored !== "undefined" && stored !== "null") {
//       try {
//         setUser(JSON.parse(stored));
//       } catch {
//         console.warn("Corrupted farmchain_user value removed");
//         localStorage.removeItem("farmchain_user");
//       }
//     }
//   }, []);

//   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
// }



"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  userId: number;
  currentUser: string;
  location: string;
  email: string;
  avatarUrl: string;
};

type UserProfile = {
  name: string;
  location: string;
  avatar: string;
  cover_avatar: string;
  bio: string;
  organization: string;
  verified: boolean;
  share_account: string;
  followers: number;
  following: number;
};

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  userProfile: UserProfile | null;
  setUserProfile: (p: UserProfile | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const useCurrentUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  return ctx;
};

export default function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("farmchain_user");
    const storedProfile = localStorage.getItem("userProfile");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("farmchain_user");
      }
    }

    if (storedProfile && storedProfile !== "undefined") {
      try {
        setUserProfile(JSON.parse(storedProfile));
      } catch {
        localStorage.removeItem("userProfile");
      }
    }
  }, []);

  console.log(user, "USERS");
  console.log(userProfile, "PROFILE");
  

  useEffect(() => {
    if (user) localStorage.setItem("farmchain_user", JSON.stringify(user));
    else localStorage.removeItem("farmchain_user");
  }, [user]);

  useEffect(() => {
    if (userProfile) localStorage.setItem("userProfile", JSON.stringify(userProfile));
    else localStorage.removeItem("userProfile");
  }, [userProfile]);

  return (
    <UserContext.Provider value={{ user, setUser, userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

