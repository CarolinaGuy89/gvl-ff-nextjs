'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
//import { getLeagueStandings } from '../../api/apiFetch'
import {getLeagueStandings} from '../../api/newApiFetch'


// import draftData from '../../api/gvl-draft2023.json'

let leagueStandings = getLeagueStandings();

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

//sort by totalpoints desc then playoffSeed Asc
leagueStandings.sort((a, b) => b.totalPointsScored - a.totalPointsScored);
leagueStandings.sort((a, b) => a.playoffSeed - b.playoffSeed);

const columns = [
  {
    key: "playoffSeed",
    label: "Rank",
  },
  {
    key: "ownerName",
    label: "GM",
  },
  {
    key: "name",
    label: "Team Name",
  },
  {
    key: "wins",
    label: "W",
  },
  {
    key: "losses",
    label: "L",
  },
  {
    key: "regularSeasonPointsFor",
    label: "Points For",
  },
];

export default function LeagueOverview({ params }) {
  //const [selectedOption, setSelectedOption] = useState(new Set([params.slug]));
  // console.log("just before")
  // var data = await getLeagueStandings()
  // console.log("just after",data)
  //console.log(data.draftPicks[0]);
  //fs.writeFileSync(`./src/data/AllPlayers${season}.json`, playersInfo)
  return (
    <main>
      <a className="flex min-h-screen flex-col items-center">
        My slug: {params.slug} <br />
        My labelsmap: {labelsMap[params.slug]}<br />
        My leagueValues:  {leagueValues[params.slug]}<br />
        <b className="leagueStandingsTable" >
          <Table onSortChange={leagueStandings.sort}>
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key} allowsSorting>{column.label} </TableColumn>}
            </TableHeader>
            <TableBody items={leagueStandings}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => <TableCell className="text-slate-700">{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </b>
      </a>
      {/* <LeagueStandings /> */}
    </main>
  )
}