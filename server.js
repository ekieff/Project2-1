require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const fetch = require("node-fetch");
const session = require("express-session");
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require('./config/ppConfig');
const flash = require("connect-flash");
const db = require('./models')
const methodOverride = require("method-override");

//require the authorization middleware at the top of the page
const isLoggedIn = require("./middleware/isLoggedIn");

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride("_method"));

//secret: what we are actually giving the user to use our site
//resave: save the session even if it's modified, make this false
//saveUninitialized: if we have a new session, we'll save it, therefore, setting this to true
app.use(session(
{
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

//initialize passport and run session as middleware
app.use(passport.initialize());
app.use(passport.session());

//flash for temporary messages to the user
app.use(flash());

//middleware to have our message accessible for every view
app.use(function(req, res, next)
{
  //before every route we will attach our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  //console.log(res.locals.currentUser);
  next();
});

app.get('/', (req, res) => {
  console.log(res.locals.alerts);
  let bodyClass = "ALL-CHAMPIONS";

  fetch("https://www.reddit.com/r/leagueoflegends.json?limit=70")
  .then(response =>
  {
    //return data as json data
    return response.json();
  })
  .then(gameplayData =>
  {
    //console.log(gameplayData);
    let gameplay = gameplayData.data.children;
    let gameplayVideos = [];
    let gameplayPost = [];

    gameplay.forEach(arrayElement =>
    {
      if (arrayElement.data.is_video && !arrayElement.data.over_18 && arrayElement.data.media.reddit_video.duration < 45 && arrayElement.data.media.reddit_video.fallback_url !== "https://v.redd.it/8vgc2ildd5i51/DASH_480.mp4?source=fallback")
      {
        gameplayVideos.push(arrayElement.data.media.reddit_video);
        gameplayPost.push(arrayElement.data);
      }
    })

    //console.log(gameplayVideos);

    let goodImageData = [];
    fetch("https://www.reddit.com/r/LoLFanArt.json?limit=100")
    .then(response =>
    {
      return response.json();
    })
    .then(imageData =>
    {
      let images = imageData.data.children;
      images.forEach(image =>
      {
        if (image.data.url.substr(image.data.url.length - 3, image.data.url.length) === "png" || image.data.url.substr(image.data.url.length - 3, image.data.url.length) === "jpg")
        {
          goodImageData.push(image.data);
        }
      });
      //console.log(goodImageData.length);
      res.render('index', { alerts: res.locals.alerts, bodyClass, gameplayVideos, gameplayPost, goodImageData });
    })
    .catch(err =>
    {
      console.log("ERROR: FETCH CALL FOR SPLASH ART FAILED", err);
    });

  })
  .catch(err =>
  {
    console.log("ERROR: REDDIT API ERROR", err);
  });
});

app.get('/profile', isLoggedIn, (req, res) => 
{
  let bodyClass = "ALL-CHAMPIONS";
  res.render('lol/profile', { bodyClass });
});

app.use('/auth', require('./routes/auth'));
app.use('/champs', require('./routes/champs'));
app.use('/faveChamps', require('./routes/faveChamps'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
