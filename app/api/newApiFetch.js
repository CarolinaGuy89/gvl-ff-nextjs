//use this for npm run dev
import getLeagueSettings from './leagueConfig'
import { slotCategoryIdToPositionMap } from '../components/constants'
import calculateDefaultWeek from './calcCurrentWeek';

export default async function getLeagueStandings(leagueId) {

  var arr = [];
  let weekNum = calculateDefaultWeek();
    if (weekNum == 0) {
      weekNum = 1
    }
  let rawData = []
  if (Number.isInteger(leagueId)) {

    let URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/" + leagueId + "?scoringPeriodId=" + weekNum + "&view=mRoster&view=mTeam"
    //fetch data, caching it.
    rawData = await fetch(URL, { cache: 'force-cache' }).then((res) =>
      res.json()
    )
  } else {
    const leagueValues = {
      gvl: 1248073066,
      it: 601844230,
      family: 283159008,
      hockey: 1335739020,
    }

    leagueId = leagueValues[leagueId];
    let URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/" + leagueId + "?scoringPeriodId=" + weekNum + "&view=mRoster&view=mTeam"
    //fetch data, caching it.
    rawData = await fetch(URL, { cache: 'force-cache' }).then((res) =>
      res.json()
    )
  }

  const leagueSettings = await getLeagueSettings(leagueId);

  let responseMap = {
    //newName: 'oldname'
    id: 'id',
    abbrev: 'abbrev',
    logoURL: 'logo',
    draftDayProjectedRank: 'draftDayProjectedRank',
    teamName: 'name',
    regularSeasonStanding: 'playoffSeed',
    postSeasonRanking: 'rankCalculatedFinal',
    pointsAgainst: 'pointsAgainst',
    pointsFor: 'points',
    wins: 'wins',
    losses: 'losses',
    streakLength: 'streakLength',
    streakType: 'streakType',
    owner: 'primaryOwner',
    winPercentage: 'percentage',
    preSeasonRank: 'draftDayProjectedRank',
    currentProjectedRank: 'currentProjectedRank',
    gamesBack: 'gamesBack',
    roster: 'roster',
    minActualTotal: 'minActualTotal',
    maxTotal: 'maxTotal',
    lineupLocked: 'lineupLocked',
  };


  //convert objects into an array
  for (var i in rawData)
    arr.push([i, rawData[i]])

  //Extract the members and teams arrays.
  const members = arr.find(([key]) => key === "members")[1];
  //console.log("Members:", members);
  let teams = arr.find(([key]) => key === "teams")[1];
  //console.log("Teams:", teams);

  //The reduce() function creates a map of member IDs to their first names.
  const memberMap = members.reduce((acc, member) => {
    acc[member.id] = member.firstName;
    return acc;
  }, {});

  //apply the memberMap to each team
  teams.forEach((team, i) => {
    team.primaryOwner = memberMap[team.primaryOwner];
    team.primaryOwner = team.primaryOwner
      .trim()
      .charAt(0).toUpperCase() + team.primaryOwner.slice(1);
  });

  //parse rosters for just the good stuff
  teams = parseRoster(teams, weekNum);
  //console.log("Teams w/ parsed roster:", teams);

  //apply the responseMap to each team
  const leagueData = teams.map(item => {
    const newItem = {};

    item = { ...item, ...item.record.overall }

    for (const newKey in responseMap) {
      const oldKey = responseMap[newKey];
      if (item.hasOwnProperty(oldKey)) {
        newItem[newKey] = item[oldKey];
      }
    }

    newItem.winPercentage = newItem.winPercentage * 100
    newItem.leagueLocalRank = newItem.regularSeasonStanding
    newItem.pointsAgainst = newItem.pointsAgainst.toFixed(0)
    newItem.pointsFor = newItem.pointsFor.toFixed(0)
    //if current week is > last regular season week

    // Add other fields that are not in the responseMap, Uncomment to keep items not in response map
    // for (const key in item) {
    //   if (!Object.values(responseMap).includes(key)) {
    //     newItem[key] = item[key];
    //   }
    // }


    return newItem;
  });

  weekNum = calculateDefaultWeek();
  //Set Season Rankings
  if (weekNum > leagueSettings.lastRegularSeasonWeek) {
    leagueData.forEach(t => {
      if (t.leagueLocalRank > leagueSettings.playoffQty) {
        t.leagueLocalRank = t.regularSeasonStanding
      } else {
        t.leagueLocalRank = t.postSeasonRanking
      }
    });
  } else if (weekNum == 0 ) {
    leagueData.forEach(t => {
      t.leagueLocalRank = t.preSeasonRank
    });
  }

  leagueData.sort((a, b) => a.leagueLocalRank - b.leagueLocalRank);
  return (leagueData)

}

