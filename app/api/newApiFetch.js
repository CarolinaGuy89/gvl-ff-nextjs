async function getLeagueStandings() {
  const leagueSettings = {
    playoffQty: 6,
    lastRegularSeasonWeek: 14
  }

  var arr = [];
  const leagueId = 1248073066;
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
  console.log("Members:", members);
  const teams = arr.find(([key]) => key === "teams")[1];
  console.log("Teams:", teams);

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
    // delete team.owners;
    // team = { ...team, ...team.record.overall }
    // delete team.record
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
  return leagueData
}
//local js testing only
//getLeagueStandings();