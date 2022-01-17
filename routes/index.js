const pokemonRouter = require('./pokemon');
const router = require('express').Router();

router.use('/pokemon', pokemonRouter);

module.exports = { router };
