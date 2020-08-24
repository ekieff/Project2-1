# Project 2 - League of Legends (imjchiang-lolinfo)

## Purpose
To display data from league of legends on specific players and allow players to create accounts to add favorite teammates, champions, and game modes from league of legends.

## Technologies Used
- node.js, PostgreSQL, Sequelize, JS, EJS, CSS
- passport, passport-local, flash: authentification and messages on authentification
- dotenv: hold session secret and api keys
- express, express-session, express-ejs-layouts: routing and layout for EJS
- fetch: getting data from APIs
- request, cheerio: web scraping
- method-override: get and post route override (put and delete)
- bootstrap: for more cool CSS options
- heroku: deploy site

## Installation Instructions
1. go to GIT REPOSITORY LINK HERE
2. fork and clone the repository
    - image of fork
    - img of link
    - git clone REPOSITORY
3. install all node packages
    - npm i
4. create the database
    - createdb -U <username> league_of_L
5. confirm database name is the same in the config/config.json
6. if on MAC, remove all <username> and <password> entities in the config.json
6. if on WINDOWS or LINUX, change <username> and <password> entries to the username and password of your database
7. migrate the models to the database
    - sequelize db:migrate
8. add a .env file with the following field: 
    - SESSION_SECRET: Can be any random string; usually a hash in production
9. run the server!
    - nodemon
    - node server.js

