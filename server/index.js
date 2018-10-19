
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

function addToCart(itemId,userId,res){
  knex('cart_line_items')
  .insert({
    users_id: userId,
    menu_items_id : itemId
  }).then(() => {
    res.status(201);
  })
};

function getCart(userId){
  return knex('cart_line_items')
  .join('menu_items', 'menu_items_id', '=', 'menu_items.id')
  .select('menu_items.id')
  .where({
    users_id: userId
  })
  .asCallback((err,result) => {
   return result;
  })
}










app.post("/addToCart", (req,res) => {
  let itemId = req.body.item_id;
  let userId = 1;
  addToCart(itemId,userId,res);
});

app.post("/addToOrder", (req,res) => {
  let userId = 1;
  getCart(userId)
  .then((result) => {

    knex('customer_orders')
    .returning('customer_orders.id')
    .insert({
      users_id : userId
    })
    .then((orderId) => {
      result.forEach((item) => {
        knex('order_line_items')
        .insert({
          customer_orders_id : orderId[0],
          menu_items_id : item.id
        })
        .then(() => {
          res.status(201);
        })
      })
    })
    .then(() => {
      knex('cart_line_items')
      .where('users_id','=',`${userId}`)
      .del()
      .asCallback();
    })
  })
});














app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

