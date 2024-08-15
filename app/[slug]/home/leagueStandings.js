// import draftData from '../../api/gvl-draft2023.json'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import getLeagueStandings from "../../api/newApiFetch";
import getLeagueSettings from "../../api/leagueConfig";

export default async function BuildStandings({ slug }) {
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

    // Define the headers array
    const tableHeaders = [
        'Rank',
        'GM',
        'Team Name',
        'Record',
        'PF',
    ];

    const leagueStandings = await getLeagueStandings(leagueValues[slug]);
    const s = getLeagueSettings(leagueValues[slug]);

    const transformedStandings = leagueStandings.map((t) => ({
        ...t,
        rowData: [
            t.leagueLocalRank,
            t.owner,
            t.teamName,
            `${t.wins} - ${t.losses}`,
            t.pointsFor,
        ],
    }));

    return (
        <table className='text-sm ring-2 rounded-lg ring-slate-300'>
            <thead>
                <tr className="">
                    {tableHeaders.map((header, idx) => (
                        <th key={idx}
                            className="rounded-lg bg-black/55">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-black/35 rounded-lg">
                {transformedStandings.map((t) => (
                    <tr key={t.id}>
                        {t.rowData.map((data, idx) => (
                            <td key={idx} className="py-1">{data}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}