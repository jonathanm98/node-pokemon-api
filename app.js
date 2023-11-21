const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const morgan = require('morgan');
const favicon = require('serve-favicon');
let pokemons = require('./pokemons');
const { success, getUniqueId } = require("./helper")
const PokemonModel = require("./src/models/pokemon")

const app = express();
const port = 3000;

const sequelize = new Sequelize("pokedex", "root", "", {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        timezone: "Etc/GMT-2"
    },
    logging: false
    }
)

sequelize.authenticate()
    .then(() => console.log("Connexion à la base de données réussie"))
    .catch(err => console.error("Impossible de se connecter à la base de données, assurez vous d'avoir une base de donnée MariaDB nommée 'pokedex' en local", err))

const Pokemon = PokemonModel(sequelize, DataTypes);

sequelize.sync({force: true})
    .then(() => console.log("La base de données 'Pokedex' a bien été synchronisée"))


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())

app.get("/", (req, res) => res.send("Hello World!!"));

app.get("/api/pokemons/", (req, res) => {
    res.status(200).json({success: "La liste des pokemons à bien été récupéré", pokemons});
})

app.post("/api/pokemons/", (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{id, created: new Date()} }
    console.log(pokemonCreated);
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé`;
    res.status(201).json(success(message, pokemonCreated));
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

app.put("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id }
    pokemons = pokemons.map(pokemon => pokemon.id === id ? pokemonUpdated : pokemon);
    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`;
    res.status(200).json(success(message, pokemonUpdated));
})

app.delete("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonToDelete = pokemons.find(pokemon => pokemon.id === id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    const message = `Le pokemon ${pokemonToDelete.name} a bien été supprimé`;
    res.status(200).json(success(message, pokemonToDelete));
})

app.listen(port, () => console.log(`App listening on port ${port}!`));