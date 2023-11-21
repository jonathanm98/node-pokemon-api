const express = require('express');
let pokemons = require('./pokemons');

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!!"));

app.get("/api/pokemons/", (req, res) => {
    res.status(200).json({response: `Il y a ${pokemons.length} pokemons dans le pokédex !`});
})
app.get("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let pokemon = pokemons.find(pokemon => pokemon.id === id);
    if (!pokemon || typeof id !== "number") {
        res.status(404).json({error: "Le pokemon demandé n'existe pas"});
        return;
    }
    res.status(200).json(pokemon);
})
app.listen(port, () => console.log(`app listening on port ${port}!`));