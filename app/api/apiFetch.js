import { Client } from "../../node_modules/espn-fantasy-football-api/web-dev"
import { determineOwner } from "../components/teamowners";

//Get Current League Statndings------------------------------------
export async function getLeagueStandings(leagueId, selectedWeek) {
  //const myClient = new Client({ leagueId });
  const myClient = new Client( {leagueId: 1248073066} );
  console.log ("client:",myClient)
  try {
      console.log('------------Team API CALL------------');
      var leagueStandings = await myClient.getTeamsAtWeek({
          //seasonId: currSeasonID,
          seasonId: 2023,
          //scoringPeriodId: selectedWeek,
          scoringPeriodId: 1,
      })

      leagueStandings.forEach((t) => {
          t.weekId = selectedWeek
          delete t.roster
          delete t.awayLosses
          delete t.awayTies
          delete t.awayWins
          delete t.divisionLosses
          delete t.divisionTies
          delete t.divisionWins
          delete t.finalStandingsPosition
          delete t.homeLosses
          delete t.homeTies
          delete t.homeWins
          delete t.season
          // delete t.regularSeasonPointsAgainst

          t.owner = determineOwner(leagueId, t.id)
      })
      //console.log(leagueStandings)
      return leagueStandings;
  } catch (error) {
      console.error('Error fetching boxscore data:', error);
      return [];
  }
};

//Draft Data-------------------------------------
export async function getDraftData() {
    const api_url = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/1248073066?view=mDraftDetail";
    //Draft data via direct from source
    async function getapi(url) {
        const response = await fetch(url);
        // Storing data in form of JSON
        return await response.json().then(data => {
            return data;
        })
    }
    var draftRaw = await getapi(api_url)
    
    const draftData = {
        draftPicks: draftRaw.draftDetail.picks,
        leagueId: draftRaw.id,
        pickOrder: draftRaw.settings.draftSettings.pickOrder
    }
    
    draftData.draftPicks.forEach(p => {
        delete p.autoDraftTypeId
        delete p.nominatingTeamId
        delete p.bidAmount
        delete p.id
        delete p.memberId
        delete p.tradeLocked
    });
    
    const regroupPicks = {};
    draftData.draftPicks.forEach((item) => {
        if (!regroupPicks[item.teamId]) {
          regroupPicks[item.teamId] = [];
        }
        regroupPicks[item.teamId].push(item);
      });
      
      // Convert the grouped object back to an array
      const d = Object.values(regroupPicks);
      
      // Sort newArray based on pickOrder
    d.sort((a, b) => {
        const aTeamId = a[0].teamId;
        const bTeamId = b[0].teamId;
        return draftData.pickOrder.indexOf(aTeamId) - draftData.pickOrder.indexOf(bTeamId);
      });
    
    draftData.draftPicks = d;
    //console.log(draftData)
    
    return draftData
}
