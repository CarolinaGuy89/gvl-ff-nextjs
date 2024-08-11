// import draftData from '../../api/gvl-draft2023.json'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { getLeagueStandings } from "../../api/newApiFetch";

export async function BuildStandings() {
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
    // const leagueStandings = [
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 1,
    //         "abbreviation": "MrBB",
    //         "name": "Mr. Boom/Bust-ic",
    //         "ownerName": "Sam Murry",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/ffl/SmackTalk-LeoEspinosa/Boom-10.svg",
    //         "wins": 7,
    //         "losses": 7,
    //         "ties": 0,
    //         "totalPointsScored": 1586.76,
    //         "regularSeasonPointsFor": 1586.76,
    //         "regularSeasonPointsAgainst": 1681.44,
    //         "winningPercentage": 50,
    //         "playoffSeed": 7,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 2,
    //         "abbreviation": "TIB",
    //         "name": "To Infinity and Bijan",
    //         "ownerName": "Alex Cooper",
    //         "logoURL": "https://www.pngkit.com/png/detail/214-2140315_buzz-flying-flying-buzz-lightyear-png.png",
    //         "wins": 8,
    //         "losses": 6,
    //         "ties": 0,
    //         "totalPointsScored": 1729.02,
    //         "regularSeasonPointsFor": 1729.02,
    //         "regularSeasonPointsAgainst": 1635.5799999999997,
    //         "winningPercentage": 57.14,
    //         "playoffSeed": 2,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 3,
    //         "abbreviation": "??",
    //         "name": "shrug emoji",
    //         "ownerName": "Arthur Simmons",
    //         "logoURL": "https://media.tenor.com/rUa8MTSuXFEAAAAC/who-cares.gif",
    //         "wins": 8,
    //         "losses": 6,
    //         "ties": 0,
    //         "totalPointsScored": 1734.24,
    //         "regularSeasonPointsFor": 1734.24,
    //         "regularSeasonPointsAgainst": 1616.74,
    //         "winningPercentage": 57.14,
    //         "playoffSeed": 4,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 4,
    //         "abbreviation": "MCCA",
    //         "name": "Priesthood of Amon Ra",
    //         "ownerName": "Matt McCarthy",
    //         "logoURL": "https://st2.depositphotos.com/1028735/47228/v/1600/depositphotos_472284648-stock-illustration-animation-color-portrait-ancient-egyptian.jpg",
    //         "wins": 8,
    //         "losses": 6,
    //         "ties": 0,
    //         "totalPointsScored": 1618.86,
    //         "regularSeasonPointsFor": 1618.86,
    //         "regularSeasonPointsAgainst": 1676.56,
    //         "winningPercentage": 57.14,
    //         "playoffSeed": 5,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 5,
    //         "abbreviation": "MR-S",
    //         "name": "Mr. Schnitzel",
    //         "ownerName": "Ryan Lambert",
    //         "logoURL": "https://pbs.twimg.com/profile_images/1183182627534188548/XfEs405J_400x400.jpg",
    //         "wins": 10,
    //         "losses": 4,
    //         "ties": 0,
    //         "totalPointsScored": 1985.7399999999998,
    //         "regularSeasonPointsFor": 1985.7399999999998,
    //         "regularSeasonPointsAgainst": 1675.6999999999998,
    //         "winningPercentage": 71.43,
    //         "playoffSeed": 1,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 6,
    //         "abbreviation": "Arrg",
    //         "name": "Thielen your Money",
    //         "ownerName": "Steven Cruise",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/ffl/BoneHeads-ToddDetwiler/BoneHeads-08b.svg",
    //         "wins": 6,
    //         "losses": 8,
    //         "ties": 0,
    //         "totalPointsScored": 1653.0000000000002,
    //         "regularSeasonPointsFor": 1653.0000000000002,
    //         "regularSeasonPointsAgainst": 1810.5800000000002,
    //         "winningPercentage": 42.86,
    //         "playoffSeed": 8,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 7,
    //         "abbreviation": "EUBA",
    //         "name": "Insert Name Change",
    //         "ownerName": "Cody Eubanks",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/core/StadiumFoods-ESPN/stadium-foods_hot-dog.svg",
    //         "wins": 4,
    //         "losses": 10,
    //         "ties": 0,
    //         "totalPointsScored": 1633.0799999999997,
    //         "regularSeasonPointsFor": 1633.0799999999997,
    //         "regularSeasonPointsAgainst": 1795.34,
    //         "winningPercentage": 28.57,
    //         "playoffSeed": 9,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 8,
    //         "abbreviation": "BONn",
    //         "name": "Simpsonville CreativeMascots",
    //         "ownerName": "Cale Bonner",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/core/AnimalHeads/animal_heads-15.svg",
    //         "wins": 7,
    //         "losses": 7,
    //         "ties": 0,
    //         "totalPointsScored": 1670.7399999999998,
    //         "regularSeasonPointsFor": 1670.7399999999998,
    //         "regularSeasonPointsAgainst": 1719.3000000000002,
    //         "winningPercentage": 50,
    //         "playoffSeed": 6,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 9,
    //         "abbreviation": "KYW3",
    //         "name": "Rise of Ky Walker pt 3",
    //         "ownerName": "Marty Wyss",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/core/Solo/ESPN_Star_Wars_Mil_Falcon-01.svg",
    //         "wins": 9,
    //         "losses": 5,
    //         "ties": 0,
    //         "totalPointsScored": 1884.7200000000003,
    //         "regularSeasonPointsFor": 1884.7200000000003,
    //         "regularSeasonPointsAgainst": 1752.5400000000002,
    //         "winningPercentage": 64.29,
    //         "playoffSeed": 3,
    //         "owner": "name"
    //     },
    //     {
    //         "leagueId": 1248073066,
    //         "seasonId": 2023,
    //         "id": 10,
    //         "abbreviation": "CaSh",
    //         "name": "The Caddy Shack",
    //         "ownerName": "Russ Corwin",
    //         "logoURL": "https://g.espncdn.com/lm-static/logo-packs/ffl/CrazyHelmets-ToddDetwiler/Helmets_05.svg",
    //         "wins": 3,
    //         "losses": 11,
    //         "ties": 0,
    //         "totalPointsScored": 1450.78,
    //         "regularSeasonPointsFor": 1450.78,
    //         "regularSeasonPointsAgainst": 1583.16,
    //         "winningPercentage": 21.43,
    //         "playoffSeed": 10,
    //         "owner": "name"
    //     }
    // ]

    //sort by totalpoints desc then playoffSeed Asc
    
    const leagueStandings = getLeagueStandings();

    leagueStandings.sort((a, b) => b.totalPointsScored - a.totalPointsScored);
    leagueStandings.sort((a, b) => a.playoffSeed - b.playoffSeed);

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




