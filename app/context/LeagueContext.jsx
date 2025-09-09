"use client";
import { createContext, useContext } from "react";

const LeagueContext = createContext();

export function LeagueProvider({ value, children }) {
  return (
    <LeagueContext.Provider value={value}>
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  return useContext(LeagueContext);
}