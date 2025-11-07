// ...existing code...
'use client'

import React, { createContext, useContext, useState, useEffect } from "react";

type ActiveTabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(
  undefined
);

const STORAGE_KEY = "farmchain:activeTab";

export const ActiveTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // DO NOT read localStorage during render — use a stable default so server & client markup match
  const [activeTab, setActiveTabState] = useState<string>(() => {
    return "Dashboard"; // default tab
  });

  // read persisted value after mount (client-only) to avoid hydration mismatch
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (typeof v === "string" && v !== activeTab) {
        setActiveTabState(v);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // write to storage whenever activeTab changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, activeTab);
    } catch {
      /* ignore storage errors */
    }
  }, [activeTab]);

  // keep in sync if user changes tab in another window
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && typeof e.newValue === "string") {
        setActiveTabState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setActiveTab = (tab: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, tab);
    } catch {
      /* ignore */
    }
    setActiveTabState(tab);
  };

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => {
  const ctx = useContext(ActiveTabContext);
  if (!ctx) throw new Error("useActiveTab must be used within ActiveTabProvider");
  return ctx;
};
// ...existing code...