'use client'
import React from "react";
import { Suspense, useState } from 'react'
import BuildMatchups from "./matchup";
import MenuButton from "@/app/components/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from "react-bootstrap";
import calculateDefaultWeek from "@/app/api/calcCurrentWeek";

export default function Home({ params }) {

  let currWeek = calculateDefaultWeek()

  const [selectedWeek, setSelectedWeek] = useState(currWeek);

  const handleSelect = (eventKey) => {
    let key = eventKey.replace("#","")
    setSelectedWeek(key);
};

  let num;
  const buttons = Array.from({ length: 18 }, (_, index) => index + 1);

  return (
    <main>
        <section className="week">
        <DropdownButton
              as={ButtonGroup}
              key="start"
              id="weekSelector"
              drop="start"

              title="Week"
              onSelect={handleSelect}
              data-bs-theme="dark"
              className="weekSelector"
            >
                {buttons.map((num) => (
                    <Dropdown.Item key={num} href={`#${num}`}>Week: {num}</Dropdown.Item>
                ))}

            </DropdownButton>
      </section>

      <section className="chartMatchup">
        <Suspense fallback={<h2 className="chartTitle">Evaluating the Playbook...</h2>}>
          <BuildMatchups slug={params.slug} weekNum={selectedWeek}/>
        </Suspense>
      </section>
    </main>
  );
}