## Heroku Initialization
1. Get heroku account
2. If MAC: ```brew tap heroku/brew && brew install heroku```
2. If WINDOWS or LINUX: install heroku graphically
3. ```heroku login```
4. Make sure you're using ```app.listen(process.env.PORT || 3000)``` 
5. ```touch Procfile``` (make sure it's capitalized)
6. In ```Procfile``` add ```web: node server.js``` and save the Procfile
7. Provide access to the ```sequelize-cli```
    - if it's not in package.json ```npm i sequelize-cli```
    - heroku will create it's own node modules folder
8. Host the app with ```heroku app:create imjchiang-lolinfo```
9. Check for heroku with ```git remote - v``` and commit to github with add, commit, push
10. ```git push heroku master```
    - check for errors with ```heroku logs```
11. Set up the database with heroku
    - ```heroku config:set SECRET_SESSION="SECRET-SESSION-KEY-HERE"```
    - Add everything in ```.env``` to heroku through this method
12. Create your database
    - install Postgres on heroku with ```heroku addons:create heroku-postgresql:hobby-dev```
    - Check for db with ```heroku config```
    - Set up production settings in ```config.json```
    - add ```"use_env_variable": "DATABASE_URL"```
    - git add, commit, push to github first, then ```git push heroku master```
    - migrate the database with ```heroku run sequelize db:migrate```
13. Test your website by creating a new user
    - Open your app with ```heroku open```
    - Alternatively, the url will be using the name you gave your app in the url like so: https://imjchiang-lolinfo.heroku.com

## Models
```sequelize model:create --name favechampion --attributes name:string,champKey:string,topFive:string,user:string```

```sequelize model:create --name favematch --attributes gameId:integer,region:string,season:integer,championKey:integer```

```sequelize model:create --name favemode --attributes name:string```

```sequelize model:create --name faveplayer --attributes username:string,accountId:string,summonerId:string,region:string```

```sequelize model:create --name users_favechampions --attributes userId:integer,favechampionId:integer```

```sequelize model:create --name users_favematches --attributes userId:integer,favematchId:integer```

```sequelize model:create --name users_favemodes --attributes userId:integer,favemodeId:integer```

```sequelize model:create --name users_faveplayers --attributes userId:integer,faveplayerId:integer```

```sequelize model:create --name player --attributes username:string,accountId:string,summonerId:string,region:string,rank:string,level:integer,games:integer,winRate:integer,kda:integer```

## Planning

### ERD
Link: https://drive.google.com/file/d/11LEb-omNQcTzm9VshVkEJlodRLQwnbty/view?usp=sharing

### Wireframes
Some of the wireframes (took me way too long to make these):

![home.ejs](/public/wireframes/home.ejs.png)
![general/allChamps.ejs](/public/wireframes/general-allChamps.ejs.png)
![general/specificChamps.ejs](/public/wireframes/general-specificChamps.ejs.png)
![player-showStats.ejs](/public/wireframes/player-showStats.ejs.png)

## Rundown Progress
-  08.13.2020 - complete main auth (led by @Romebell)
    - skeleton setup
    - validation for passowrd
    - user creation validation
    - passport implementation
    - flash implementation initialization
- 08.14.2020
    - currentUser logic
    - flash implementation completion
- 08.16.2020
    - set up database
    - familiarize with league of legends api
    - fetch all champs
    - set up champs route
    - styling all champs
- 08.17.2020
    - all champs styling
    - specific champ route
    - fetch specific champs
    - styling one champ
    - style home page
    - add basic elements to home page
- 08.18.2020
    - add videos for specific champs
    - BLOCKER 1:
    - data manipulation from league api for specific champs
    - BLOCKER 2: html tags showing in description for abilities
    - splash art carousels
    - BLOCKER 3: video hover pause
- 08.19.2020
    - complete BLOCKERS 1, 2, 3
    - add champs to nav
    - splash art styling
    - validation for user to add to faves
    - home logo
    - styling nav and all pages
    - champ redirection and routes
    - BLOCKER 4: association for favechampions
- 08.20.2020
    - complete BLOCKER 4
    - heroku initialized and deployed
    - add heroku database and configs
    - faveChamps route and page
    - BLOCKER 5: delete route for faveChamps
    - user validation for faves
    - BLOCKER 6: put route for faveChamps
    - PATCH 1: remove bad video
- 08.21.2020
    - complete BLOCKERS 5, 6
    - add rank info
    - implement top faveChamps put route
    - fix rank flip bug
    - faveplayers routes and page
    - add champ content to home page
    - styling home page and all pages
    - BLOCKER 7: rank stats fetched but not sent right
    - complete BLOCKER 7
- 08.22.2020
    - implement solution to BLOCKER 7
    - fix rank data collection
    - (less progress today: roadtrip from norcal to LA and back to move out of stuff out of LA apartment)
- 08.23.2020
    - implement game modes
    - add images for game modes
    - general styling
- 08.24.2020
    - complete game mode page
    - add favemodes routes
    - user verification for faves
    - BLOCKER 8: unable to access profile
    - complete BLOCKER 8
        - UPDATE API_KEY!!!
    - fix top fave champs (user validation)
    - button text for faves
    - game modes link text
    - general styling
    - edit README.md

## Code Snippet Examples
There is a lot of code I wrote, so these are examples of the types of code I had to write.

### CRUD

#### GET ROUTE
```javascript
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
        include: [db.favechampion]
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
            })
            res.render("faves/faveChamps", { bodyClass, faveChamps, user, myId, siteId });
        })
        .catch(err =>
        {
            console.log("ERROR: FETCHING CHAMPS FOR FAVE CHAMPS FROM API", err);
        })

    })
    .catch(err =>
    {
        console.log("ERROR: USER NOT FOUND FROM ID OR FAVE CHAMP ISSUE", err);
    });
});
```
- PURPOSE: gets the favorite champions associated with the user
    - myId and siteId used for user verification in faveChamps.ejs
    - fetch call to league API for champion data

#### POST ROUTE
```javascript
router.post("/:champKey", function(req, res)
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
        fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json")
        .then(response =>
        {
            return response.json();
        })
        .then(data =>
        {
            let theChamp;
            let allChamps = data.data;
            let allNames = Object.getOwnPropertyNames(allChamps);

            allNames.forEach(name =>
            {
                if (allChamps[name].key == req.params.champKey)
                {
                    theChamp = allChamps[name];
                }
            });

            db.favechampion.findOrCreate(
            {
                where:
                {
                    name: theChamp.name,
                    champKey: theChamp.key,
                    user: req.user.id,
                    topFive: "false"
                }
            })
            .then(([faveChamp, created]) =>
            {
                console.log(created);
                user.addFavechampion(faveChamp)
                .then(relationship =>
                {
                    console.log("The relationship is: ", relationship);
                    res.redirect(`/faveChamps/${user.id}`);
                })
                .catch(err =>
                {
                    console.log("ERROR: CHAMP TO USER RELATIONSHIP FAILED", err);
                });
            })
            .catch(err =>
            {
                console.log("ERROR: CHAMP NOT CREATED OR FOUND IN DATABASE", err);
            });
        })
        .then(err =>
        {
            console.log("ERROR: CHAMPION FOR FAVES NOT FETCHED PROPERLY", err);
        });
    })
    .catch(err =>
    {
        console.log("ERROR: USER NOT FOUND", err);
    });
});
```
- PURPOSE: getting a champion based on the champion key and adding it to the favechampions table associated to the user
    - verify user in database
    - fetch champion data from league API
    - access associated favechampions table
    - find if champion has been added (if not, add it)
    - redirect to the faveChamps.ejs page for the user

#### DELETE ROUTE
```javascript
router.delete("/:champKey", function(req, res)
{   
    db.favechampion.findOne(
    {
        where:
        {
            champKey: req.params.champKey,
            user: req.user.id
        }
    })
    .then(deleteChamp =>
    {
        let champId = deleteChamp.id;
        db.users_favechampions.destroy(
        {
            where: 
            {
                favechampionId: champId,
                userId: req.user.id
            }
        })
        .then(destroyedFaveChampAssociation =>
        {
            db.favechampion.destroy(
            {
                where: 
                {
                    champKey: req.params.champKey,
                    user: req.user.id
                }
            })
            .then(destroyedFaveChamp =>
            {
                res.redirect(`/faveChamps/${req.user.id}`);
            })
            .catch(err =>
            {
                console.log("ERROR: DELETION PROCESS FOR FAVECHAMP FAILED", err);
            })
        })
        .catch(err =>
        {
            console.log("ERROR: DELETION PROCESS FOR ASSOCIATION FAILED", err);
        });
    })
    .catch(err =>
    {
        console.log("ERROR: CHAMPION TO DELETE NOT FOUND", err);
    });
});
```
- PURPOSE: find the favechampion from the champion key and delete the association and the favechampion itself
    - verify the favechampion and the user
    - destroy the association based on favechampion and user
    - destroy the favechampion based on user
    - redirect to the faveChamps.ejs page for the user

#### PUT ROUTE
```javascript
router.put("/top/:champKey", function(req, res)
{
    db.favechampion.update(
    {
        topFive: "true"
    },
    {
        where:
        {
            champKey: req.params.champKey,
            user: req.user.id
        }
    })
    .then((updatedChamp) =>
    {
        res.redirect(`/faveChamps/${req.user.id}`);
    })
    .catch(() =>
    {
    });
});
```
- PURPOSE: edit the topFive value of the already created favechampion for display on profile
    - verify the favechampion and the user
    - update the value topFive of the favechampion
    - redirect to the faveChamps.ejs page for the user

### FETCH and WEB SCRAPING

#### FETCH
```javascript
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
        if (arrayElement.data.is_video && !arrayElement.data.over_18 && arrayElement.data.media.reddit_video.duration < 45 && 
        arrayElement.data.media.reddit_video.fallback_url !== "https://v.redd.it/8vgc2ildd5i51/DASH_480.mp4?source=fallback" && 
        arrayElement.data.media.reddit_video.fallback_url !== "https://v.redd.it/vdigjslltdi51/DASH_1080.mp4?source=fallback" &&
        arrayElement.data.media.reddit_video.fallback_url !== "https://v.redd.it/2snzscnfqsi51/DASH_1080.mp4?source=fallback")
        {
        gameplayVideos.push(arrayElement.data.media.reddit_video);
        gameplayPost.push(arrayElement.data);
        }
    });
})
.catch(err =>
{
    console.log("ERROR: REDDIT API ERROR", err);
});
```
- PURPOSE: API call to reddit to get videos of league of legends gameplay
    - fetch call to endpoint URL
    - takes the data and checks if it is...
        - a video post
        - not a NSFW post
        - video post is less than 45 seconds long
        - it is not any of the videos that I have found to be annoying or irrelevant
    - pushes the data into arrays for later use

```javascript
fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${account.summonerId}?api_key=${API_KEY}`)
.then(statsResponse =>
{
    return statsResponse.json();
})
.then(statsData =>
{
    //some other code here
    res.render('lol/profile', { /* bodyClass, faveChamps, allTopChamps, user, */ statsData /* , allPlayers, allFaveModes, modeIndex */ });
    //some other code here
})
.catch(err =>
{
    console.log("ERROR: FETCHING RANK STATS", err);
});
```
- PURPOSE: API call to league of legends (endpoint type: API key required) to get rank data of a summoner from the summoner key and with the use of an API key
    - fetch call to the endpoint URL with a parameter and an API key
    - takes data and outputs it to the rendering page for later use

```javascript
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
            if (champ.name === allChamps[champProperty].name && champ.user === res.locals.currentUser.dataValues.id)
            {
                faveChamps.push(allChamps[champProperty]);
            }
        })
    });

    //some other code here

