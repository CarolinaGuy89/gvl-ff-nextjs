'use client'
import { useState } from "react";
import {Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {ChevronDownIcon} from './ChevronDownIcon';

export default function App() {
  const [selectedOption, setSelectedOption] = useState("gvl");

  const labelsMap = {
    gvl: "G-Vegas",
    it: "Logistically, IT's complicated",
    family: "League of Family Drama",
    hockey: "Full Contact Turf Hockey",
  }

  const selectedOptionValue = Array.from(selectedOption)[0];
console.log(selectedOption)
  return (
    <body>
    <ButtonGroup variant="solid" radius="lg">
      <Button className="text-slate-300">{labelsMap[selectedOption]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Select a League"
          selectedKeys={labelsMap.selectedOption}
          selectionMode="single"
          onSelectionChange={new Set([setSelectedOption])}
          className="max-w-[300px]"
        >
          <DropdownItem key="gvl" href="/gvl/home">
            {labelsMap["gvl"]}
          </DropdownItem>
          <DropdownItem key="it" href="/it/home">
            {labelsMap["it"]}
          </DropdownItem>
          <DropdownItem key="family" href="/family/home">
            {labelsMap["family"]}
          </DropdownItem>
          <DropdownItem key="hockey" href="/hockey/home">
            {labelsMap["hockey"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
    </body>
  );
}
