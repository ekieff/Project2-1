const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");
const request = require("request"); //alternative to axios
const cheerio = require("cheerio"); //import cheerio
const URL = "https://na.leagueoflegends.com/en-us/champions/";

//get all champs and show them
router.get("/", function(req, res)
{
    let bodyClass = "ALL-CHAMPIONS";
    fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json")
    .then(response =>
    {
        return response.json();
    })
    .then(data =>
    {
        let allChamps = data.data;
        let allNames = Object.getOwnPropertyNames(allChamps);
        //console.log(allNames);

        let allImages = [];
        request(URL, (error, response, body) =>
        {
            let $ = cheerio.load(body);
            let images = $(".style__ImageContainer-sc-12h96bu-1");
            images.each((index, element) =>
            {
                allImages.push($(element).find("img").attr("src"));
            })
            //console.log(eachImage);
            res.render("lol/champs", {allNames, allChamps, champImages:allImages, bodyClass});
        });
    })
    .catch(err =>
    {
        console.log("ERROR: FETCH CALL FOR ALL CHAMPS DISPLAY", err);
        res.send("ERROR: FETCH CALL FOR ALL CHAMPS DISPLAY");
    });
});

router.get("/:name", function(req, res)
{
    let bodyClass = "ONE-CHAMPION";
    fetch(`http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/${ req.params.name }.json`)
    .then(response =>
    {
        return response.json();
    })
    .then(data =>
    {
        let theChamp = data.data[req.params.name];
        //console.log(theChamp);
        res.render("lol/oneChamp", {theChamp, bodyClass});
    })
    .catch(error =>
    {
        console.log("ERROR: FETCH CALL FOR ONE CHAMP DISPLAY", error);
        res.send("ERROR: FETCH CALL FOR ONE CHAMP DISPLAY");
    })
});

module.exports = router;