.catch(err =>
{
    console.log("ERROR: FETCHING CHAMPS FOR FAVE CHAMPS FROM API FOR PROFILE", err);
});
```
- PURPOSE: API call to league of legends (endpoint type: no API key required) to get champion data
    - fetch call to the endpoint URL
    - checks data to see if it the champ in the data matches the champ that needs to be used in the database
    - pushes the data into an array for later use

#### WEB SCRAPING
``` javascript
const request = require("request");
const cheerio = require("cheerio");
const URL = "https://na.leagueoflegends.com/en-us/champions/";

//some other code here

let allImages = [];
request(URL, (error, response, body) =>
{
    let $ = cheerio.load(body);
    let images = $(".style__ImageContainer-sc-12h96bu-1");
    images.each((index, element) =>
    {
        allImages.push($(element).find("img").attr("src"));
    })
    res.render('index', { /* alerts: res.locals.alerts, bodyClass, gameplayVideos, gameplayPost, goodImageData, */ allImages });  
});
```
- PURPOSE: scrape data from the league of legends site to get some images that are not stored in their APIs
    - make a request to the site
    - load the elements of the body
    - find elements of a certain class
    - take those elements and the src attribute and push it into an array
    - use array for rendering the index.ejs page later

### EJS

#### EXAMPLE PAGE

```javascript
<h1 class="champ-home-title">League of Legends Champions</h1>

