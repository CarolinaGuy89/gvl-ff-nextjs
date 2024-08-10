'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
//import { getLeagueStandings } from '../../api/apiFetch'
import { Suspense } from 'react'
import { BuildStandings } from './leagueStandings'

const labelsMap = {
  gvl: "G-Vegas",
  it: "Logistically, IT's complicated",
  family: "League of Family Drama",
  hockey: "Full Contact Turf Hockey",
}

const leagueValues = {
  gvl: 1248073066,
  it: 601844230,
  family: 283159008,
  hockey: 1335739020,
}

// const columns = [
//   {
//     key: "playoffSeed",
//     label: "Rank",
//   },
//   {
//     key: "ownerName",
//     label: "GM",
//   },
//   {
//     key: "name",
//     label: "Team Name",
//   },
//   {
//     key: "wins",
//     label: "W",
//   },
//   {
//     key: "losses",
//     label: "L",
//   },
//   {
//     key: "regularSeasonPointsFor",
//     label: "Points For",
//   },
// ];

export default function LeagueOverview({ params }) {

  return (
    <main>
      <a className="flex min-h-screen flex-col items-center">
        My slug: {params.slug} <br />
        My labelsmap: {labelsMap[params.slug]}<br />
        My leagueValues:  {leagueValues[params.slug]}<br />
        <section>
          <Suspense fallback={<p>Loading feed...</p>}>
            <BuildStandings />
          </Suspense>
        </section>
      </a>
      {/* <LeagueStandings /> */}
    </main>
  )
}