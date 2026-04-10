"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type FocusArea = "sidebar" | "content" | null;

interface FocusContextType {
  focusedArea: FocusArea;
  setFocusedArea: (area: FocusArea) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
  const [focusedArea, setFocusedArea] = useState<FocusArea>(null);

  return (
    <FocusContext.Provider value={{ focusedArea, setFocusedArea }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error("useFocus must be used within a FocusProvider");
  }
  return context;
};
