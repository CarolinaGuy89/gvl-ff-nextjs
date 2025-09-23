//use this for npm run dev
import {getInfectedPlayer} from './leagueConfig'
import getLeagueSettings from './leagueConfig'
import { slotCategoryIdToPositionMap } from '../components/constants'
import calculateDefaultWeek from './calcCurrentWeek';

export default async function getLeagueStandings(leagueId) {

  const currentYear = 2025;  
  var arr = [];
  let weekNum = calculateDefaultWeek();
    if (weekNum == 0) {
      weekNum = 1
    }
  let rawData = []
  if (Number.isInteger(leagueId)) {

  } else {
    const leagueValues = {
      gvl: 1248073066,
      it: 601844230,
      family: 283159008,
      hockey: 1335739020,
    }
    leagueId = leagueValues[leagueId];
  }

  let URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/" + currentYear + "/segments/0/leagues/" + leagueId + "?scoringPeriodId=" + weekNum + "&view=mRoster&view=mTeam"

  rawData = await fetchLeagueData(URL);
  // rawData = await fetch(URL, { cache: 'no-store' }).then((res) =>
  //   res.json()
  // )

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
    weekNum: 'weekNum',
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
      .toLowerCase();
    team.primaryOwner = team.primaryOwner.charAt(0).toUpperCase() + team.primaryOwner.slice(1);
  });

  //parse rosters for just the good stuff
  teams = parseRoster(teams, weekNum);
  //console.log("Teams w/ parsed roster:", teams);

  //Infected Player Logic
  if (leagueId == '1248073066') {
    const infectedPlayer = await getInfectedPlayer(weekNum)
    const infectedTeam = teams.find(team => team.primaryOwner === infectedPlayer);
    infectedTeam.primaryOwner = "☣️ " +infectedTeam.primaryOwner
  }

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

  if (weekNum == 1) {
    weekNum = calculateDefaultWeek();
  }

  //Set Season Rankings
  if (weekNum > leagueSettings.lastRegularSeasonWeek) {
    leagueData.forEach(t => {
      if (t.leagueLocalRank > leagueSettings.playoffQty) {
        t.leagueLocalRank = t.regularSeasonStanding
      } else {
        t.leagueLocalRank = t.currentProjectedRank
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
      weekNum,
    };
  });
  return parsedRoster;
};

export async function getBoxScores(leagueId, weekNum) {
  const currentYear = 2025; 
  const URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/" + currentYear + "/segments/0/leagues/" + leagueId + "?view=mMatchupScore&view=mTeam"
  var raw = [];
  var fetched = [];
  //fetch data, caching it.
  fetched = await fetch(URL, { cache: 'no-store' }).then((res) =>
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
      team.primaryOwner = team.primaryOwner
      .trim()
      .toLowerCase();
    team.primaryOwner = team.primaryOwner.charAt(0).toUpperCase() + team.primaryOwner.slice(1);
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
    m.homeManager = m.homeManager
    m.homeResult = m.winner !== 'UNDECIDED' 
    ? (JSON.stringify(m.winner) === '"HOME"' ? 'Win' : 'Loss') 
    : "in progress";
    m.barColorHome = m.homeResult === 'Win' ? "Limegreen" : "Brown"
    m.homeScore = (m.home.totalPointsLive || m.home.totalPoints)
    m.homeTeamId = m.home.teamId
    try { //to deal with Bye weeks. Bye Weeks are always Home.
      m.awayManager = teamIdMap[m.away.teamId];
      m.awayManager = m.awayManager.trim()
      m.awayManager = m.awayManager
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
    // Push the current item into the appropriate arrayview=mMatchupScore
    acc[m.matchupPeriodId].push(m);

    return acc
  }, [])

  return schedule;
}

async function fetchLeagueData(URL) {
  let options;

  if (shouldBypassCache()) {
    // during game times, fetch live data
    options = {
      cache: "no-store",
      next: { revalidate: 0 }
    }
  } else {
    // During non-Games times, 10 minutes Cache
    options = {
      next: { revalidate: 600 }
    };
  }

  const res = await fetch(URL, options);
  return res.json();
}

function shouldBypassCache() {
  const { day, hour, minute } = getEasternTime();

  function between(startHour, startMin, endHour, endMin) {
    const current = hour * 60 + minute;
    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;
    return current >= start && current <= end;
  }

  // Sunday: 1:00 PM – 11:30 PM ET
  if (day === 0 && between(13, 0, 23, 30)) return true;

  // Monday Night: 8:15 PM – 11:30 PM ET
  if (day === 1 && between(20, 15, 23, 30)) return true;

  // Thursday Night: 8:15 PM – 11:30 PM ET
  if (day === 4 && between(20, 15, 23, 30)) return true;

  return false;
}

function getEasternTime() {
  const now = new Date();

  //Local Dev time
  // if (process.env.NODE_ENV === "development") {
  //   return {
  //     day: now.getDay(),
  //     hour: now.getHours(),
  //     minute: now.getMinutes(),
  //   };
  // }

  // Force to America/New_York timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    weekday: "numeric", // Sunday=1, Monday=2, ..., Saturday=7
  });

  const parts = formatter.formatToParts(now);
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

  return {
    day: parseInt(map.weekday, 10) % 7, // make Sunday=0 again
    hour: parseInt(map.hour, 10),
    minute: parseInt(map.minute, 10),
  };
}
