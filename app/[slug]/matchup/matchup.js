import { getBoxScores } from '@/app/api/newApiFetch';
import { BarChart, Bar, XAxis, Rectangle, YAxis, Tooltip, CartesianGrid, Cell, LabelList, ResponsiveContainer } from 'recharts';
import React from 'react';



export default async function BuildMatchups({ slug, weekNum=calculateDefaultWeek() }) {
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

if (weekData == null){
    return 
    } else {
    //console.log(weekData)
    return (
        <section>
        <section>
            <h2 className="chartTitle">{`Week ${weekNum} Matchups`}</h2>
        </section>
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
    );}
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