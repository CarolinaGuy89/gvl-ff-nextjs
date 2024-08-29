'use client'
import React from "react";
import { Suspense } from 'react'

import MenuButton from "@/app/components/Navbar";

export default function Home({ params }) {
  
  return (
    <main>


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
