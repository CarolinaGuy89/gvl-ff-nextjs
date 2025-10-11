import { ownersByLeague } from '@/app/components/constants';

export default async function BuildDraftTables({ slug, leagueStandings, displayOption }) {
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

  const dataFiles = await files[slug]();
  let draftedTeams = dataFiles.default;

  // Group by teamId
  draftedTeams = draftedTeams.reduce((acc, player) => {
    if (!acc[player.teamId]) {
      acc[player.teamId] = [];
    }
    acc[player.teamId].push(player);
    return acc;
  }, {});

  // Sort each team’s players
  for (const teamId in draftedTeams) {
    draftedTeams[teamId].sort((a, b) => a.roundNumber - b.roundNumber);
  }

let tableHeaders = []

if (displayOption == 0) {
  // Build a quick lookup of playerId -> owner name
  const playerOwnerMap = {};
  leagueStandings.forEach(team => {
    team.roster.forEach(player => {
      playerOwnerMap[player.playerId] = team.owner;
    });
  });

  // Update draftedTeams with ownership info
  for (const teamId in draftedTeams) {
    draftedTeams[teamId] = draftedTeams[teamId].map(player => {
      const owner = playerOwnerMap[player.id] || "Free Agent";
      return { ...player, owner };
    });
  }

  tableHeaders = ["Draft Round", "Draft Pick", "Position", "Current Owner"];

  // Helper to resolve display owner name
  const getOwnerName = (teamId, slug, owners) => {
    let ownerIndex = Number(teamId) - 1;
    if (slug === "hockey" && ownerIndex >= 7) {
      ownerIndex += 1; // special rule
    }
    return owners[ownerIndex] || `Team ${teamId}`;
  };

  return (
    <div>
      {Object.entries(draftedTeams).map(([teamId, players]) => {
        const rows = players.map((t) => ({
          ...t,
          rowData: [t.roundNumber, t.fullName, t.defaultPosition, t.owner],
        }));
        
        const ownerName = getOwnerName(teamId, slug, owners);

        return (
          <div key={teamId} className={teamId} style={{ marginLeft: "1vw", marginRight: "1vw"}}>
            <h2 style={{ marginLeft: "2vw"}}>{ownerName}&apos;s drafted roster</h2>
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
} else if (displayOption == 1) {  

  const allDraftedPlayers = Object.entries(draftedTeams).flatMap(([teamId, players]) =>
  players.map(p => ({
    ...p,
    draftedTeamId: teamId
  }))
);

leagueStandings.forEach(team => {
  team.roster = team.roster.map(player => {
    // Find if this player was drafted by anyone
    const draftedInfo = allDraftedPlayers.find(d => d.id === player.playerId);

    // Default values
    let draftedRound = "not eligible";
    let draftedBy = null;

    if (draftedInfo) {
      draftedRound = draftedInfo.roundNumber;

      // Find who drafted them (owner name)
      const draftedTeam = leagueStandings.find(t => t.id == draftedInfo.draftedTeamId);
      const draftOwner = draftedTeam ? draftedTeam.owner : "Unknown";

      // Only include draftedBy if current owner is *different*
      if (draftOwner !== team.owner) {
        draftedBy = draftOwner;
        draftedRound = draftedRound + " (" + draftOwner + ")"
      }
    }

    return {
      ...player,
      draftedRound,
      draftedBy
      };
    });
  });
  leagueStandings.sort((a, b) => a.id - b.id);
    return (
<div style={{ marginLeft: "1vw", marginRight: "1vw"}}>
      {leagueStandings.map((team, idx) => (
        <div key={idx} >
          <h2 style={{ marginLeft: "2vw"}}>{team.owner}&apos;s current roster</h2>
          <table>
            <thead>
              <tr>
                <th>Slot</th>
                <th>Player</th>
                <th>Position - Rank</th>
                <th>Keeper Round</th>
              </tr>
            </thead>
            <tbody>
              {team.roster.map((t, i) => (
                <tr key={i}>
                  <td>{t.lineupSlotId}</td>
                  <td>{t.fullName}</td>
                  <td>{t.defaultPosition} - {t.positionalRanking}</td>
                  <td>{t.draftedRound}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
} else {
  
}
  




}
