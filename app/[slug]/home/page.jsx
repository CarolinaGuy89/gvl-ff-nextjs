'use client'
import React from "react";
import { Suspense } from 'react'
import  BuildStandings from './leagueStandings'

const labelsMap = {
  gvl: "G-Vegas",
  it: "Logistically, IT's complicated",
  family: "League of Family Drama",
  hockey: "Full Contact Turf Hockey",
}

export default function LeagueOverview({ params }) {

  return (
    <main className="grid grid-cols-3 gap-1 lg:grid-cols-5 lg:gap-4">
      <section className="mx-2 text-3xl col-start-1 col-span-2 lg:col-start-2 lg:col-span-2 ...">
        {labelsMap[params.slug]}<br />
        <p className="text-xs">Fantasy Football stats</p>
      </section>
      <section className="col-start-3 lg:col-start-4  ...">
        Future button
      </section>
      <h1 className="mx-2 col-span-3 justify-items-center">Current League Standings</h1>
        <section className=" justify-center col-start-1 col-span-3 lg:col-start-2 ...">
          <Suspense fallback={<p>Undergoing officals review...</p>}>
            <BuildStandings slug={params.slug} />
          </Suspense>
        </section>
      {/* <LeagueStandings /> */}
    </main>
  )
}