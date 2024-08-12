import getLeagueSettings from './leagueConfig'
export default async function getLeagueStandings(leagueId) {

  const leagueSettings = getLeagueSettings(leagueId);
  console.log("leagueSettings.playoffQty", leagueSettings.playoffQty)
  console.log("leagueSettings.lastRegularSeasonWeek", leagueSettings.lastRegularSeasonWeek)

  var arr = [];
  const weekNum = 17;
  const URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/"+leagueId+"?scoringPeriodId="+weekNum+"&view=mTeam"
  const responseMap = {
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

  //fetch data, caching it.
  const rawData = await fetch(URL, { cache: 'force-cache' }).then((res) =>
    res.json()
  )

  //convert objects into an array
  for (var i in rawData)
    arr.push([i, rawData[i]])

  //Extract the members and teams arrays.
  const members = arr.find(([key]) => key === "members")[1];
  //console.log("Members:", members);
  const teams = arr.find(([key]) => key === "teams")[1];
  //console.log("Teams:", teams);

  //The reduce() function creates a map of member IDs to their first names.
  const memberMap = members.reduce((acc, member) => {
    acc[member.id] = member.firstName;
    return acc;
  }, {});

  //apply the memberMap to each team
  teams.forEach((team, i) => {
    if (memberMap[team.primaryOwner]) {
      team.primaryOwner = memberMap[team.primaryOwner];
    }
  });
  
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
    newItem.pointsAgainst = newItem.pointsAgainst.toFixed(2)
    newItem.pointsFor = newItem.pointsFor.toFixed(2)
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
//local js testing only
//getLeagueStandings();

// export const getDraftData = async (leagueId) => {
//   const api_url = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/" + leagueId + "?view=mDraftDetail";
//   //Draft data via direct from source
//   async function getapi(url) {
//       const response = await fetch(url);
//       // Storing data in form of JSON
//       return await response.json().then(data => {
//           return data;
//       })
//   }
//   var draftRaw = await getapi(api_url)
  
//   const draftData = {
//       draftPicks: draftRaw.draftDetail.picks,
//       leagueId: draftRaw.id,
//       pickOrder: draftRaw.settings.draftSettings.pickOrder
//   }
  
//   draftData.draftPicks.forEach(p => {
//       delete p.autoDraftTypeId
//       delete p.nominatingTeamId
//       delete p.bidAmount
//       delete p.id
//       delete p.memberId
//       delete p.tradeLocked
//   });
  
//   const regroupPicks = {};
//   draftData.draftPicks.forEach((item) => {
//       if (!regroupPicks[item.teamId]) {
//         regroupPicks[item.teamId] = [];
//       }
//       regroupPicks[item.teamId].push(item);
//     });
    
//     // Convert the grouped object back to an array
//     const d = Object.values(regroupPicks);
    
//     // Sort newArray based on pickOrder
//   d.sort((a, b) => {
//       const aTeamId = a[0].teamId;
//       const bTeamId = b[0].teamId;
//       return draftData.pickOrder.indexOf(aTeamId) - draftData.pickOrder.indexOf(bTeamId);
//     });
  
//   draftData.draftPicks = d;
//   console.log(draftData)
  
//   return draftData
// }
