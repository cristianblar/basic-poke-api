const pokemonRouter = require('./pokemon');
const router = require('express').Router();

router.use('/pokemon', pokemonRouter);
router.get('/', (req, res) => res.send('Welcome to basic Pokémon API!'));

module.exports = { router };
