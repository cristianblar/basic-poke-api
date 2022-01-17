const axios = require('axios');
const { bulbasaurMock, evolutionChainMock } = require('./__mocks__');
const { getEvolutions, getPokemon } = require('.');

if (process.env.NODE_ENV === 'development') require('dotenv').config();

jest.mock('axios');

describe('getPokemon service', () => {
  test('getPokemon service should return bulbasaur data', async () => {
    axios.default.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          results: [{}],
        },
      })
    );
    axios.default.get.mockImplementationOnce(() =>
      Promise.resolve({ data: bulbasaurMock })
    );
    await expect(getPokemon(1)).resolves.toStrictEqual({
      count: process.env.CURRENT_POKEMON_AMOUNT,
      next: `${process.env.API_HOST}/pokemon?page=2`,
      previous: null,
      results: [
        {
          abilities: ['overgrow', 'chlorophyll'],
          id: 1,
          name: 'bulbasaur',
          types: ['grass', 'poison'],
          weight: 69,
        },
      ],
    });
  });

  test('getPokemon should throw an error if page argument cannot be resolved to a number', async () => {
    await expect(getPokemon('ABC')).rejects.toEqual(
      new TypeError('Invalid page value')
    );
  });
});

describe('getEvolutions service', () => {
  test('getEvolutions service should return bulbasaur data', async () => {
    axios.default.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { evolution_chain: { url: '' } },
      })
    );
    axios.default.get.mockImplementationOnce(() =>
      Promise.resolve({ data: evolutionChainMock })
    );
    await expect(getEvolutions(1)).resolves.toStrictEqual({
      results: ['bulbasaur', 'ivysaur', 'venusaur'],
    });
  });

  test('getEvolutions should throw an error if pokemon id argument is missing or cannot be resolved to a number', async () => {
    await expect(getEvolutions()).rejects.toEqual(
      new TypeError('Invalid pokemon id value')
    );
    await expect(getEvolutions('ABC')).rejects.toEqual(
      new TypeError('Invalid pokemon id value')
    );
  });
});
