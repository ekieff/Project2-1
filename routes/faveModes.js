const express = require('express');
const router = express.Router();
const db = require("../models");


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
        include: [db.favemode]
    })
    .then(user =>
    {
        //console.log(user);
        let gameModes = ["Ascension", "Black Market Brawlers", "Dark Star: Singularity", "Definitely Not Dominion", 
        "Doom Bots", "Hexakill", "Hunt of the Blood Moon", "Invasion", "Legend of the Poro King", 
        "Nemesis Draft", "Nexus Blitz", "Nexus Siege", "Odyssey: Extraction", "One for All", "OVERCHARGE", 
        "Snowdown Showdown", "Ultra Rapid Fire"];
        let modeIndex = [];

        let allFaves = user.favemodes;

        user.favemodes.forEach(faveMode =>
        {
            modeIndex.push(gameModes.indexOf(faveMode.name));
        });
        
        res.render("faves/faveModes", { bodyClass, allFaves, user, myId, siteId, modeIndex });
    })
    .catch(err =>
    {
        console.log("ERROR: USER NOT FOUND FROM ID OR FAVE MODE ISSUE", err);
    });
});

router.delete("/", function(req, res)
{   
    console.log("ENTERING DELETE ROUTE");

    db.favemode.findOne(
    {
        where:
        {
            name: req.body.deleteMode
        }
    })
    .then(deletemode =>
    {
        let modeId = deletemode.id;
        db.users_favemodes.destroy(
        {
            where: 
            {
                favemodeId: modeId,
                userId: req.user.id
            }
        })
        .then(destroyedFaveModeAssociation =>
        {
            res.redirect(`/faveModes/${req.user.id}`);
        })
        .catch(err =>
        {
            console.log("ERROR: DELETION PROCESS FOR ASSOCIATION FAILED", err);
        });
    })
    .catch(err =>
    {
        console.log("ERROR: MODE TO DELETE NOT FOUND", err);
    });

});

module.exports = router;