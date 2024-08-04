import { Client } from 'espn-fantasy-football-api/web-dev'
import { determineOwner } from '../components/teamowners';

var currSeasonID = 2024;


export const getBoxscoreForWeek = async (leagueId, selectedWeek) => {
    const myClient = new Client({ leagueId });
    try {
        console.log('-------------Boxscore API CALL------------');
        var matchup = await myClient.getBoxscoreForWeek({
            seasonId: currSeasonID,
            matchupPeriodId: selectedWeek,
            scoringPeriodId: selectedWeek,
        })       

        matchup.weekId = selectedWeek;
        matchup.leagueId = leagueId;
        matchup.forEach((element, i) => {
            element.weekId = selectedWeek
            element.matchId = i

            //Determine Home/Away Win or Loss
            element.homeResult = element.homeScore > element.awayScore ? 'Win' : 'Loss';
            element.awayResult = element.awayScore > element.homeScore ? 'Win' : 'Loss';

            //Set the bar chart color according to result. Color must be valid CSS
            element.barColorHome = element.homeResult === 'Win' ? "Limegreen" : "Brown"
            element.barColorAway = element.awayResult === 'Win' ? "Limegreen" : "Brown"

            //Home Roster Updates
            element.homeRoster.forEach((p) => {
                let sumProjectedPoints = Object.values(p.projectedPointBreakdown)
                    .filter((value) => typeof value === 'number')
                    .reduce((sum, value) => sum + value, 0);
                p.projectedPoints = parseFloat(sumProjectedPoints.toFixed(1))
                p.delta = parseFloat((p.totalPoints - p.projectedPoints).toFixed(2))
                p.position = p.position === "RB/WR/TE" ? 'Flex' : p.position
                p.chartColor = (p.position === 'Bench' ||  p.position === 'IR') ? 'dimgrey' : p.delta < 0 ? 'Brown' : 'LimeGreen';
                delete p.projectedRawStats
                delete p.rawStats
            })
            //Sum Home Bench
            element.homeBenchScore = element.homeRoster
                .filter((player) => ['Bench', 'IR'].includes(player.position))
                .reduce((total, player) => total + player.totalPoints, 0);

            element.homeProjScore = element.homeRoster
                .filter((player) => ['QB', 'WR', 'RB', 'Flex', 'D/ST', 'TE', 'K'].includes(player.position))
                .reduce((projTotal, player) => projTotal + player.projectedPoints, 0);
                
            element.homeKickerScore = element.homeRoster
                .filter((player) => ['K'].includes(player.position))
                .reduce((projTotal, player) => projTotal + player.projectedPoints, 0);

            //Away Roster Updates
            element.awayRoster.forEach((p) => {
                let sumProjectedPoints = Object.values(p.projectedPointBreakdown)
                    .filter((value) => typeof value === 'number')
                    .reduce((sum, value) => sum + value, 0);
                p.projectedPoints = parseFloat(sumProjectedPoints.toFixed(1))
                p.delta = parseFloat((p.totalPoints - p.projectedPoints).toFixed(2))
                p.position = p.position === "RB/WR/TE" ? 'Flex' : p.position
                p.chartColor = (p.position === 'Bench' ||  p.position === 'IR') ? 'dimgrey' : p.delta < 0 ? 'Brown' : 'LimeGreen';
                delete p.projectedRawStats
                delete p.rawStats
            })
            //Sum Away Bench
            element.awayBenchScore = element.awayRoster
                .filter((player) => ['Bench', 'IR'].includes(player.position))
                .reduce((total, player) => total + player.totalPoints, 0);

            element.awayProjScore = element.awayRoster
                .filter((player) => ['QB', 'WR', 'RB', 'Flex', 'D/ST', 'TE', 'K'].includes(player.position))
                .reduce((projTotal, player) => projTotal + player.projectedPoints, 0);

            element.awayKickerScore = element.awayRoster
                .filter((player) => ['K'].includes(player.position))
                .reduce((projTotal, player) => projTotal + player.projectedPoints, 0);

            element.homeManager = determineOwner(leagueId, element.homeTeamId)
            element.awayManager = determineOwner(leagueId, element.awayTeamId)
        });
        console.log(matchup);
        return matchup;
    } catch (error) {
        console.error('Error fetching boxscore data:', error);
        return [];
    }
};

export const getTeamsForWeek = async (leagueId, selectedWeek) => {
    const myClient = new Client({ leagueId });
    try {
        console.log('------------Team API CALL------------');
        console.log(myClient);
        var teamData = await myClient.getTeamsAtWeek({
            seasonId: currSeasonID,
            scoringPeriodId: selectedWeek,
        })

        teamData.forEach((t) => {
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

        return teamData;
    } catch (error) {
        console.error('Error fetching boxscore data:', error);
        return [];
    }
};

export const getDraftData = async (leagueId) => {
    const api_url = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2023/segments/0/leagues/" + leagueId + "?view=mDraftDetail";
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
    console.log(draftData)
    
    return draftData
}

