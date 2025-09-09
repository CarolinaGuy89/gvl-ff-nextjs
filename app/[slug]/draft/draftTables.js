import { ownersByLeague } from '@/app/components/constants';

export default async function BuildDraftTables({ slug, leagueStandings }) {
  const files = {
    family: () => import("../../components/draftData/family_2025.json"),
    gvl: () => import("../../components/draftData/gvl_2025.json"),
    hockey: () => import("../../components/draftData/hockey_2025.json"),
    it: () => import("../../components/draftData/it_2025.json"),
  };

  if (!files[slug]) {
    throw new Error(`No draft data for slug: ${slug}`);
  }

  const owners = ownersByLeague[slug] || [];

  const module = await files[slug]();
  const data = module.default;

  // Group by teamId
  const grouped = data.reduce((acc, player) => {
    if (!acc[player.teamId]) {
      acc[player.teamId] = [];
    }
    acc[player.teamId].push(player);
    return acc;
  }, {});

  // Sort each team’s players
  for (const teamId in grouped) {
    grouped[teamId].sort((a, b) => a.roundNumber - b.roundNumber);
  }


// Enhance grouped players with owner info
// Enhance grouped players with current owner info
for (const teamId in grouped) {
  grouped[teamId] = grouped[teamId].map(player => {
    // Find which team currently owns this player
    const owningTeam = leagueStandings.find(team =>
      team.roster.some(r => r.playerId === player.id)
    );

    if (owningTeam) {
      return { ...player, owner: owningTeam.owner };
    } else {
      return { ...player, owner: "Free Agent" };
    }

    return player; // keep original if not currently owned
  });
}

  const tableHeaders = ["Draft Round", "Draft Pick", "Position", "Current Owner"];



  return (
    <div>
      {Object.entries(grouped).map(([teamId, players]) => {
        const rows = players.map((t) => ({
          ...t,
          rowData: [t.roundNumber, t.fullName, t.defaultPosition, t.owner],
        }));
        
        let ownerIndex = Number(teamId) - 1;
        if (slug === "hockey" && ownerIndex >= 7) {
            // skip team slot #8 (special rule)
            ownerIndex += 1;
        }
        const ownerName = owners[ownerIndex] || `Team ${teamId}`;

        return (
          <div className={teamId}>
            <h2>{ownerName}</h2>
            <table>
              <thead>
                <tr>
                  {tableHeaders.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id}>
                    {t.rowData.map((data, idx) => (
                      <td key={idx}>{data}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
