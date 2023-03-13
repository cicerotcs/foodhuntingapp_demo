const { Client } = require("pg");
require("dotenv").config();

const config = {
  dev: {
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "foodhuntingapp",
  },
  prod: {
    connectionString: process.env.DB_URL,
  },
};

module.exports = new Client(process.env.DB_URL ? config.prod : config.dev);
