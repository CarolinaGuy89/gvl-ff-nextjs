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
      </section>
      <h6>Fantasy Football stats</h6>
      <hr />

      <section>
        <h2 className="chartTitle">Team Preformance</h2>
      </section>

      <section className="chartTeamPreformance">
      <p>If you see this, it's working. coming soon.</p>
      </section>
    </main>
  );
}
