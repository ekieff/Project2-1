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
        console.log(allChampNames);
        res.render("lol/champs", {allChamps:allChamps, allNames:allChampNames});
    })
})

module.exports = router;
