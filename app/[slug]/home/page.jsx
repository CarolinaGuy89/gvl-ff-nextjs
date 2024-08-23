'use client'
import React from "react";
import { Suspense } from 'react'
import BuildStandings from './leagueStandings'
import MenuButton from "@/app/components/Navbar";


const labelsMap = {
  gvl: "G-Vegas",
  it: "Logistically, IT's complicated",
  family: "League of Family Drama",
  hockey: "Full Contact Turf Hockey",
}

export default function LeagueOverview({ params }) {

  return (
    <main>


      <section className="pageTitle">
        <h1>{labelsMap[params.slug]}<br /></h1>
        <MenuButton slug={[params.slug]} />

      </section>
      <h6>Fantasy Football stats</h6>
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