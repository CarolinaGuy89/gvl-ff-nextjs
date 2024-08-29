'use client'
import React from "react";
import { Suspense } from 'react'

import MenuButton from "@/app/components/Navbar";

export default function Home({ params }) {
  
  return (
    <main>

      <section>
        <h2 className="chartTitle">Team Preformance</h2>
      </section>

      <section className="chartTeamPreformance">
      <p>If you see this, it is working. Coming soon.</p>
      </section>
    </main>
  );
}