function parseRoster(teams, weekNum) {
  const positionOrder = ['QB', 'RB', 'WR', 'TE', 'FLEX', 'D/ST', 'K', "Bench", "IR"];

  let parsedRoster = teams.map(item => {
    let roster = item.roster.entries.map(p => {
      let projectedTotal= p.playerPoolEntry.player.stats
        .find(s => s.scoringPeriodId === weekNum && s.statSourceId === 1)?.appliedTotal ?? 0;
      
      let actualTotal= p.playerPoolEntry.player.stats
        .find(s => s.scoringPeriodId === weekNum && s.statSourceId === 0)?.appliedTotal ?? 0;

        let pointDelta = 0;
        if (actualTotal != 0) {
           pointDelta = parseFloat((actualTotal - projectedTotal).toFixed(2));
        }
        let maxTotal;
        if (actualTotal > projectedTotal) {
          maxTotal = actualTotal
        } else {
          maxTotal = projectedTotal
        }

      return {
      //newName: oldLocation.oldName
      lineupSlotId: slotCategoryIdToPositionMap[p.lineupSlotId],
      playerId: p.playerId,
      eligibleSlots: p.playerPoolEntry.player.eligibleSlots.map(
        position => slotCategoryIdToPositionMap[position]
      ),
      playerId: p.playerPoolEntry.player.id,
      firstName: p.playerPoolEntry.player.firstName,
      fullName: p.playerPoolEntry.player.fullName,
      lastName: p.playerPoolEntry.player.lastName,
      isInjured: p.playerPoolEntry.player.injured,
      injuryStatus: p.playerPoolEntry.player.injuryStatus,
      proTeamId: p.playerPoolEntry.player.proTeamId,
      droppable: p.playerPoolEntry.player.droppable,
      isInjured: p.playerPoolEntry.player.injured,
      projectedTotal: parseFloat(projectedTotal.toFixed(2)),
      actualTotal: parseFloat(actualTotal.toFixed(2)),
      pointDelta: pointDelta,
      maxTotal: parseFloat(maxTotal.toFixed(2)),
      lineupLocked: p.playerPoolEntry.lineupLocked,
    };
    }) // You have to rename it separately in nested objects
    .sort((a, b) => positionOrder.indexOf(a.lineupSlotId) - positionOrder.indexOf(b.lineupSlotId)); // Sorting lineupSlotId
    
    let minActualTotal = Math.min(...roster.map(p => p.actualTotal));
    let maxTotal = Math.max(...roster.map(p => p.maxTotal));
    return {
      ...item,
      roster,
      minActualTotal, // Add the minActualTotal to the roster output
      maxTotal,
    };
  });
  return parsedRoster;
};

export async function getBoxScores(leagueId, weekNum) {
  const URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/" + leagueId + "?view=mMatchupScore&view=mTeam"
  var raw = [];
  var fetched = [];
  //fetch data, caching it.
  fetched = await fetch(URL, { cache: 'force-cache' }).then((res) =>
    res.json()
  )


  for (var i in fetched)
    raw.push([i, fetched[i]])
  let members = [];
  let rawSchedule = [];
  let schedule = [];
  let teams = [];

  members = raw.find(([key]) => key === "members")[1];
  teams = raw.find(([key]) => key === "teams")[1];
  rawSchedule = raw.find(([key]) => key === "schedule")[1];

  //The reduce() function creates a map of member IDs to their first names.
  const memberMap = members.reduce((acc, member) => {
    acc[member.id] = member.firstName;
    return acc;
  }, {});

  //apply the memberMap to each team
  teams.forEach((team, i) => {
    team.primaryOwner = memberMap[team.primaryOwner];
  });

  //The reduce() function creates a map of teamIDs to their first names.
  const teamIdMap = teams.reduce((acc, team) => {
    acc[team.id] = team.primaryOwner;
    return acc;
  }, {});

  //apply the memberMap to each team
  rawSchedule.forEach((m, i) => {
    //there is always a match so map directly to the value.
    m.homeManager = teamIdMap[m.home.teamId];
    m.homeManager = m.homeManager.trim()
    m.homeManager = m.homeManager.charAt(0).toUpperCase() + m.homeManager.slice(1);
    m.homeResult = m.winner !== 'UNDECIDED' 
    ? (JSON.stringify(m.winner) === '"HOME"' ? 'Win' : 'Loss') 
    : "in progress";
    m.barColorHome = m.homeResult === 'Win' ? "Limegreen" : "Brown"
    m.homeScore = (m.home.totalPointsLive || m.home.totalPoints)
    m.homeTeamId = m.home.teamId
    try { //to deal with Bye weeks. Bye Weeks are always Home.
      m.awayManager = teamIdMap[m.away.teamId];
      m.awayManager = m.awayManager.trim()
      m.awayManager = m.awayManager.charAt(0).toUpperCase() + m.awayManager.slice(1);
      m.awayResult = JSON.stringify(m.winner) === '"AWAY"' ? 'Win' : 'Loss';
      m.barColorAway = m.awayResult == 'Win' ? "Limegreen" : "Brown"
      m.awayScore = (m.away.totalPointsLive || m.away.totalPoints)
      m.awayTeamId = m.away.teamId
    } catch (error) {
      m.homeResult = 'Win'
      m.barColorHome = "Limegreen"
      m.winner = 'HOME'
    }

    if (m.homeResult === "in progress") {
      if (m.homeScore > m.awayScore) {
        m.barColorHome ="Limegreen"
        m.barColorAway ="Brown"
      } else {
        m.barColorHome ="Brown"
        m.barColorAway ="Limegreen"
      }
    }
    // m.matchupNames = m.homeManager+" vs. "+m.awayManager
  });

  schedule = rawSchedule.reduce((acc, m) => {
    if (!acc[m.matchupPeriodId]) {
      // If not, create an empty array for that key
      acc[m.matchupPeriodId] = [];
    }
    // Push the current item into the appropriate array
    acc[m.matchupPeriodId].push(m);

    return acc
  }, [])

  console.log("schedule: called", schedule)
  return schedule;
}
