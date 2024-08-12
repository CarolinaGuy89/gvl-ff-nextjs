// import draftData from '../../api/gvl-draft2023.json'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import getLeagueStandings from "../../api/newApiFetch";

export default async function BuildStandings( {slug} ) {
    const leagueValues = {
        gvl: 1248073066,
        it: 601844230,
        family: 283159008,
        hockey: 1335739020,
      }
      console.log('Received slug:', slug);
      console.log('Received slug:', leagueValues[slug]);
    const columns = [
        {
            key: "leagueLocalRank",
            label: "Rank",
        },
        {
            key: "owner",
            label: "GM",
        },
        {
            key: "teamName",
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
            key: "pointsFor",
            label: "Points For",
        },
    ];

    const leagueStandings = await getLeagueStandings(leagueValues[slug]);

    return (
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
    )
}




