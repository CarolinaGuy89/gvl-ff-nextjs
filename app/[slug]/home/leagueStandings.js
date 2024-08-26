// import draftData from '../../api/gvl-draft2023.json'
import getLeagueStandings from "../../api/newApiFetch";

export default async function BuildStandings({ slug }) {
    const leagueValues = {
        gvl: 1248073066,
        it: 601844230,
        family: 283159008,
        hockey: 1335739020,
    }

    // console.log('Received slug:', slug);
    // console.log('Received slug:', leagueValues[slug]);
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
    // const leagueStandings = [
    //     {
    //         "id": 5,
    //         "abbreviation": "MR-S",
    //         "logoURL": "https://pbs.twimg.com/profile_images/1183182627534188548/XfEs405J_400x400.jpg",
    //         "draftDayProjectedRank": 9,
    //         "teamName": "Mr. Schnitzel",
    //         "regularSeasonStanding": 1,
    //         "postSeasonRanking": 1,
    //         "pointsAgainst": "1676",
    //         "pointsFor": "1986",
    //         "wins": 10,
    //         "losses": 4,
    //         "streakLength": 2,
    //         "streakType": "WIN",
    //         "owner": "Ryan",
    //         "winPercentage": 71.42857142857143,
    //         "preSeasonRank": 9,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 0,
    //         "leagueLocalRank": 1
    //     },
    //     {
    //         "id": 2,
    //         "abbreviation": "TIB",
    //         "logoURL": "https://www.pngkit.com/png/detail/214-2140315_buzz-flying-flying-buzz-lightyear-png.png",
    //         "draftDayProjectedRank": 5,
    //         "teamName": "To Infinity and Bijan",
    //         "regularSeasonStanding": 2,
    //         "postSeasonRanking": 2,
    //         "pointsAgainst": "1636",
    //         "pointsFor": "1729",
    //         "wins": 8,
    //         "losses": 6,
    //         "streakLength": 1,
    //         "streakType": "WIN",
    //         "owner": "Alex ",
    //         "winPercentage": 57.14285714285714,
    //         "preSeasonRank": 5,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 2,
    //         "leagueLocalRank": 2
    //     },
    //     {
    //         "id": 4,
    //         "abbreviation": "MCCA",
    //         "logoURL": "https://st2.depositphotos.com/1028735/47228/v/1600/depositphotos_472284648-stock-illustration-animation-color-portrait-ancient-egyptian.jpg",
    //         "draftDayProjectedRank": 7,
    //         "teamName": "Priesthood of Amon Ra",
    //         "regularSeasonStanding": 5,
    //         "postSeasonRanking": 3,
    //         "pointsAgainst": "1677",
    //         "pointsFor": "1619",
    //         "wins": 8,
    //         "losses": 6,
    //         "streakLength": 5,
    //         "streakType": "WIN",
    //         "owner": "Matt",
    //         "winPercentage": 57.14285714285714,
    //         "preSeasonRank": 7,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 2,
    //         "leagueLocalRank": 3
    //     },
    //     {
    //         "id": 8,
    //         "abbreviation": "BONn",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/core/AnimalHeads/animal_heads-15.svg",
    //         "draftDayProjectedRank": 4,
    //         "teamName": "Simpsonville CreativeMascots",
    //         "regularSeasonStanding": 6,
    //         "postSeasonRanking": 4,
    //         "pointsAgainst": "1719",
    //         "pointsFor": "1671",
    //         "wins": 7,
    //         "losses": 7,
    //         "streakLength": 1,
    //         "streakType": "LOSS",
    //         "owner": "Cale",
    //         "winPercentage": 50,
    //         "preSeasonRank": 4,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 3,
    //         "leagueLocalRank": 4
    //     },
    //     {
    //         "id": 9,
    //         "abbreviation": "KYW3",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/core/Solo/ESPN_Star_Wars_Mil_Falcon-01.svg",
    //         "draftDayProjectedRank": 3,
    //         "teamName": "Rise of Ky Walker pt 3",
    //         "regularSeasonStanding": 3,
    //         "postSeasonRanking": 5,
    //         "pointsAgainst": "1753",
    //         "pointsFor": "1885",
    //         "wins": 9,
    //         "losses": 5,
    //         "streakLength": 5,
    //         "streakType": "WIN",
    //         "owner": "Marty",
    //         "winPercentage": 64.28571428571429,
    //         "preSeasonRank": 3,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 1,
    //         "leagueLocalRank": 5
    //     },
    //     {
    //         "id": 3,
    //         "abbreviation": "??",
    //         "logoURL": "https://media.tenor.com/rUa8MTSuXFEAAAAC/who-cares.gif",
    //         "draftDayProjectedRank": 10,
    //         "teamName": "shrug emoji",
    //         "regularSeasonStanding": 4,
    //         "postSeasonRanking": 6,
    //         "pointsAgainst": "1617",
    //         "pointsFor": "1734",
    //         "wins": 8,
    //         "losses": 6,
    //         "streakLength": 2,
    //         "streakType": "LOSS",
    //         "owner": "Arthur",
    //         "winPercentage": 57.14285714285714,
    //         "preSeasonRank": 10,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 2,
    //         "leagueLocalRank": 6
    //     },
    //     {
    //         "id": 1,
    //         "abbreviation": "MrBB",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/ffl/SmackTalk-LeoEspinosa/Boom-10.svg",
    //         "draftDayProjectedRank": 1,
    //         "teamName": "Mr. Boom/Bust-ic",
    //         "regularSeasonStanding": 7,
    //         "postSeasonRanking": 10,
    //         "pointsAgainst": "1681",
    //         "pointsFor": "1587",
    //         "wins": 7,
    //         "losses": 7,
    //         "streakLength": 3,
    //         "streakType": "LOSS",
    //         "owner": "Sam",
    //         "winPercentage": 50,
    //         "preSeasonRank": 1,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 3,
    //         "leagueLocalRank": 7
    //     },
    //     {
    //         "id": 6,
    //         "abbreviation": "Arrg",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/ffl/BoneHeads-ToddDetwiler/BoneHeads-08b.svg",
    //         "draftDayProjectedRank": 2,
    //         "teamName": "Thielen your Money",
    //         "regularSeasonStanding": 8,
    //         "postSeasonRanking": 9,
    //         "pointsAgainst": "1811",
    //         "pointsFor": "1653",
    //         "wins": 6,
    //         "losses": 8,
    //         "streakLength": 2,
    //         "streakType": "WIN",
    //         "owner": "Steven",
    //         "winPercentage": 42.857142857142854,
    //         "preSeasonRank": 2,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 4,
    //         "leagueLocalRank": 8
    //     },
    //     {
    //         "id": 7,
    //         "abbreviation": "EUBA",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/core/StadiumFoods-ESPN/stadium-foods_hot-dog.svg",
    //         "draftDayProjectedRank": 6,
    //         "teamName": "Insert Name Change",
    //         "regularSeasonStanding": 9,
    //         "postSeasonRanking": 7,
    //         "pointsAgainst": "1795",
    //         "pointsFor": "1633",
    //         "wins": 4,
    //         "losses": 10,
    //         "streakLength": 5,
    //         "streakType": "LOSS",
    //         "owner": "Cody",
    //         "winPercentage": 28.57142857142857,
    //         "preSeasonRank": 6,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 6,
    //         "leagueLocalRank": 9
    //     },
    //     {
    //         "id": 10,
    //         "abbreviation": "CaSh",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/ffl/CrazyHelmets-ToddDetwiler/Helmets_05.svg",
    //         "draftDayProjectedRank": 8,
    //         "teamName": "The Caddy Shack",
    //         "regularSeasonStanding": 10,
    //         "postSeasonRanking": 8,
    //         "pointsAgainst": "1583",
    //         "pointsFor": "1451",
    //         "wins": 3,
    //         "losses": 11,
    //         "streakLength": 2,
    //         "streakType": "LOSS",
    //         "owner": "Russ",
    //         "winPercentage": 21.428571428571427,
    //         "preSeasonRank": 8,
    //         "currentProjectedRank": 0,
    //         "gamesBack": 7,
    //         "leagueLocalRank": 10
    //     }
    // ]

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