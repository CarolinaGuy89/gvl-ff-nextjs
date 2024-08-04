'use client'
import { useState } from "react";
import LeagueSelect from '../../components/leagueselect'

const labelsMap = {
  gvl: "G-Vegas",
  it: "Logistically, IT's complicated",
  family: "League of Family Drama",
  hockey: "Full Contact Turf Hockey",
}

const leagueValues = {
  gvl: 1248073066,
  it: 601844230,
  family: 283159008,
  hockey: 1335739020,
}

export default function Page({ params }) {
  const [selectedOption, setSelectedOption] = useState(new Set([params.slug]));


    return (
    <main>
      <div className="flex min-h-screen flex-col items-center">
        My slug: {params.slug} <br />
        My labelsmap: {labelsMap[params.slug]}<br />
        My leagueValues:  {leagueValues[params.slug]}<br />
      </div>
    </main>
  )
}