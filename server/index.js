
const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const accountSid = 'ACd728bad50e82e0eb6580df59e1a5f4eb';
const authToken = '11bdece36506ddf4a69ac72fede9166a';
const twilio= require('twilio')(accountSid, authToken);
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

twilio.messages.create(
  {
    to: '+16044410372',
    from: '+17782007215',
    body: 'You just added a new item to your cart!',
  },
  (err, message) => {
    console.log(message.id);
  }
);
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

