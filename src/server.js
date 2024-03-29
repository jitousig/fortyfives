// src/server.js
/*const { Server } = require('boardgame.io/server');
const { TicTacToe } = require('./Game');

const server = Server({ games: [TicTacToe] });

server.run(8000);*/

import { Server } from 'boardgame.io/server';
import path from 'path';
import serve from 'koa-static';
import { TicTacToe } from './Game.js';
import { PostgresStore } from "bgio-postgres";

console.log(process.env.DATABASE_URL);

const db = new PostgresStore(
  process.env.DATABASE_URL,
  {
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS: https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificate
    }
  }
  }
);

const server = Server({ games: [TicTacToe], db });
const PORT = process.env.PORT || 8000;

console.log("got to line 17")

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../build');
//const frontEndAppBuildPath = __dirname
server.app.use(serve(frontEndAppBuildPath))

console.log(frontEndAppBuildPath)
console.log("got to line 23")


server.run(PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next
    )
  )
});
