'use client';
import React from "react";
import { Suspense, useState } from 'react'
import BuildDraftTables from "./draftTables";
import { useLeague } from "@/app/context/LeagueContext";
import MenuButton from "@/app/components/Navbar";
import { ButtonGroup, Button } from "react-bootstrap";

export default function DraftPage({ params }) {
  //const draftData = await BuildDraftTables(params.slug);
  const { leagueStandings } = useLeague();

  const [displayOption, setDisplayOption] = useState(0);
  const buttons = [
    { name: "Draft Day", value: 0},
    { name: "Current Roster", value: 1}
  ];

  return (
    <main>

      <section className="d-flex justify-content-center align-items-center ">
        <div className="desktop-button-bar mx-auto">
          <ButtonGroup className="flex-wrap padding-5px" style={{ padding: "5px", backgroundColor: "#335425" }}>
            {buttons.map((num) => (
              <Button
                key={num.name}
                variant={num.value == displayOption ? "primary" : "secondary"}
                onClick={() => setDisplayOption(num.value)}
              >
              {num.name}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </section>
      <section className="draftPicks">
          <Suspense fallback={<h2 className="chartTitle">Evaluating the Playbook...</h2>}>
          <BuildDraftTables 
            slug={params.slug} 
            leagueStandings={leagueStandings}
            displayOption={displayOption}
          />
          </Suspense>
      </section>
    </main>
  );
}