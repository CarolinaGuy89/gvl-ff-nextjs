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
    <main className="grid grid-cols-3 gap-1">
      <section className="mx-2 text-3xl col-start-1 col-span-2">
        {labelsMap[params.slug]}<br />
        <p className="text-xs">Fantasy Football stats</p>
      </section>

      <section className="col-start-3 lg:col-start-4 ">
        Future button
      </section >

      <section className="col-span-3 flex justify-center items-center">
        <h1 className="text-center py-1">Current League Standings</h1>
      </section>

      <section className="mx-2 col-span-3 flex justify-center items-center">
        <Suspense fallback={<p>Undergoing officals review...</p>}>
          <BuildStandings slug={params.slug} />
        </Suspense>
      </section>
      {/* <LeagueStandings /> */}
    </main>
  )
}