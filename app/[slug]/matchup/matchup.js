import { getBoxScores } from '@/app/api/newApiFetch';
import { BarChart, Bar, XAxis, Rectangle, YAxis, Tooltip, CartesianGrid, Cell, LabelList, ResponsiveContainer } from 'recharts';
import React, { PureComponent } from 'react';



export default async function BuildMatchups({ slug }) {
    const leagueValues = {
        gvl: 1248073066,
        it: 601844230,
        family: 283159008,
        hockey: 1335739020,
    }
    //var boxscores = await getBoxScores(leagueValues[slug]);

    let weekData = [
        {
            "away": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 130.3
                },
                "teamId": 8,
                "tiebreak": 0,
                "totalPoints": 130.3
            },
            "home": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 122.04
                },
                "teamId": 9,
                "tiebreak": 0,
                "totalPoints": 122.04
            },
            "id": 6,
            "matchupPeriodId": 2,
            "playoffTierType": "NONE",
            "winner": "AWAY",
            "homeManager": "Marty",
            "homeResult": "Loss",
            "barColorHome": "Brown",
            "homeScore": 122.04,
            "homeTeamId": 9,
            "awayManager": "Cale",
            "awayResult": "Win",
            "barColorAway": "Limegreen",
            "awayScore": 130.3,
            "awayTeamId": 8
        },
        {
            "away": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 123.3
                },
                "teamId": 1,
                "tiebreak": 0,
                "totalPoints": 123.3
            },
            "home": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 165.42
                },
                "teamId": 5,
                "tiebreak": 0,
                "totalPoints": 165.42
            },
            "id": 7,
            "matchupPeriodId": 2,
            "playoffTierType": "NONE",
            "winner": "HOME",
            "homeManager": "Ryan",
            "homeResult": "Win",
            "barColorHome": "Limegreen",
            "homeScore": 165.42,
            "homeTeamId": 5,
            "awayManager": "Sam",
            "awayResult": "Loss",
            "barColorAway": "Brown",
            "awayScore": 123.3,
            "awayTeamId": 1
        },
        {
            "away": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 107.34
                },
                "teamId": 4,
                "tiebreak": 0,
                "totalPoints": 107.34
            },
            "home": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 104.08
                },
                "teamId": 10,
                "tiebreak": 0,
                "totalPoints": 104.08
            },
            "id": 8,
            "matchupPeriodId": 2,
            "playoffTierType": "NONE",
            "winner": "AWAY",
            "homeManager": "Russ",
            "homeResult": "Loss",
            "barColorHome": "Brown",
            "homeScore": 104.08,
            "homeTeamId": 10,
            "awayManager": "Matt",
            "awayResult": "Win",
            "barColorAway": "Limegreen",
            "awayScore": 107.34,
            "awayTeamId": 4
        },
        {
            "away": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 84.66
                },
                "teamId": 3,
                "tiebreak": 0,
                "totalPoints": 84.66
            },
            "home": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 129.34
                },
                "teamId": 7,
                "tiebreak": 0,
                "totalPoints": 129.34
            },
            "id": 9,
            "matchupPeriodId": 2,
            "playoffTierType": "NONE",
            "winner": "HOME",
            "homeManager": "Cody",
            "homeResult": "Win",
            "barColorHome": "Limegreen",
            "homeScore": 129.34,
            "homeTeamId": 7,
            "awayManager": "Arthur",
            "awayResult": "Loss",
            "barColorAway": "Brown",
            "awayScore": 84.66,
            "awayTeamId": 3
        },
        {
            "away": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 125.38
                },
                "teamId": 6,
                "tiebreak": 0,
                "totalPoints": 125.38
            },
            "home": {
                "adjustment": 0,
                "cumulativeScore": {
                    "losses": 0,
                    "statBySlot": null,
                    "ties": 0,
                    "wins": 0
                },
                "pointsByScoringPeriod": {
                    "2": 142.06
                },
                "teamId": 2,
                "tiebreak": 0,
                "totalPoints": 142.06
            },
            "id": 10,
            "matchupPeriodId": 2,
            "playoffTierType": "NONE",
            "winner": "HOME",
            "homeManager": "Alex",
            "homeResult": "Win",
            "barColorHome": "Limegreen",
            "homeScore": 142.06,
            "homeTeamId": 2,
            "awayManager": "Steven",
            "awayResult": "Loss",
            "barColorAway": "Brown",
            "awayScore": 125.38,
            "awayTeamId": 6
        }

    ]

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { homeManager, awayManager, matchupPeriodId, homeScore, awayScore } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p className="toolTip">{`Week ${matchupPeriodId}`}</p>
                <p className="toolTip">{`${homeManager}: ${homeScore}`}</p>
                <p className="toolTip">{`${awayManager}: ${awayScore}`}</p>
            </div>
        );
    }

    return null;
};


    console.log(weekData)
    return (
        <section>
                <BarChart
                    width={360}
                    height={400}
                    margin={{top: 5, right:5, bottom: 5, left: -20}}
                    data={weekData}>
                    <CartesianGrid strokeDasharray="4 4" verticalCoordinatesGenerator={(props) => props.width/props.xAxis.tickCount}/>
                    <YAxis tick={{ fill: 'white' }} label={{ value:'Points', fill: 'white', angle: -90, offset: -45, position:"bottom"}} />
                    <XAxis tick={false} label={{ value:'Matchups', fill: 'white', offset:-15, position:"bottom"}} />
                    <Tooltip cursor={{ stroke: 'White', strokeWidth: 2 }} content={<CustomTooltip />}/>
                    <Bar dataKey="homeScore" activeBar={<Rectangle fill="goldenrod" stroke="black" />}>
                        <LabelList dataKey="homeManager" position="center" angle="-90" fill='white'></LabelList>
                        {weekData.map((entry) => (
                            <Cell key={`${entry}`} fill={entry.barColorHome} />
                        ))}
                    </Bar>
                    <Bar dataKey="awayScore" activeBar={<Rectangle fill="teal" stroke="black" />}>
                        <LabelList dataKey="awayManager" position="center" angle="-90" fill='white'></LabelList>
                        {weekData.map((entry) => (
                            <Cell key={`${entry}`} fill={entry.barColorAway} />
                        ))}
                    </Bar>

                   
                </BarChart>
        </section>
    );
}