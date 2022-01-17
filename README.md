
# Basic Poke Api

Node.js Express API to get the list of all Pokémon with their basic information.

## Features

- Paginated results (20 per page)
- All the basic Pokémon information at one endpoint
- Additional endpoint for Pokémon evolution chain
- Client and server side caching strategies
- Defensive error handling

## Tech Stack

- JavaScript
- Node.js
- Express
- node-cache
- Jest + supertest

## Deployment

This API was deployed with Heroku at:

<https://basic-poke-api.herokuapp.com>

To deploy your own proyect:

Go to the project directory

```bash
  cd basic-poke-api
```

Provision Heroku app (Heroku CLI and Heroku account required)

```bash
  create yourAppName --buildpack heroku/nodejs
```

Push the project to Heroku git repository

```bash
  git push heroku main
```

Add environment variables through Heroku console!

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CURRENT_POKEMON_AMOUNT`

`POKE_API_URL`

`API_HOST`

## Run Locally

Clone the project

```bash
  git clone https://github.com/cristianblar/basic-poke-api
```

Go to the project directory

```bash
  cd basic-poke-api
```

Install dependencies

```bash
  yarn add
```

Start the server

```bash
  yarn start:dev
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

## API Reference

### Get all Pokémon

```http
  GET /pokemon?page=2
```

| Query param | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | The page you want to retrieve |

### Get evolution chain

```http
  GET /pokemon/evolutions/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of pokémon to get evolution chain |

## Screenshots

### GET Pokémon list

![App Screenshot](https://raw.githubusercontent.com/cristianblar/basic-poke-api/main/screenshots/GETAllPokemon.png)

### GET Pokémon list with page

![App Screenshot](https://raw.githubusercontent.com/cristianblar/basic-poke-api/main/screenshots/GETPokemonListWithPage.png)

### GET Pokémon evolution chain

![App Screenshot](https://raw.githubusercontent.com/cristianblar/basic-poke-api/main/screenshots/GETEvolutionChain.png)

## Author

- [@cristianblar](https://github.com/cristianblar)
