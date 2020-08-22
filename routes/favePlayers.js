const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");

let API_KEY = process.env.API_KEY;


router.get("/:id", function(req, res)
{
    let bodyClass = "ALL-CHAMPIONS";
    let myId = req.user.id;
    let siteId = req.params.id;

    db.user.findOne(
    {
        where:
        {
            id: req.params.id
        },
        include: [db.faveplayer]
    })
    .then(user =>
    {
        let ourPlayers = user.faveplayers;
        let stats = [];

        async function getPlayerStats(player)
        {
            let response = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.summonerId}?api_key=${API_KEY}`);
            let statsData = await response.json();
            console.log(statsData);

            if (!(statsData.length >= 1))
            {
                const soloRankStats = 
                {
                    username: player.username,
                    rank: "NO SOLO RANKED GAMES",
                    LP: 0,
                    winRate: "N/A"
                };

                const flexRankStats = 
                {
                    username: player.username,
                    rank: "NO FLEX RANKED GAMES",
                    LP: 0,
                    winRate: "N/A"
                };
                
                const allStats =
                {
                    solo: soloRankStats,
                    flex: flexRankStats
                }

                return allStats;
            }
            else if (statsData.length === 2 &&
            ((statsData[0].queueType === "RANKED_SOLO_5x5" && statsData[1].queueType === "RANKED_FLEX_SR") || 
            (statsData[1].queueType === "RANKED_SOLO_5x5" && statsData[0].queueType === "RANKED_FLEX_SR")))
            {
                let soloIndex;
                let flexIndex;

                if (statsData[0].queueType === "RANKED_SOLO_5x5")
                {
                    soloIndex = 0;
                    flexIndex = 1;
                    
                }
                else
                {
                    soloIndex = 1;
                    flexIndex = 0;
                }
                

                const soloRankStats =
                {
                    username: statsData[soloIndex].summonerName,
                    rank: `${statsData[soloIndex].tier} ${statsData[soloIndex].rank}`,
                    LP: statsData[soloIndex].leaguePoints,
                    winRate: `${statsData[soloIndex].wins} wins (${(statsData[soloIndex].wins + statsData[soloIndex].losses)} games)`
                };

                const flexRankStats =
                {
                    username: statsData[soloIndex].summonerName,
                    rank: `${statsData[flexIndex].tier} ${statsData[flexIndex].rank}`,
                    LP: statsData[flexIndex].leaguePoints,
                    winRate: `${statsData[flexIndex].wins} wins (${(statsData[flexIndex].wins + statsData[flexIndex].losses)} games)`
                };

                const allStats =
                {
                    solo: soloRankStats,
                    flex: flexRankStats
                }

                return allStats;
            }
            else if (statsData[0].queueType === "RANKED_SOLO_5x5")
            {
                const soloRankStats =
                {
                    username: statsData[0].summonerName,
                    rank: `${statsData[0].tier} ${statsData[0].rank}`,
                    LP: statsData[0].leaguePoints,
                    winRate: `${statsData[0].wins} wins (${(statsData[0].wins + statsData[0].losses)} games)`
                };

                const flexRankStats = 
                {
                    username: statsData[0].summonerName,
                    rank: "NO FLEX RANKED GAMES",
                    LP: 0,
                    winRate: "N/A"
                };

                const allStats =
                {
                    solo: soloRankStats,
                    flex: flexRankStats
                }

                return allStats;
            }
            else
            {
                const flexRankStats =
                {
                    username: statsData[0].summonerName,
                    rank: `${statsData[0].tier} ${statsData[0].rank}`,
                    LP: statsData[0].leaguePoints,
                    winRate: `${statsData[0].wins} wins (${(statsData[0].wins + statsData[0].losses)} games)`
                };

                const soloRankStats = 
                {
                    username: statsData[0].summonerName,
                    rank: "NO SOLO RANKED GAMES",
                    LP: 0,
                    winRate: "N/A"
                }

                const allStats =
                {
                    solo: soloRankStats,
                    flex: flexRankStats
                }

                return allStats;
            }
        }

        async function addToStats(ourPlayers)
        { 
            for (const player of ourPlayers)
            {
                await getPlayerStats(player)
                .then(playerResults =>
                {
                    stats.push(playerResults);
                })
            }
            console.log(stats);
            res.render('faves/favePlayers', { bodyClass, stats, myId, siteId, user, ourPlayers });
        }

        addToStats(ourPlayers);
    })
    .catch(err =>
    {
        console.log("ERROR: FINDING USER", err);
    });
});

router.post("/", function(req, res)
{
    db.user.findOne(
    {
        where:
        {
            id: req.user.id
        }
    })
    .then(user =>
    {
        fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.summonerName}?api_key=${API_KEY}`)
        .then(response =>
        {
            return response.json();
        })
        .then(playerData =>
        {
            db.faveplayer.findOrCreate(
            {
                where:
                {
                    username: req.body.summonerName,
                    accountId: playerData.accountId,
                    summonerId: playerData.id
                }
            })
            .then(([favePlayer, created]) =>
            {
                console.log(created);
                user.addFaveplayer(favePlayer)
                .then(relationship =>
                {
                    console.log("The relationship is: ", relationship);
                    res.redirect("/profile");
                })
                .catch(err =>
                {
                    console.log("ERROR: PLAYER TO USER RELATIONSHIP FAILED", err);
                });
            })
            .catch(err =>
            {
                console.log("ERROR: FAILED TO FIND OR CREATE FAVEPLAYER", err);
            })
        })
        .catch(err =>
        {
            console.log("ERROR: FAIL TO FETCH PLAYERDATA", err);
        })
    })
    .catch(err =>
    {
        console.log("ERROR: COULDN'T FIND USER", err);
    })
});

router.delete("/:summonerName", function(req, res)
{
    db.faveplayer.findOne(
    {
        where:
        {
            username: req.params.summonerName
        }
    })
    .then(player =>
    {
        db.users_faveplayers.destroy(
        {
            where: 
            {
                faveplayerId: player.id,
                userId: req.user.id
            }
        })
        .then(destroyedFavePlayerAssociation =>
        {
            res.redirect(`/favePlayers/${req.user.id}`);
        })
        .catch(err =>
        {
            console.log("ERROR: DELETION PROCESS FOR ASSOCIATION FAILED", err);
        });
    })
    .catch(err =>
    {
        console.log("ERROR: COULD NOT FIND PLAYER", err);
    });

});


module.exports = router;