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
    //  'PA', 
    //  '∆', 
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
            //  t.pointsAgainst, 
            // `${(t.pointsFor - t.pointsAgainst).toFixed(2)}` 
        ],
    }));

    return (
        <section>
            <table className='text-sm ring-2 mx-2 rounded-lg ring-slate-400 text-left'>
                <thead className='ring-2 ring-white'>
                    <tr className="">
                    {tableHeaders.map((header, idx) => (
                        <th key={idx}
                        className="bg-black/55">{header}</th>
                    ))}
                    </tr>
                </thead>
                <tbody className="bg-black/35 space-x-0.5"> 
                {transformedStandings.map((t) => (
                    <tr key={t.id}>
                        {t.rowData.map((data, idx) => (
                            <td key={idx}>{data}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </section>
            )
            }



            // .leagueStandings {
            //     background-color: rgba(255, 255, 255, .6);
            //     border-radius: 10px;
            //     padding: 10px;
            //     margin: 0.5rem;
            //     box-shadow: .25rem .25rem .5rem .5rem #00000090;
            //     color:black;
            //     width: calc(100vw - 1rem);
            //     text-align: center;
                
            //   }