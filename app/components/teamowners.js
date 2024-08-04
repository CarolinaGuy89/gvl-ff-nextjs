
export function determineOwner (leagueId, teamid){ 
    var manager = "name";
    switch(leagueId) {
    //GVL
    case 1248073066:
        switch(teamid){
            case 1:
                manager = "Sam";
                break
            case 2:
                manager = "Alex";
                break
            case 3:
                manager = "Art";
                break
            case 4:
                manager = "Matt";
                break
            case 5:
                manager = "Ryan";
                break
            case 6:
                manager = "Steven";
                break
            case 7:
                manager = "Cody";
                break
            case 8:
                manager = "Cale";
                break
            case 9:
                manager = "Marty";
                break
            case 10:
                manager = "Russ";
                break                  
        }
        break
    //Family
    case 283159008:
        switch(teamid){
            case 1:
                manager = "Steven";
                break
            case 2:
                manager = "Sam";
                break
            case 3:
                manager = "Brenda";
                break
            case 4:
                manager = "Allison";
                break
            case 5:
                manager = "Sheila";
                break
            case 6:
                manager = "Josh";
                break
            case 7:
                manager = "Fred";
                break
            case 8:
                manager = "Kayla";
                break                
        }
        break
    //Work
    case 601844230:
        switch(teamid){
            case 1:
                manager = "Steven";
                break
            case 2:
                manager = "Jay";
                break
            case 3:
                manager = "Horace";
                break
            case 4:
                manager = "Charles";
                break
            case 5:
                manager = "Rob";
                break
            case 6:
                //2023 manager = "Harminder";
                manager = "Markus";
                break
            case 7:
                manager = "Gouri";
                break
            case 8:
                manager = "Ted";
                break
            case 9:
                //2023 manager = "Raju";
                manager = "Paul";
                break
            case 10:
                manager = "Milton";
                break                  
        }
        break
    //Hockey
    case 1335739020:
        switch(teamid){
            case 1:
                manager = "Steven";
                break
            case 2:
                manager = "Rob";
                break
            case 3:
                manager = "Vince";
                break
            case 4:
                manager = "Jack";
                break
            case 5:
                manager = "Grant";
                break
            case 6:
                manager = "Alex";
                break
            case 7:
                manager = "Mike";
                break
            case 9:
                manager = "Markus";
                break                
        }
        break
    }
    return (manager);
}