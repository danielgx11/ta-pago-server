import { Sequelize } from "sequelize-typescript";

require('dotenv').config();

import User from "./models/user";

const connection = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  port: 5432,
  define: {
    timestamps: true,
    underscored: false,
  },
  models: [User],
});

export default connection;