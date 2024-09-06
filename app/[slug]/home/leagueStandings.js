import getLeagueStandings from "../../api/newApiFetch";

export default async function BuildStandings({ slug }) {
    const leagueValues = {
        gvl: 1248073066,
        it: 601844230,
        family: 283159008,
        hockey: 1335739020,
    }

    // Define the headers array
    const tableHeaders = [
        'Rank',
        'GM',
        'Team Name',
        'Record',
        'PF',
    ];

    //Fetch data
    const leagueStandings = await getLeagueStandings(leagueValues[slug]);

    //Map the data for each row
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
        <table>
            <thead>
                <tr>
                    {tableHeaders.map((header, idx) => (
                        <th key={idx}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {transformedStandings.map((t) => (
                    <tr key={t.id}>
                        {t.rowData.map((data, idx) => (
                            <td key={idx}>{data}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}