<hr class="in-title">

<div class="all-champs row row-cols-1 row-cols-md-5">

<% allNames.forEach(name =>
{ %>
    <div class="card bg-dark text-white all-champs-cards">
        <a class="card-link" href="/champs/<%= allChamps[name].id %>">
            <img class="champ-icon" src="<%= champImages[allNames.indexOf(name)] %>" class="card-img">
            <div class="card-img-overlay">
                <h5 class="card-title"><%= allChamps[name].name %></h5>
            </div>
        </a>
    </div>  
<% }) %>
</div>
```
- PURPOSE: display all the champions of league of legends with an image of the champion
    - cycle through array of champ data from fetch call done before
    - puts data into a bootstrap card

#### BOOTSTRAP

```HTML
<div class="faveChamp-cards row row-cols-1 row-cols-md-3">
    <% faveChamps.forEach(champ =>
    { %>
        <div class="col mb-4">
            <div class="card each-faveChamp-card">
                <img class="card-img-top faveChamps-splash" src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/<%= champ.id %>_0.jpg">
                <div class="card-body">
                    <h3 class="card-title faveChamp-name"><%= champ.name %></h3>
                    <p class="faveChamp-stats"><%= //all the stats are here %></p>
                    <p class="faveChamp-stats"><%= //more the stats are here %></p>
                </div>
                <% if (myId == siteId)
                { %>
                    <div class="card-footer">
                        <div class="faveChamps-buttons">
                            <form class="faveChamp-form" method="POST" action="/faveChamps/top/<%= champ.key %>/?_method=PUT">
                                <input type="submit" value="Add to Top Champs">
                            </form>
                            <form class="faveChamp-form" method="POST" action="/faveChamps/notop/<%= champ.key %>/?_method=PUT">
                                <input type="submit" value="Remove from Top Champs">
                            </form>
                        </div>
                        <div class="faveChamps-buttons">
                            <form class="faveChamp-form" method="GET" action="/champs/<%= champ.id %>">
                                <input type="submit" value="Champion Page">
                            </form>
                            <form class="faveChamp-form" method="POST" action="/faveChamps/<%= champ.key %>/?_method=DELETE">
                                <input type="submit" value="DELETE">
                            </form>
                        </div>
                    </div>
                <% } %>
            </div>
        </div>
    <% }) %>
