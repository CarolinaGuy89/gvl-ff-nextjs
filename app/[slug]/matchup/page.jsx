'use client'
import React from "react";
import { Suspense } from 'react'
import BuildMatchups from "./matchup";
import MenuButton from "@/app/components/Navbar";

export default function Home({ params }) {

  const labelsMap = {
    gvl: "G-Vegas",
    it: "Logistically, IT's complicated",
    family: "League of Family Drama",
    hockey: "Full Contact Turf Hockey",
  }
  
  return (
    <main>
      <section className="pageTitle">
        <h1>{labelsMap[params.slug]}<br /></h1>
        <MenuButton slug={[params.slug]} />
        <h6>Fantasy Football stats</h6>
      </section>

      <hr />

      <section>
        <h2 className="chartTitle">Weekly Matchup</h2>
      </section>

      <section className="chartMatchup">
        <Suspense fallback={<h2 className="chartTitle">Evaluating the Playbook...</h2>}>
          <BuildMatchups slug={params.slug} suppressHydrationWarning />
        </Suspense>
      </section>
    </main>
  );
}
