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
      <section className="col-start-1 col-span-2 lg:col-start-2 lg:col-span-2 ...">
        My slug: {params.slug} <br />
        My labelsmap: {labelsMap[params.slug]}<br />
      </section>
      <section className="col-start-3 lg:col-start-4  ...">
        button
      </section>
        <section className="col-start-1 col-span-3 lg:col-start-2 ...">
          <Suspense fallback={<p>Undergoing officals review...</p>}>
            <BuildStandings slug={params.slug} />
          </Suspense>
        </section>
      {/* <LeagueStandings /> */}
    </main>
  )
}