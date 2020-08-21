const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");
// const passport = require("../config/ppConfig");


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
            res.render("faves/faveChamps", { bodyClass, faveChamps, user, myId, siteId });
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

router.post("/:champKey", function(req, res)
{
    //console.log(req.params.email);
    db.user.findOne(
    {
        where:
        {
            id: req.user.id
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
                    name: theChamp.name,
                    champKey: theChamp.key
                }
            })
            .then(([faveChamp, created]) =>
            {
                console.log(created);
                user.addFavechampion(faveChamp)
                .then(relationship =>
                {
                    console.log("The relationship is: ", relationship);
                    res.redirect(`/faveChamps/${user.id}`);
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
});

router.delete("/:champKey", function(req, res)
{   
    console.log("ENTERING DELETE ROUTE");

    db.favechampion.findOne(
    {
        where:
        {
            champKey: req.params.champKey
        }
    })
    .then(deleteChamp =>
    {
        let champId = deleteChamp.id;
        db.users_favechampions.destroy(
        {
            where: 
            {
                favechampionId: champId,
                userId: req.user.id
            }
        })
        .then(destroyedFaveChamp =>
        {
            res.redirect(`/faveChamps/${req.user.id}`);
        })
        .catch(err =>
        {
            console.log("ERROR: DELETION PROCESS FAILED", err);
        });
    })
    .catch(err =>
    {
        console.log("ERROR: CHAMPION TO DELETE NOT FOUND", err);
    });

});

router.put("/:champKey", function(req, res)
{
    db.user.findOne(
    {
        where:
        {
            id: req.user.id
        },
        include: [db.favechampion]
    })
    .then(user =>
    {
        let allFaves = user.favechampions;
        let lastFavesId = allFaves[allFaves.length - 1].id;

        for (let i = allFaves.length - 1; i >= 0; i--)
        {
            if (allFaves[i].id >= req.body.topNumber)
            {
                allFaves[i].id = lastFavesId + i + 1;
            }
        }

        for (let i = 0; i < allFaves.length; i++)
        {
            if (allFaves[i].champKey === req.params.champKey)
            {
                allFaves[i].id = req.body.topNumber;
                break;
            }
        }
        res.redirect(`/faveChamps/${req.user.id}`);
    })
    .catch(err =>
    {
        console.log("ERROR: FAILED TO FIND USER AND CHANGE ID OF TOP FAVECHAMP", err);
    });
});

module.exports = router;