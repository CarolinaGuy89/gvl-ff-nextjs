"use client";
import React from "react";
import { Suspense } from 'react'
import BuildDraftTables from "./draftTables";
import { useLeague } from "@/app/context/LeagueContext";
import MenuButton from "@/app/components/Navbar";

export default async function DraftPage({ params }) {
  //const draftData = await BuildDraftTables(params.slug);
  const { leagueStandings } = useLeague();
  return (
      <section className="draftPicks">
          <BuildDraftTables 
            slug={params.slug} 
            leagueStandings={leagueStandings}
          />
      </section>
  );
}