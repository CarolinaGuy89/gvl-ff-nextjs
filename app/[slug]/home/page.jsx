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
    <main>
      <a className="flex min-h-screen flex-col items-center">
        My slug: {params.slug} <br />
        My labelsmap: {labelsMap[params.slug]}<br />
        <section>
          <Suspense fallback={<p>Undergoing officals review...</p>}>
            <BuildStandings slug={params.slug} />
          </Suspense>
        </section>
      </a>
      {/* <LeagueStandings /> */}
    </main>
  )
}