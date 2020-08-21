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

const request = require("request"); //alternative to axios
const cheerio = require("cheerio"); //import cheerio
const URL = "https://na.leagueoflegends.com/en-us/champions/";

let API_KEY = process.env.API_KEY;

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
  let bodyClass = "ONE-CHAMPION";

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
        res.render('index', { alerts: res.locals.alerts, bodyClass, gameplayVideos, gameplayPost, goodImageData, allImages });  
      });
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

  db.user.findOne(
  {
    where: 
    {
      id: res.locals.currentUser.dataValues.id
    },
    include: [db.favechampion, db.faveplayer]
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
      });

      let allPlayers = user.faveplayers;

      fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user.name}?api_key=${API_KEY}`)
      .then(anotherResponse =>
      {
        return anotherResponse.json();
      })
      .then(userData =>
      {
        const account =
        {
          username: userData.name,
          accountId: userData.accountId,
          summonerId: userData.id,
          level: userData.summonerLevel
        }

        fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${account.summonerId}?api_key=${API_KEY}`)
        .then(statsResponse =>
        {
          return statsResponse.json();
        })
        .then(statsData =>
        {
          let soloIndex;
          let flexIndex;

          for (let i = 0; i < statsData.length; i++)
          {
            if (statsData[i].queueType === "RANKED_SOLO_5x5")
            {
              soloIndex = i;
            }
            else
            {
              flexIndex = i;
            }
          }

          const soloRankStats =
          {
            username: statsData[soloIndex].summonerName,
            rank: `${statsData[soloIndex].tier} ${statsData[soloIndex].rank}`,
            LP: statsData[soloIndex].leaguePoints,
            winRate: `${statsData[soloIndex].wins} wins (${(statsData[soloIndex].wins + statsData[soloIndex].losses)} games)`
          };

          const flexRankStats =
          {
            username: statsData[flexIndex].summonerName,
            rank: `${statsData[flexIndex].tier} ${statsData[flexIndex].rank}`,
            LP: statsData[flexIndex].leaguePoints,
            winRate: `${statsData[flexIndex].wins} wins (${(statsData[flexIndex].wins + statsData[flexIndex].losses)} games)`
          };

          db.favechampion.findAll(
          {
            where:
            {
              topFive: "true"
            }
          })
          .then(allTop =>
          {
            allTopChamps = [];
            allTop.forEach(topChamp =>
            {
              champProperties.forEach(champProperty =>
              {
                if (topChamp.name === allChamps[champProperty].name)
                {
                  allTopChamps.push(allChamps[champProperty]);
                }
              })
            });
            res.render('lol/profile', { bodyClass, faveChamps, allTopChamps, user, soloRankStats, flexRankStats, allPlayers });
          })
          .catch(err =>
          {
              console.log("ERROR: TOP CHAMP NOT FOUND OR ADDED", err);
          });
        })
        .catch(err =>
        {
          console.log("ERROR: FETCHING RANK STATS", err);
        });
        
      })
      .catch(err =>
      {
        console.log("ERROR: FETCH LEAGUE ACCOUNT INFO", err);
      });
    })
    .catch(err =>
    {
      console.log("ERROR: FETCHING CHAMPS FOR FAVE CHAMPS FROM API FOR PROFILE", err);
    })
  })
  .catch(err =>
  {
    console.log("ERROR: FETCHING CHAMPS FOR FAVE CHAMPS FROM API", err);
  })
});

app.use('/auth', require('./routes/auth'));
app.use('/champs', require('./routes/champs'));
app.use('/faveChamps', require('./routes/faveChamps'));
app.use('/favePlayers', require('./routes/favePlayers'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
