const request = require('supertest');
const { getEvolutions, getPokemon } = require('../services');
const app = require('../app');

jest.mock('../services');

getEvolutions.mockImplementation((paramsId) =>
  Promise.resolve({ data: paramsId })
);
getPokemon.mockImplementation((queryPage) =>
  Promise.resolve({ results: queryPage })
);

describe('/pokemon endpoint', () => {
  test('should return response based on queryPage', async () => {
    const res = await request(app).get('/pokemon?page=12');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({ results: '12' });
  });
});

describe('/pokemon/evolutions/:id endpoint', () => {
  test('should return response based on id param', async () => {
    const res = await request(app).get('/pokemon/evolutions/1234');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({ data: '1234' });
  });
});
