'use client'
import React from "react";
import { Suspense } from 'react'
import BuildStandings from './leagueStandings'

const labelsMap = {
  gvl: "G-Vegas",
  it: "Logistically, IT's complicated",
  family: "League of Family Drama",
  hockey: "Full Contact Turf Hockey",
}

export default function LeagueOverview({ params }) {

  return (
    <main>
      <section>
        {labelsMap[params.slug]}<br />
        <p className="text-xs">Fantasy Football stats</p>
      </section>

      <section>
        Future button
      </section >

      <section>
        <h1>Current League Standings</h1>
      </section>

      <section>
        <Suspense fallback={<p>Undergoing officals review...</p>}>
          <BuildStandings slug={params.slug} />
        </Suspense>
      </section>
      {/* <LeagueStandings /> */}
    </main>
  )
}