</div>
```
- PURPOSE: display all the favorite champions on the favorites page in bootstrap cards along with buttons to add/remove from top faves, see the onechamp page, or remove the fave entirely
    - use the bootstrap format for the cards
    - cards of favechamps with splash image using league of legends API endpoint (no API key necessary) on top
    - body of card with the champion name
    - if user is verified to be you and page is verified to be yours...
        - allow CRUD with the database
            - add to top faves
            - remove from top faves
            - see oneChamp page of champion
            - delete the champ from the faveChamp database

```HTML
<div id="carouselExampleInterval" class="carousel slide highlights" data-ride="carousel" data-pause="false">
    <div class="carousel-inner">
        <div class="carousel-item active" data-interval="3000">
            <img src="https://i.ytimg.com/vi/QhOtNuRngqw/maxresdefault.jpg" class="d-block w-100">
        </div>
        <% for (let i = 0; i < gameplayVideos.length; i++)
        { %>
            <div class="carousel-item" data-interval="<%= gameplayVideos[i].duration * 1000 + 300 %>">
                <video class="d-block w-100" autoplay muted loop>
                    <source src="<%= gameplayVideos[i].fallback_url %>" type="video/mp4">
                YOUR BROWSER DOES NOT SUPPORT THIS VIDEO TYPE
                </video>
            </div>
        <% } %>
    </div>
</div>
```
- PURPOSE: display a bunch of league of legends gameplay videos in a bootstrap carousel that goes to the next video automatically after the video finishes playing
    - use the bootstrap format for the carousel
    - first element of carousel is an image to display the highlight splash image
    - other elements are videos obtained from fetch call in reddit API
    - duration of the video being played is obtained from the reddit API data
    - video is set to autoplay, loop, and mute

### MODELS and MIGRATIONS

#### MODELS

```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favechampion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favechampion.belongsToMany(models.user, {through: "users_favechampions", onDelete: "CASCADE"});
    }
  };
  favechampion.init({
    name: DataTypes.STRING,
    champKey: DataTypes.STRING,
    topFive: DataTypes.STRING,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favechampion',
  });
  return favechampion;
};
```
- PURPOSE: used to take data and store it in the data table it is named after

#### MIGRATIONS

```javascript
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favechampions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      champKey: {
        type: Sequelize.STRING
      },
      topFive: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favechampions');
  }
};
```
- PURPOSE: used to take data and migrate it into the data table it is named after

### CSS

```CSS
/* STYLING FOR HOME SPLASH ART */
.home-splashes
{
  margin: 4vw;
  margin-right: 4.2vw;
  margin-bottom: 2vw;
  font-size: 2.5vw;
  display: flex;
  justify-content: center;
}

.splashes
{
  margin-left: 5vw;
  margin-right: 4vw;
  margin-bottom: 4vw;
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.splash-img
{
  height: 23vw;
  object-fit: cover;
  border: 0.5vw white solid;
}

.splash-art-1,.splash-art-2
{
  flex: 25%;
  padding: 1.7vw;
}

.splash-art-3,.splash-art-4
{
  flex: 25%;
  padding: 1.7vw;
}

.splash-art-5,.splash-art-6
{
  flex: 25%;
  padding: 1.7vw;
}

.splash-art-7,.splash-art-8
{
  flex: 25%;
  padding: 1.7vw;
}

.splash-author
{
  padding-bottom: 0;
}

.splash-author-text
{
  text-shadow: 0 0 5vw black;
  font-size: 1.5vw;
  margin-bottom: 0;
}
/* STYLING FOR HOME SPLASH ART */
```
- PURPOSE: some of the styling used for the splash art on the home page
