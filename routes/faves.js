const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");
const passport = require("../config/ppConfig");


router.get("/:id/champs", function(req, res)
{
    console.log("YEET");
    let bodyClass = "ALL-CHAMPIONS";

    db.user.findOne(
    {
        where:
        {
            id: req.params.id
        }
    })
    .then(user =>
    {
        //console.log(user);
        res.render("faves/champs", { bodyClass });
    })
    .catch(err =>
    {
        console.log("ERROR: USER NOT FOUND FROM ID", err);
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