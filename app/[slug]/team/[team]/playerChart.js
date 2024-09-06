import getLeagueStandings from "@/app/api/newApiFetch";
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell, Legend, Rectangle, ReferenceArea, horizontalCoordinatesGenerator } from 'recharts';

export default async function PlayerPreformanceChart({ slug, teamId }) {
  let team = []
  team = await getLeagueStandings(slug);
  team = team.find(r => r.id == teamId);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { fullName, actualTotal, pointDelta, projectedTotal, lineupSlotId } = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'oldlace', border: '1px solid #ccc', padding: '10px' }}>
          <p className="toolTip">{`${lineupSlotId}: ${fullName}`}</p>
          <p className="toolTip">{`Actual: ${actualTotal}`}</p>
          <p className="toolTip">{`Projected: ${projectedTotal}`}</p>
          <p className="toolTip">{`Delta: ${pointDelta}`}</p>
        </div>
      );
    }
    return null;
  };
  team.roster.splice(9, 0, { fullName: " " });
  console.log(team.roster)
  return (
    <main>
      <hr />
      <section className="teamChart">
        <h5>{team.teamName} Player Preformance</h5>
        <ResponsiveContainer margin={{ top: 0, right: 20, left: 200, bottom: 0 }} width="100%" height={640}>
          <ComposedChart layout="vertical" data={team.roster}>
            <CartesianGrid strokeDasharray="2 2" horizontal={false} horizontalCoordinatesGenerator={(props) => props.height > 250 ? [75, 150, 225] : [100, 200]} />
            <YAxis type="category" dataKey={"fullName"} width={120} tick={{ fill: "oldlace" }} axisLine={false} />
            <XAxis type="number" dataKey="maxTotal" tick={{ fill: "oldlace" }} domain={[team.minActualTotal, "dataMax"]} orientation="top" interval="preserveEnd" />
            <ReferenceLine x={0} />
            <ReferenceLine isFront='true' y=' ' stroke="limegreen" strokeWidth='3' label={{ value: "Bench", position: "bottom", fill: "oldlace" }} />
            <ReferenceLine isFront='true' y=' ' label={{ value: "Starters", position: "top", fill: "oldlace" }} />
            <Tooltip cursor={{ stroke: 'White', strokeWidth: 2 }} content={<CustomTooltip />} />

            <Bar dataKey="projectedTotal" fill="oldlace" stackId="stack" activeBar={<Rectangle strokeWidth='3' stroke="Yellow" />} />
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
              ]}
            />
          </ComposedChart >
        </ResponsiveContainer>
      </section>
    </main>
  )
};