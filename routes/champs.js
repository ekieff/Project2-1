const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");
const passport = require("../config/ppConfig");

//get all champs and show them
router.get("/", function(req, res)
{
    fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json")
    .then(response =>
    {
        return response.json();
    })
    .then(data =>
    {
        let allChamps = data.data;
        let allChampNames = Object.getOwnPropertyNames(allChamps);
        //console.log(allChampNames);
        res.render("lol/champs", {allChamps:allChamps, allNames:allChampNames});
    })
    .catch(err =>
    {
        console.log("ERROR: FETCH CALL FOR ALL CHAMPS DISPLAY", err);
        res.send("ERROR: FETCH CALL FOR ALL CHAMPS DISPLAY");
    });
});

router.get("/:name", function(req, res)
{
    fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json")
    .then(response =>
    {
        return response.json();
    })
    .then(data =>
    {
        let paramName = req.params.name;
        let champName = paramName.slice(0, 1) + paramName.slice(1, paramName.length);
        let champ = data.data[champName];
        //console.log(champ);
        res.render("lol/oneChamp", {champ});
    })
    .catch(err =>
    {
        console.log("ERROR: FETCH CALL FOR ONE CHAMP DISPLAY", err);
        res.send("ERROR: FETCH CALL FOR ONE CHAMP DISPLAY");
    });
});

module.exports = router;
