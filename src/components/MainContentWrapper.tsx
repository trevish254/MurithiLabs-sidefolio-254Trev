"use client";

import React from "react";
import { useFocus } from "@/context/FocusContext";
import { Navbar } from "@/components/Navbar";

export const MainContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const { focusedArea, setFocusedArea } = useFocus();

  return (
    <div 
      onMouseEnter={() => setFocusedArea("content")}
      onMouseLeave={() => setFocusedArea(null)}
      className={`flex-1 flex flex-col min-h-screen bg-black relative transition-all duration-700 ease-in-out ${focusedArea === "sidebar" ? "opacity-30 scale-[0.985] blur-[1px]" : "opacity-100 scale-100 blur-0"}`}
      style={{ transformOrigin: "left center" }}
    >
      <Navbar />
      <div id="main-scroll" className="w-full relative pb-24 pt-16 overflow-x-hidden overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
};
