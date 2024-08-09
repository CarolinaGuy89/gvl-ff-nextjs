'use client'
import { useState } from "react";
import {Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {ChevronDownIcon} from './ChevronDownIcon';

export default function App() {
  const [selectedOption, setSelectedOption] = useState(new Set(["gvl"]));



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
    hockey: 1335739020
  }


  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <body>
    <ButtonGroup variant="faded" radius="sm" className="justify-right">
      <Button className="text-slate-700">{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px] text-slate-700"
        >
          <DropdownItem key="gvl" href="/gvl/home" /*description={descriptionsMap["merge"]}*/>
            {labelsMap["gvl"]}
          </DropdownItem>
          <DropdownItem key="it" href="/it/home"/*description={descriptionsMap["squash"]}*/>
            {labelsMap["it"]}
          </DropdownItem>
          <DropdownItem key="family" href="/family/home"/*description={descriptionsMap["rebase"]}*/>
            {labelsMap["family"]}
          </DropdownItem>
          <DropdownItem key="hockey" href="/hockey/home" /*description={descriptionsMap["rebase"]}*/>
            {labelsMap["hockey"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
    </body>
  );
}
