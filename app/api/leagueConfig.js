
export default async function getLeagueSettings(leagueId) {
    switch (leagueId) {
        //GVL
        case 1248073066:
            var leagueSettings = {
                playoffQty: 6,
                lastRegularSeasonWeek: 14
            }
            break
        //IT
        case 601844230:
            var leagueSettings = {
                playoffQty: 4,
                lastRegularSeasonWeek: 14
            }
            break
        //family
        case 283159008:
            var leagueSettings = {
                playoffQty: 4,
                lastRegularSeasonWeek: 15
            }
            break
        //hockey
        case 1335739020:
            var leagueSettings = {
                playoffQty: 4,
                lastRegularSeasonWeek: 14
            }
            break
    };
    return (leagueSettings)
}

