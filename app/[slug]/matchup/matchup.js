import { getBoxScores } from '@/app/api/newApiFetch';
import { BarChart, Bar, XAxis, Rectangle, YAxis, Tooltip, CartesianGrid, Cell, LabelList, ResponsiveContainer } from 'recharts';
import React from 'react';

export default async function BuildMatchups({ slug, weekNum = calculateDefaultWeek() }) {
    const leagueValues = {
        gvl: 1248073066,
        it: 601844230,
        family: 283159008,
        hockey: 1335739020,
    }
    var weekData = []
    const allData = await getBoxScores(leagueValues[slug]);
    weekData = allData[weekNum]

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

//Weekly Average
let total = 0;
weekData.forEach(element => {
    total += (element.homeScore + element.awayScore);
});
let averageScore = (total / (weekData.length * 2)).toFixed(2);

//Closest Game
const closestMatch = weekData.reduce((closest, current) => {
    const difference = Math.abs(current.homeScore - current.awayScore);
    if (difference < closest.difference) {
      closest.difference = difference.toFixed(2);
      if (current.homeScore >= current.awayScore) {
        closest.winner = current.homeManager;
        closest.loser = current.awayManager;
      } else if (current.homeScore < current.awayScore) {
        closest.winner = current.awayManager;
        closest.loser = current.homeManager;
      }
    }
  
    return closest;
  }, {
    difference: Infinity,
    winner: '',
    loser: '',
  });
  let closestDifference = closestMatch.difference;
  let winner = closestMatch.winner;
  let loser = closestMatch.loser;

//Highest Scoring Loser
let highLoserIndex = -1
let highLoserSalt = -1
let highLoserScore = -1
var highLoserName = 'Loading'
let lowWinIndex = -1
let lowWinSalt = -1
let lowWinScore = -1
var lowWinName = 'Loading'

const combinedItems = [];
weekData.forEach((item) => {
    // Create new local objects for home and away items
    let awayItem =[];
    let homeItem =[];

    if (item.winner == "UNDECIDED") {
            homeItem = {
            score: item.homeScore,
            result: item.homeScore > item.awayScore ? "Winner" : 'Loser',
            manager: item.homeManager
            };
        
            awayItem = {
            score: item.awayScore,
            result: item.awayScore > item.homeScore ? "Winner" : 'Loser',
            manager: item.awayManager
            };
    } else {
            homeItem = {
            score: item.homeScore,
            result: item.homeResult === "Win" ? "Winner" : 'Loser',
            manager: item.homeManager
            };
        
            awayItem = {
            score: item.awayScore,
            result: item.awayResult === "Win" ? "Winner" : 'Loser',
            manager: item.awayManager
            };
    }


    
    // Push the objects into the combined array
    combinedItems.push(homeItem);
    combinedItems.push(awayItem);
    combinedItems.sort((a, b) => b.score-a.score);
    
    //Lowest scoring Winner
    highLoserIndex = combinedItems.findIndex((element) => element.result === 'Loser')
    lowWinIndex = combinedItems.findLastIndex((element) => element.result === 'Winner')
    
    //Check if a winner exists, otherwise no game has started yet
    if (lowWinIndex !== -1) {

        highLoserName = combinedItems[highLoserIndex].manager
        highLoserScore = combinedItems[highLoserIndex].score
        highLoserSalt = combinedItems.length-(highLoserIndex+1)

        lowWinName = combinedItems[lowWinIndex].manager;
        lowWinScore = combinedItems[lowWinIndex].score;
        lowWinSalt = lowWinIndex;
      } else {
        highLoserName = '-'
        highLoserScore = '-';
        highLoserSalt = '-';
        lowWinName = '-';
        lowWinScore = '-'; 
        lowWinSalt = '-'; 
        let closestGameText = 'Week has not started'
      }

});


        if (weekData == null) {
            return
        } else {
            //console.log(weekData)
            return (
                <section>
                    <section>
                        <h2 className="chartTitle">{`Week ${weekNum} Matchups`}</h2>
                    </section>
                    <section className="stat-card-container">
                        <div className="stat-card">
                            <div className="card-title">
                                <h3>Average Score</h3>
                            </div>
                            <p>{averageScore} points</p>
                        </div>

                        <div className="stat-card">
                            <div className="card-title">
                                <h3>Closest Game</h3>
                            </div>
                            <p>{winner} beat {loser} <br />by {closestDifference} points</p>
                        </div>
                        <div className="stat-card">
                            <div className="card-title">
                                <h3>Highest Scoring Loser</h3>
                            </div>
                            <p>{highLoserName} lost with {highLoserScore} points, would have beat {(highLoserSalt == combinedItems.length - 2) ? "any other team" : highLoserSalt + (highLoserSalt === 1 ? (" other") : " others")}</p>
                        </div>

                        <div className="stat-card">
                            <div className="card-title">
                                <h3>Lowest Scoring Winner</h3>
                            </div>
                            <p>{lowWinName} won with {lowWinScore} points, would have lost to {(lowWinSalt == combinedItems.length - 2) ? "any other team" : lowWinSalt + (lowWinSalt === 1 ? (" other") : " others")}</p>
                        </div>

                    </section>

                    <BarChart
                        width={360}
                        height={400}
                        margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
                        data={weekData}>
                        <CartesianGrid strokeDasharray="4 4" verticalCoordinatesGenerator={(props) => props.width / props.xAxis.tickCount} />
                        <YAxis tick={{ fill: 'white' }} label={{ value: 'Points', fill: 'white', angle: -90, offset: -45, position: "bottom" }} />
                        <XAxis tick={false} label={{ value: 'Matchups', fill: 'white', offset: -15, position: "bottom" }} />
                        <Tooltip cursor={{ stroke: 'White', strokeWidth: 2 }} content={<CustomTooltip />} />
                        <Bar dataKey="awayScore" activeBar={<Rectangle fill="teal" stroke="black" />}>
                            <LabelList dataKey="awayManager" position="center" angle="-90" fill='white'></LabelList>
                            {weekData.map((entry) => (
                                <Cell key={`${entry}`} fill={entry.barColorAway} />
                            ))}
                        </Bar>
                        <Bar dataKey="homeScore" activeBar={<Rectangle fill="goldenrod" stroke="black" />}>
                            <LabelList dataKey="homeManager" position="center" angle="-90" fill='white'></LabelList>
                            {weekData.map((entry) => (
                                <Cell key={`${entry}`} fill={entry.barColorHome} />
                            ))}
                        </Bar>

                    </BarChart>
                </section>
            );
        }
    }

//Calculate the current week
function calculateDefaultWeek() {

            const currentDate = new Date();
            const startOfWeek1 = new Date('2024-09-05'); // Thursday of NFL Week one
            const millisecondsInAWeek = 604800000;
            var weeksSinceStart = Math.floor((currentDate - startOfWeek1) / millisecondsInAWeek);

            if (weeksSinceStart < 0) {
                weeksSinceStart = 0;
            }

            // Ensure the week number is between 0 and 17 (or your season's max week)
            // 0 = Preseason
            //return Math.min(Math.max(weeksSinceStart + 1, 1), 17);
            return Math.min(Math.max(weeksSinceStart, 0), 18);
        }