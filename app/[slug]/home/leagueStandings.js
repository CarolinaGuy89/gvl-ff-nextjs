// import draftData from '../../api/gvl-draft2023.json'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { getLeagueStandings } from "../../api/newApiFetch";

export async function BuildStandings() {
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

    const leagueStandings = getLeagueStandings();

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




