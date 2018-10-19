
const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);
const {Client} = require('pg');
const client = new Client({
  database: 'restaurant_app'
});


client.connect((err) => {

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));







app.post("/addToCart", (req,res) => {
  let itemId = req.body.item_id;
  knex('cart_line_items')
  .returning("*")
  .insert({
    users_id: 1,
    menu_items_id : itemId
  }).then(() => {
    res.status(201);
  })
});




})










app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

