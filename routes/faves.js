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
        console.log(user);
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
        res.redirect(`/faves/${user.id}/champs`);
    })
    .catch(err =>
    {
        console.log("ERROR: USER NOT FOUND", err);
    });
})


module.exports = router;