'use client'
import React from "react";
import { Suspense } from 'react'

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
        <h2 className="chartTitle">House Rules</h2>
      </section>

      <section className="chartTeamPreformance">
      <h6>Final Season standings:</h6>
      <ol type="1">
      <li>If you make playoffs, your final ranking is decided by the playoff bracket, otherwise end of regular season.</li>
      </ol>

      </section>
    </main>
  );
}
