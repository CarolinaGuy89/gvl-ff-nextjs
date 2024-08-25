// Requires leagueId to function

export default async function getLeagueSettings(leagueId) {
    
    const leagueValues = {
        gvl: 1248073066,
        it: 601844230,
        family: 283159008,
        hockey: 1335739020,
    }

    //If the slug is passed instead of a number
    if (typeof leagueId === 'string' && leagueValues[leagueId]) {
        leagueId = leagueValues[leagueId];
    }
    
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
                playoffQty: 4,
                lastRegularSeasonWeek: 14,
                finalWeek: 16,
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

