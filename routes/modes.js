const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const db = require("../models");

router.get("/", function(req, res)
{
  let bodyClass = "ALL-CHAMPIONS";

  res.render('lol/modes', { bodyClass });  
})

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
    //console.log(user.id);
    db.favemode.findOrCreate(
    {
      where:
      {
        name: req.body.name
      }
    })
    .then(([faveMode, created]) =>
    {
      console.log(created);
      user.addFavemode(faveMode)
      .then(relationship =>
      {
          console.log("The relationship is: ", relationship);
          res.redirect("/modes")
      })
      .catch(err =>
      {
        console.log("ERROR: MODE TO USER RELATIONSHIP FAILED", err);
      });
    })
    .catch(err =>
    {
      console.log("ERROR: MODE NOT CREATED OR FOUND IN DATABASE", err);
    });
  });
});

module.exports = router;
