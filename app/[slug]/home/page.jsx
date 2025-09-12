"use client";
import React from "react";
import BuildStandings from "./leagueStandings";
import { useLeague } from "@/app/context/LeagueContext";
import infectedData from "@/app/components/infectedPlayers.json";

export default function LeagueOverview({params}) {
  const slug = params.slug
  const { leagueStandings } = useLeague();
  const players = infectedData.infectedPlayers
  return (
    <main   className={`leagueHome ${
    slug === "gvl" ? "with-infected" : "single-center"
  }`}>
      <hr />
      <section className="leagueStandings">
        <h2 className="chartTitle">Current League Standings</h2>
        <div className="chartStandings">
          <BuildStandings slug={leagueStandings} />
        </div>
      </section>
      
      {slug === "gvl" && (
      <section className="infectedPlayers">

          <h2 className="chartTitle">Infected Players</h2>
          <div className="infectedChart">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Infected Player</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(players).map(([week, player]) => (
                <tr key={week}>
                  <td>{week}</td>
                  <td>
                    {player || "—"} {/* show dash if empty */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      )}
    </main>
  );
}