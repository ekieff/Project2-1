# Project 2 - League of Legends (imjchiang-lolinfo)

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

## Purpose
To display data from league of legends on specific players and allow players to create accounts to add favorite teammates, champions, and game modes from league of legends.

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
``` javascript
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
``` javascript
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
``` javascript
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
``` javascript
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

