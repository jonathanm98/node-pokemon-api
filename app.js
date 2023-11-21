const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
let pokemons = require('./pokemons');
const { success, getUniqueId } = require("./helper")

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())

app.get("/", (req, res) => res.send("Hello World!!"));

app.get("/api/pokemons/", (req, res) => {
    res.status(200).json({success: "La liste des pokemons à bien été récupéré", pokemons});
})
app.get("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let pokemon = pokemons.find(pokemon => pokemon.id === id);
    if (!pokemon || typeof id !== "number") {
        res.status(404).json({error: "Le pokemon demandé n'existe pas"});
        return;
    }
    res.status(200).json(success("Voici le pokemon demandé", pokemon));
})

app.post("/api/pokemons/", (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{id, created: new Date()} }
    console.log(pokemonCreated);
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé`;
    res.status(201).json(success(message, pokemonCreated));
})

app.listen(port, () => console.log(`app listening on port ${port}!`));