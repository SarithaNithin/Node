
const port = process.env.PORT || 5000;
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require("jsonwebtoken");

const server = express();
server.use(cors());server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.json());

const Sequelize = require('sequelize');
// connect dev db
const connection = new Sequelize(process.env.DATABASENAME, process.env.DBUSER, process.env.DBPASS, {
  host:  process.env.DBHOST,
  dialect: 'mysql'
});
const database = {
  host :  process.env.DBHOST,
  port : process.env.DBPORT,
  user : process.env.DBUSER,
  password : process.env.DBPASS,
  database : process.env.DATABASENAME
}
module.exports = {
  express,
  bodyParser,
  //port,
  server,
  connection,
  Sequelize,
  bcrypt,
  validator,
  jwt,
  database
};