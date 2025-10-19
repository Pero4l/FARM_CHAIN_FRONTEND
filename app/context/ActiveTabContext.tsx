'use client'

import React, { createContext, useContext, useState } from "react";

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
  const [activeTab, setActiveTab] = useState<string>("dashboard");
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