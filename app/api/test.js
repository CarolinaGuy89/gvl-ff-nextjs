var oldArray = [{
    abbrev: "MrBB",
    currentProjectedRank: 0,
    divisionId: 0,
    draftDayProjectedRank: 1,
    id: 1,
    isActive: false,
    logo: "https://g.espncdn.com/lm-static/logo-packs/ffl/SmackTalk-LeoEspinosa/Boom-10.svg",
    logoType: "VECTOR",
    name: "Mr. Boom/Bust-ic",
    playoffSeed: 7,
    points: 1586.76,
    pointsAdjusted: 0,
    pointsDelta: 0,
    primaryOwner: "{BC463D1E-4A26-403C-936C-3CC5C4377A77}",
    rankCalculatedFinal: 10,
    rankFinal: 0,
    waiverRank: 4,
}];

const responseMap = {
  id: 'id',
  abbreviation: 'abbrev',
  logoURL: 'logo',
  gamesBack: 'gamesBack',
};

// const newArray = oldArray.map(item => {
//   const newItem = {};
  
//   for (const key in item) {
//     if (responseMap[key]) {
//       // If the key exists in the mapping, use the new key
//       newItem[responseMap[key]] = item[key];
//     } else {
//       // Otherwise, retain the original key
//       newItem[key] = item[key];
//     }
//   }
  
//   return newItem;
// });
const newArray = oldArray.map(item => {
    var newItem = {};
  
    for (const newKey in responseMap) {
      const oldKey = responseMap[newKey];
      if (item.hasOwnProperty(oldKey)) {
        newItem[newKey] = item[oldKey];
      }
    }
  
    // Add other fields that are not in the responseMap
    for (const key in item) {
      if (!Object.values(responseMap).includes(key)) {
        newItem[key] = item[key];
      }
    }
    
    return newItem;
  });
  
  

console.log(newArray);
