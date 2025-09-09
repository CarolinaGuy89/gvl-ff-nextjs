"use client";
import React from "react";
import BuildStandings from "./leagueStandings";
import { useLeague } from "@/app/context/LeagueContext";

export default function LeagueOverview() {
  const { leagueStandings } = useLeague();
  return (
    <main>
      <hr />
      <section>
        <h2 className="chartTitle">Current League Standings</h2>
      </section>
      <section className="chartStandings">
        <BuildStandings slug={leagueStandings} />
      </section>
    </main>
  );
}

// import React from "react";
// import BuildStandings from './leagueStandings'

// export default function LeagueOverview({ params }) {

//   return (
//     <main>
//       <hr />

//       <section>
//         <h2 className="chartTitle">Current League Standings</h2>
//       </section>

//       <section className="chartStandings">
//           <BuildStandings slug={params.slug} />
//       </section>
//     </main>
//   )
// }