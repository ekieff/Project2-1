const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");
const passport = require("../config/ppConfig");


router.get("/:id/champs", function(req, res)
{
    console.log("YEET");
    let bodyClass = "ALL-CHAMPIONS";
    let myId = req.user.id;
    console.log("YEEEEET" + myId);

    db.user.findOne(
    {
        where:
        {
            id: req.params.id
        },
        include: [db.favechampion]
    })
    .then(user =>
    {
        //console.log(user);

        fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json")
        .then(response =>
        {
            return response.json();
        })
        .then(data =>
        {
            let faveChamps = [];
            let allChamps = data.data;
            let champProperties = Object.getOwnPropertyNames(allChamps);

            user.favechampions.forEach(champ =>
            {
                champProperties.forEach(champProperty =>
                {
                    if (champ.name === allChamps[champProperty].name)
                    {
                        faveChamps.push(allChamps[champProperty]);
                    }
                })
            })
            res.render("faves/faveChamps", { bodyClass, faveChamps, user, myId });
        })
        .catch(err =>
        {
            console.log("ERROR: FETCHING CHAMPS FOR FAVE CHAMPS FROM API", err);
        })

    })
    .catch(err =>
    {
        console.log("ERROR: USER NOT FOUND FROM ID OR FAVE CHAMP ISSUE", err);
    });
});

router.post("/champs/:email/:champKey", function(req, res)
{
    //console.log(req.params.email);
    db.user.findOne(
    {
        where:
        {
            email: req.params.email
        }
    })
    .then(user => 
    {
        //console.log(user.id);

        fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json")
        .then(response =>
        {
            return response.json();
        })
        .then(data =>
        {
            let theChamp;
            let allChamps = data.data;
            let allNames = Object.getOwnPropertyNames(allChamps);

            allNames.forEach(name =>
            {
                if (allChamps[name].key == req.params.champKey)
                {
                    theChamp = allChamps[name];
                }
            });

            db.favechampion.findOrCreate(
            {
                where:
                {
                    name: theChamp.name
                }
            })
            .then(([faveChamp, created]) =>
            {
                console.log(created);
                user.addFavechampion(faveChamp)
                .then(relationship =>
                {
                    console.log("The relationship is: ", relationship);
                    res.redirect(`/faves/${user.id}/champs`);
                })
                .catch(err =>
                {
                    console.log("ERROR: CHAMP TO USER RELATIONSHIP FAILED", err);
                });
            })
            .catch(err =>
            {
                console.log("ERROR: CHAMP NOT CREATED OR FOUND IN DATABASE", err);
            });
        })
        .then(err =>
        {
            console.log("ERROR: CHAMPION FOR FAVES NOT FETCHED PROPERLY", err);
        });

    })
    .catch(err =>
    {
        console.log("ERROR: USER NOT FOUND", err);
    });
})


module.exports = router;