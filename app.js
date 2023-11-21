const express = require('express');

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!!"));

app.get("/api/pokemon/:id", (req, res) => {
    const id = req.params.id;

    const pokemon = [
        "Bulbasaur",
        "Ivysaur",
        "Venusaur",
        "Charmander",
        "Charmeleon",
        "Charizard",
        "Squirtle",
        "Wartortle",
        "Blastoise",
        "Caterpie",
        "Metapod",
        "Butterfree",
        "Weedle",
        "Kakuna",
        "Beedrill",
        "Pidgey",
        "Pidgeotto",
        "Pidgeot",
        "Rattata",
        "Raticate",
        "Spearow",
        "Fearow",
        "Ekans",
        "Arbok",
        "Pikachu",
        "Raichu",
        "Sandshrew",
        ]
    let name = pokemon[id - 1];

    res.send(`Hello, ${name}!`)
})
app.listen(port, () => console.log(`app listening on port ${port}!`));