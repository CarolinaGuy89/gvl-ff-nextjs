'use client'
import React from "react";
import { Suspense } from 'react'
import BuildStandings from './leagueStandings'
import MenuButton from "@/app/components/Navbar";

export default function LeagueOverview({ params }) {

  return (
    <main>
      <hr />

      <section>
        <h2 className="chartTitle">Current League Standings</h2>
      </section>

      <section className="chartStandings">
        <Suspense fallback={<h2 className="chartTitle">Undergoing officals review...</h2>}>
          <BuildStandings slug={params.slug} />
        </Suspense>
      </section>
    </main>
  )
}