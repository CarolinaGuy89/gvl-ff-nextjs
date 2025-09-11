'use client'
import React from "react";
import { Suspense } from 'react'
import { useLeague } from "@/app/context/LeagueContext";

import MenuButton from "@/app/components/Navbar";

export default function Home({ params }) {
  const { leagueStandings } = useLeague();
  
  return (
    <main>

      <section>
        <h2 className="chartTitle">Infected Players</h2>
      </section>

      <section className="chartTeamPreformance">
      <p>If you see this, it is working. Coming soon.</p>
      </section>
    </main>
  );
}
