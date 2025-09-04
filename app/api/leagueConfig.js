// Requires leagueId to function

export default async function getLeagueSettings(leagueId) {
    
    switch (leagueId) {
        //GVL
        case 1248073066:
            var leagueSettings = {
                playoffQty: 6,
                lastRegularSeasonWeek: 14,
                finalWeek: 17,
            }
            break
        //IT
        case 601844230:
            var leagueSettings = {
                playoffQty: 6,
                lastRegularSeasonWeek: 14,
                finalWeek: 17,
            }
            break
        //family
        case 283159008:
            var leagueSettings = {
                playoffQty: 4,
                lastRegularSeasonWeek: 14,
                finalWeek: 16,
            }
            break
        //hockey
        case 1335739020:
            var leagueSettings = {
                playoffQty: 4,
                lastRegularSeasonWeek: 14,
                finalWeek: 16,
            }
            break
    };
    return (leagueSettings)
}

export async function getInfectedPlayer(weekNum) {
    const infectedPlayers = {
      //Player who is infected at the start of week:
        0: "Alex",
        1: "Alex",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: ""
    }

    for (let i = weekNum; i >= 0; i--) {
        if (infectedPlayers[i]) {
            return infectedPlayers[i];
        }
    }
    return getInfectedPlayer[weekNum]
}