const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");

let API_KEY = process.env.API_KEY;


router.get("/:accountId", function(req, res)
{
    
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
    
});


module.exports = router;