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
        <h1>{labelsMap[params.slug]}<br /></h1>
        <h6>Fantasy Football stats</h6>
      </section>

      <hr />

      <section>
        <h2 className="chartTitle">Current League Standings</h2>
      </section>

      <section>
        <Suspense fallback={<h2 className="chartTitle">Undergoing officals review...</h2>}>
          <BuildStandings slug={params.slug} />
        </Suspense>
      </section>
    </main>
  )
}