'use client'
import React from "react";
import { Suspense, useState } from 'react'
import BuildMatchups from "./matchup";
import MenuButton from "@/app/components/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from "react-bootstrap";

export default function Home({ params }) {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const handleSelect = (eventKey) => {
    setSelectedWeek(eventKey);
};

  const labelsMap = {
    gvl: "G-Vegas",
    it: "Logistically, IT's complicated",
    family: "League of Family Drama",
    hockey: "Full Contact Turf Hockey",
  }
  let num;
  const buttons = Array.from({ length: 18 }, (_, index) => index + 1);

  return (
    <main>
      <section className="pageTitle">
        <h1>{labelsMap[params.slug]}<br /></h1>
        <MenuButton slug={[params.slug]} />
        <h6>Fantasy Football stats</h6>
        <section>
        <DropdownButton
              as={ButtonGroup}
              key="start"
              id={`dropdown-button-drop-start`}
              drop="start"
              variant="secondary"
              title="Week"
              onSelect={handleSelect}
            >
                {buttons.map((num) => (
                    <Dropdown.Item eventKey={num} href={`#${num}`}>Week: {num}</Dropdown.Item>
                ))}

            </DropdownButton>
      </section>
      </section>

      <hr />



      <section className="chartMatchup">
        <Suspense fallback={<h2 className="chartTitle">Evaluating the Playbook...</h2>}>
          <BuildMatchups slug={params.slug} weekNum={selectedWeek} suppressHydrationWarning />
        </Suspense>
      </section>
    </main>
  );
}
