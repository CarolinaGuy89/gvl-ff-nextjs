import React from "react";
import BuildStandings from './leagueStandings'

export default function LeagueOverview({ params }) {

  return (
    <main>
      <hr />

      <section>
        <h2 className="chartTitle">Current League Standings</h2>
      </section>

      <section className="chartStandings">
          <BuildStandings slug={params.slug} />
      </section>
    </main>
  )
}