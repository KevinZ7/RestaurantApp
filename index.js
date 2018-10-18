const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);
const {
  Client
} = require('pg');
const client = new Client({
  database: 'restaurant_app'
});


app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

client.connect((err) => {

  //required middle-ware and express set -up
 
  app.use(cookieSession({
    name: 'session',
    keys: ['nokeys'],
  }));



});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

