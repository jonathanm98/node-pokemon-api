const express = require('express');
require("dotenv").config()
const favicon = require('serve-favicon');
const {initDb} = require('./src/db/sequelize');

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(express.json())

initDb();

app.get("/", (req, res) => {
    res.json("Hello Heroku!")
})

require('./src/routes/login')(app);
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);

app.use("*", ({res}) => res.status(200).json({error: "Cette URL n'existe pas dans notre API."}))

app.listen(port, () => console.log(`App listening on port ${port}!`));