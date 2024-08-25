//use this for npm run dev
import getLeagueSettings from './leagueConfig'
import { slotCategoryIdToPositionMap } from '../components/constants'

export default async function getLeagueStandings(leagueId) {
const leagueSettings = await getLeagueSettings(leagueId);

//Local Testing only
// async function getLeagueStandings(leagueId = 1248073066) {
//  const leagueSettings = {
//     playoffQty: 6,
//     lastRegularSeasonWeek: 14
// }

//end local testing


  //console.log("leagueSettings.playoffQty", leagueSettings.playoffQty)
 //console.log("leagueSettings.lastRegularSeasonWeek", leagueSettings.lastRegularSeasonWeek)

  var arr = [];
  const weekNum = 17;
  let rawData = []
  if (Number.isInteger(leagueId)) {
    const URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/"+leagueId+"?scoringPeriodId="+weekNum+"&view=mRoster&view=mTeam"
    //fetch data, caching it.
    rawData = await fetch(URL, { cache: 'force-cache' }).then((res) =>
      res.json()
    )
  }

  let responseMap = {
    //newName: 'oldname'
    id: 'id',
    abbreviation: 'abbrev',
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
    newItem.winPercentage = newItem.winPercentage*100
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



  if (weekNum > leagueSettings.lastRegularSeasonWeek) {
    leagueData.forEach(t => {
      if (t.leagueLocalRank > leagueSettings.playoffQty) {
        t.leagueLocalRank = t.regularSeasonStanding
      } else {
        t.leagueLocalRank = t.postSeasonRanking
      }
    });
  }
  leagueData.sort((a, b) => a.leagueLocalRank - b.leagueLocalRank);
  return (leagueData)
  
}
// //local js testing only
// getLeagueStandings();

function parseRoster(teams, weekNum) {

  let parsedRoster = teams.map(item => ({
    ...item,
      roster: item.roster.entries.map(p => ({
        //newName: oldLocation.oldName
        lineupSlotId: p.lineupSlotId,
        playerId: p.playerId,
        defaultPositionId: p.playerPoolEntry.player.defaultPositionId,
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
        isInjured:  p.playerPoolEntry.player.injured,
        projectedTotal: p.playerPoolEntry.player.stats
            .map(s => {if (s.scoringPeriodId === weekNum && s.statSourceId === 1) {
                return {projectedTotal: s.appliedTotal}}}),
        actualTotal: p.playerPoolEntry.player.stats
            .map(s => {if (s.scoringPeriodId === weekNum && s.statSourceId === 0) {
                return {actualTotal: s.appliedTotal}}})

      })) // You have to rename it separately in nested objects
  }));

  return parsedRoster
}

export async function getBoxScores(leagueId, weekNum) {
  const URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/"+leagueId+"?view=mMatchupScore&view=mTeam"
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
      m.homeResult = JSON.stringify(m.winner) === '"HOME"' ? 'Win' : 'Loss';
      m.barColorHome = m.homeResult === 'Win' ? "Limegreen" : "Brown"
      m.homeScore = m.home.totalPoints
      m.homeTeamId = m.home.teamId
        try {
            m.awayManager = teamIdMap[m.away.teamId];
            m.awayResult = JSON.stringify(m.winner) === '"AWAY"' ? 'Win' : 'Loss';
            m.barColorAway = m.awayResult == 'Win' ? "Limegreen" : "Brown"
            m.awayScore = m.away.totalPoints
            m.awayTeamId = m.away.teamId
        } catch (error) {
            m.homeResult = 'Win'
            m.barColorHome = "Limegreen"
            m.winner = 'HOME'
        }
      m.matchupNames = m.homeManager+" vs. "+m.awayManager
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

  console.log(schedule);
  return schedule;
}
