'use client'
import PlayerPreformanceChart from "./playerChart";
import React from "react";

export default function Home({ params }) {

  return (
    <main>
          <PlayerPreformanceChart slug={params.slug} teamId={params.team}/>
    </main>
  );
}