import getLeagueStandings from "@/app/api/newApiFetch";
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell, Legend, Rectangle} from 'recharts';
import calculateDefaultWeek from "@/app/api/calcCurrentWeek";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

export default async function PlayerPreformanceChart({ slug, teamId }) {
  let team = []
  team = await getLeagueStandings(slug);
  team = team.find(r => r.id == teamId);

  let currWeekNum = calculateDefaultWeek();
    // console.log("currWeekNum",currWeekNum)
    currWeekNum = currWeekNum == team.weekNum;
    // console.log("currWeekNum",currWeekNum)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { fullName, actualTotal, pointDelta, projectedTotal, lineupSlotId } = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'oldlace', border: '1px solid #ccc', padding: '10px' }}>
          <p className="toolTip">{`${fullName} (${lineupSlotId})`}</p>
          <p className="toolTip">{`Actual: ${actualTotal}`}</p>
          <p className="toolTip">{`Projected: ${projectedTotal}`}</p>
          <p className="toolTip">{`Delta: ${pointDelta}`}</p>
        </div>
      );
    }
    return null;
  };

  // const CustomizedTick = (props) => {
  //     let started = team.roster.find(p => p.fullName === props.payload.value).lineupLocked
  //     let lastName = team.roster.find(p => p.fullName === props.payload.value)?.lastName ?? " "
  //     let firstName = team.roster.find(p => p.fullName === props.payload.value)?.firstName ?? " "
  //     firstName = Array.from(`${firstName}`)[0]
  //       props.fill = "oldlace"
  //       props.scaleToFit = "true"
  //     let name;
  //     if (started) {
  //       name = <text {...props}>{`${firstName}. ${lastName}`}</text>
  //     } else if (firstName == " ") {
  //       name = <text></text>
  //     } else {
  //       name = <text {...props}>{`${firstName}. ${lastName}`}</text>
  //     }
  //     return (
  //     <g>
  //       {name}
  //     </g>
  //   )
  // };

  team.roster.splice(9, 0, { fullName: " " });
  return (
    <main>
      <section className="teamChart">
        <h5>{team.teamName}</h5>
        <h5>Player Preformance</h5>
        <ResponsiveContainer margin={{ top: 0, right: 20, left: 200, bottom: 0 }} width="100%" height={640}>
          <ComposedChart layout="vertical" data={team.roster}>
            <CartesianGrid strokeDasharray="2 2" horizontal={false} />
            <YAxis type="category" dataKey="fullName" tick={{ fill: "oldlace" }} scaleToFit = {true} width={110} axisLine={false} allowDataOverflow/>
            {/* <YAxis type="category" dataKey="fullName" scaleToFit = {true} width={110} axisLine={false} allowDataOverflow tick={CustomizedTick}/> */}
            <XAxis type="number" dataKey="maxTotal" tick={{ fill: "oldlace" }} domain={[team.minActualTotal, "dataMax"]} orientation="top" interval="preserveEnd" />
            <ReferenceLine x={0} />
            <ReferenceLine isFront='true' y=' ' stroke="limegreen" strokeWidth='3' label={{ value: "Bench", position: "bottom", fill: "oldlace" }} />
            <ReferenceLine isFront='true' y=' ' label={{ value: "Starters", position: "top", fill: "oldlace" }} />
            <Tooltip cursor={{ stroke: 'White', strokeWidth: 2 }} content={<CustomTooltip />} />

            <Bar dataKey="projectedTotal" stackId="stack" activeBar={<Rectangle strokeWidth='3' stroke="Yellow" />}>
              {team.roster.map((p, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={p.lineupLocked == false && currWeekNum == true ? '#deb88799' : 'oldLace'}
                />
              ))}
            </Bar>

            <Bar dataKey="pointDelta" stackId="stack" activeBar={<Rectangle strokeWidth='3' stroke="Yellow" />}>
              {team.roster.map((p, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={p.pointDelta < 0 ? 'orangered' : 'LimeGreen'}
                />
              ))}
            </Bar>
            <Legend verticalAlign="top"
              payload={[
                { value: 'Disappointment', type: 'square', color: 'orangered' },
                { value: 'Projected Points', type: 'square', color: 'oldlace' },
                { value: 'Exceeded Projections', type: 'square', color: 'LimeGreen' },
                { value: 'Yet to Play', type: 'square', color: '#deb88799' },
              ]}
            />
          </ComposedChart >
        </ResponsiveContainer>
      </section>
    </main>
  )
};