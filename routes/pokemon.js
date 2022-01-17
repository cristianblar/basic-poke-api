const { cacheHandler } = require('../middlewares');
const { getEvolutions, getPokemon } = require('../services');
const responseManager = require('../utils/response');
const router = require('express').Router();

router.route('/').get(cacheHandler, (req, res) => {
  responseManager(getPokemon, res, 200, [req.query.page]);
});

router.route('/evolutions/:id').get(cacheHandler, (req, res) => {
  responseManager(getEvolutions, res, 200, [req.params.id]);
});

module.exports = router;
