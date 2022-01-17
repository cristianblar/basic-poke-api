const axios = require('axios').default;
const NodeCache = require('node-cache');

const pokemonPagesCache = new NodeCache({
  maxKeys: 60,
  stdTTL: 86400,
});

const pokemonEvolutionsCache = new NodeCache({
  maxKeys: process.env.CURRENT_POKEMON_AMOUNT,
  stdTTL: 86400,
});

function getEvolutionsRecursive(evolutionObject, evolutionQueue = []) {
  if (evolutionObject?.species?.name)
    evolutionQueue.push(evolutionObject.species.name);

  if (evolutionObject.evolves_to?.length)
    evolutionObject.evolves_to.forEach((evolutionChain) =>
      getEvolutionsRecursive(evolutionChain, evolutionQueue)
    );

  return evolutionQueue;
}

module.exports = {
  getPokemon: async function (page) {
    if (isNaN(Number(page)) && page !== undefined)
      throw new TypeError('Invalid page value');

    const maxPage = Math.ceil(+process.env.CURRENT_POKEMON_AMOUNT / 20);
    const fixedPage = +page < 2 || !page ? 1 : +page > maxPage ? maxPage : +page;
    const offset = (Math.round(fixedPage) - 1) * 20;

    if (process.env.NODE_ENV !== 'development') {
      const cachedData = pokemonPagesCache.get(`__pokeapi__page__${fixedPage}`);
      if (cachedData) return cachedData;
    }

    const nextUrl =
      fixedPage === maxPage
        ? null
        : `${process.env.API_HOST}/pokemon?page=${fixedPage + 1}`;
    const previousUrl =
      fixedPage === 1
        ? null
        : `${process.env.API_HOST}/pokemon?page=${fixedPage - 1}`;

    const {
      data: { results: rawResults },
    } = await axios.get(`${process.env.POKE_API_URL}/pokemon?offset=${offset}`);
    const completeResults = await Promise.all(
      rawResults.map((pokemon) =>
        axios.get(pokemon.url).then((response) => response.data)
      )
    );

    const responseObject = {
      count: process.env.CURRENT_POKEMON_AMOUNT,
      next: nextUrl,
      previous: previousUrl,
      results: completeResults.map((pokemon) => ({
        abilities: pokemon.abilities.map(
          (abilityObject) => abilityObject.ability.name
        ),
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((typeObject) => typeObject.type.name),
        weight: pokemon.weight,
      })),
    };

    if (process.env.NODE_ENV !== 'development') {
      pokemonPagesCache.set(`__pokeapi__page__${fixedPage}`, responseObject);
    }

    return responseObject;
  },
  getEvolutions: async function (pokemonId) {
    if (isNaN(Number(pokemonId)))
      throw new TypeError('Invalid pokemon id value');

    if (process.env.NODE_ENV !== 'development') {
      const cachedData = pokemonEvolutionsCache.get(
        `__pokeapi__evolution__${pokemonId}`
      );
      if (cachedData) return cachedData;
    }

    const { data: rawSpeciesResults } = await axios.get(
      `${process.env.POKE_API_URL}/pokemon-species/${pokemonId}`
    );

    const { data: evolutionChain } = await axios.get(
      rawSpeciesResults.evolution_chain.url
    );

    const responseObject = {
      results: getEvolutionsRecursive(evolutionChain.chain),
    };

    if (process.env.NODE_ENV !== 'development') {
      pokemonEvolutionsCache.set(
        `__pokeapi__evolution__${pokemonId}`,
        responseObject
      );
    }

    return responseObject;
  },
};
