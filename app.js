const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const {initDb, Pokemon} = require('./src/db/sequelize');

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())

initDb();

require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));