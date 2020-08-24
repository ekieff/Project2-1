// const fetch = require("node-fetch");

// let array1 = [];

// async function getPlayerDets(favePlayer)
// {
//     let response = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${favePlayer}?api_key=${API_KEY}`);
//     let statsData = await response.json();
//     console.log(statsData);

//     if (!(statsData.length >= 1))
//     {
//         return "NO SOLO RANKED GAMES DATA";
//     }
//     else
//     {
//         return statsData[0].rank;
//     }
// }

// async function addToArray(favePlayers)
// { 
//     for (const player of favePlayers)
//     {
//         await getPlayerDets(player)
//         .then(playerResults =>
//         {
//             array1.push(playerResults);
//         })
//     }
//     console.log(array1);
// }


// addToArray(["M25ad07oJwlApoBM_8P6jFvJfmTBzPjNKExeqvjLQWDKabY", "q2XMy6oiAWULSDwRT6NSF3xRoMCx6uKrru8bYnLOxgQ", "5SWtKN76CzTDXMsm9OO8yTXXkbwT6A64GygQnW6PuAvzcJU"]);



// let ourPlayers = user.faveplayers;
// let stats = [];

// async function getPlayerStats(player)
// {
//     let response = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.summonerId}?api_key=${API_KEY}`);
//     let statsData = await response.json();
//     console.log(statsData);

//     if (!(statsData.length >= 1))
//     {
//         const soloRankStats = 
//         {
//             username: player.username,
//             rank: "NO SOLO RANKED GAMES DATA",
//             LP: 0,
//             winRate: "N/A"
//         };

//         const flexRankStats = 
//         {
//             username: player.username,
//             rank: "NO FLEX RANKED GAMES DATA",
//             LP: 0,
//             winRate: "N/A"
//         };
        
//         const allStats =
//         {
//             solo: soloRankStats,
//             flex: flexRankStats
//         }

//         return allStats;
//     }
//     else if (statsData.length = 1)
//     {
//         if (statsData[0].queueType === "RANKED_SOLO_5x5")
//         {
//             const soloRankStats =
//             {
//                 username: statsData[0].summonerName,
//                 rank: `${statsData[0].tier} ${statsData[0].rank}`,
//                 LP: statsData[0].leaguePoints,
//                 winRate: `${statsData[0].wins} wins (${(statsData[0].wins + statsData[0].losses)} games)`
//             };

//             const flexRankStats = 
//             {
//                 username: statsData[0].summonerName,
//                 rank: "NO FLEX RANKED GAMES DATA",
//                 LP: "N/A",
//                 winRate: "NO FLEX RANKED GAMES PLAYED"
//             };

//             const allStats =
//             {
//                 solo: soloRankStats,
//                 flex: flexRankStats
//             }

//             return allStats;
//         }
//         else
//         {
//             const flexRankStats =
//             {
//                 username: statsData[0].summonerName,
//                 rank: `${statsData[0].tier} ${statsData[0].rank}`,
//                 LP: statsData[0].leaguePoints,
//                 winRate: `${statsData[0].wins} wins (${(statsData[0].wins + statsData[0].losses)} games)`
//             };

//             const soloRankStats = 
//             {
//                 username: statsData[0].summonerName,
//                 rank: "NO SOLO RANKED GAMES DATA",
//                 LP: "N/A",
//                 winRate: "NO FLEX RANKED GAMES PLAYED"
//             }

//             const allStats =
//             {
//                 solo: soloRankStats,
//                 flex: flexRankStats
//             }

//             return allStats;
//         }
//     }
//     else
//     {
//         let soloIndex;
//         let flexIndex;

//         for (let i = 0; i < statsData.length; i++)
//         {
//             if (statsData[i].queueType === "RANKED_SOLO_5x5")
//             {
//                 soloIndex = i;
//             }
//             else
//             {
//                 flexIndex = i;
//             }
//         }

//         const soloRankStats =
//         {
//             username: ourPlayers[i].username,
//             rank: `${statsData[soloIndex].tier} ${statsData[soloIndex].rank}`,
//             LP: statsData[soloIndex].leaguePoints,
//             winRate: `${statsData[soloIndex].wins} wins (${(statsData[soloIndex].wins + statsData[soloIndex].losses)} games)`
//         };

//         const flexRankStats =
//         {
//             username: ourPlayers[i].username,
//             rank: `${statsData[flexIndex].tier} ${statsData[flexIndex].rank}`,
//             LP: statsData[flexIndex].leaguePoints,
//             winRate: `${statsData[flexIndex].wins} wins (${(statsData[flexIndex].wins + statsData[flexIndex].losses)} games)`
//         };

//         const allStats =
//         {
//             solo: soloRankStats,
//             flex: flexRankStats
//         }

//         return allStats;
//     }
// }

// async function addToStats(ourPlayers)
// { 
//     for (const player of ourPlayers)
//     {
//         await getPlayerStats(player)
//         .then(playerResults =>
//         {
//             stats.push(playerResults);
//         })
//     }
//     console.log(stats);
//     res.render('faves/favePlayers', { bodyClass, stats, myId, siteId, user, ourPlayers });
// }