"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ActiveTabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(
  undefined
);

export const ActiveTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Read from localStorage synchronously on first client render to avoid flashing back to default
  const [activeTab, setActiveTabState] = useState<string>(() => {
    try {
      return typeof window !== "undefined"
        ? localStorage.getItem("activeTab") ?? "dashboard"
        : "dashboard";
    } catch {
      return "dashboard";
    }
  });

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    try {
      localStorage.setItem("activeTab", tab);
    } catch {}
  };

  // optional: always scroll to top when tab changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

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