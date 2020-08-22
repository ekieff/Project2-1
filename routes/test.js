const fetch = require("node-fetch");
let API_KEY = "RGAPI-66c2286d-4540-4939-8ac2-94ea856581b2";

let array1 = [];

async function getPlayerDets(favePlayer)
{
    let response = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${favePlayer}?api_key=${API_KEY}`);
    let statsData = await response.json();
    console.log(statsData);

    if (!(statsData.length >= 1))
    {
        return "NO SOLO RANKED GAMES DATA";
    }
    else
    {
        return statsData[0].rank;
    }
}

async function addToArray(favePlayers)
{ 
    for (const player of favePlayers)
    {
        await getPlayerDets(player)
        .then(playerResults =>
        {
            array1.push(playerResults);
        })
    }
    console.log(array1);
}


addToArray(["M25ad07oJwlApoBM_8P6jFvJfmTBzPjNKExeqvjLQWDKabY", "q2XMy6oiAWULSDwRT6NSF3xRoMCx6uKrru8bYnLOxgQ", "5SWtKN76CzTDXMsm9OO8yTXXkbwT6A64GygQnW6PuAvzcJU"]);