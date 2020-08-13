const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post("/signup", function(req, res)
{
  console.log(req.body);
  db.user.findOrCreate(
  {
    where:
    {
      email: req.body.email
    },
    defaults:
    {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then(([user, created]) =>
  {
    if (created)
    {
      //if created, success and redirect to home
      console.log(`${user.name} was created`);
      res.redirect("/");
    }
    else 
    {
      //email already exists
      console.log("Email already exists");
      res.redirect("/auth/signup");
    }
  })
  .catch(err =>
  {
    console.log("Error");
    res.redirect("/auth/signup");
  });
});

module.exports = router;
