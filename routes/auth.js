const express = require('express');
const router = express.Router();
const db = require("../models");
const passport = require("../config/ppConfig");

router.get('/signup', (req, res) => {
  let bodyClass = "ALL-CHAMPIONS";
  res.render('auth/signup', { bodyClass });
});

router.get('/login', (req, res) => 
{
  let bodyClass = "ALL-CHAMPIONS";
  res.render('auth/login', { bodyClass });
});

router.post("/signup", function(req, res)
{
  //console.log(req.body);
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
      passport.authenticate("local",
      {
        successRedirect: "/",
        successFlash: "Account created, logging in."
      })(req, res);
      //before passport authenticate
      //res.redirect("/");
    }
    else 
    {
      //email already exists
      console.log("Email already exists");
      req.flash("error", "Email already associated with an account. Please try again");
      res.redirect("/auth/signup");
    }
  })
  .catch(err =>
  {
    console.log("ErrorYEEEEEET");
    req.flash(`ERROR: ${err}.`);
    res.redirect("/auth/signup");
  });
});

router.post("/login", passport.authenticate("local", 
{
  successRedirect: "/profile",
  failureRedirect: "/auth/login",
  successFlash: "Welcome back!",
  failureFlash: "Either email or password is incorrect. Please try again."
}));

router.get("/logout", function(req, res)
{
  req.logOut();
  req.flash("success", "See you soon! Logging out.");
  res.redirect("/");
})

module.exports = router;
