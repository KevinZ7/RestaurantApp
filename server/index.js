
const express = require('express');
const menuRoutes = express.Router();
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const accountSid = 'AC3fd0f60292368f6415acd32dbca3b9c9';
const authToken = '2c9bd5dc5aef8d1295dd734ac27dda2a';
const twilio= require('twilio')(accountSid, authToken);
// const twiml = twilio.TwimlResponse();
const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);
const {Client} = require('pg');
const client = new Client({
  database: 'restaurant_app'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// app.post('/sms', function(req, res) {
//   var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();
//   twiml.message('The Robots are coming! Head for the hills!');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

//function which queiries database and saves menu items
function loadMenuItems(){
  return knex('menu_items')
  .select('*')
  .then((data) =>{
   return data;
  })
}
//function which queiries database and saves new order
function loadOrder(){
  return knex('cart_line_items')
  .join('menu_items', 'menu_items_id', '=', 'menu_items.id')
  .select('menu_items.name','users.name','users.phone')
  .count('*')
  .sum('menu_items.price')
  .where({
    users_id: userId
  })
  .groupBy('menu_items.id')
  .asCallback((err,result) => {
   return result;
  })
}



app.get("/orderPlaced",(req, res) =>{
  loadMenuItems()
    .then((items) =>{
      res.status(200);
      res.json({order: items})
    })
})



//saves items from database and makes them available client side
app.get("/items",function(req,res){
  loadMenuItems()
    .then((cart) => {
      res.status(200);
      res.json({menu: cart})
    })
});

app.get







function addToCart(itemId,userId,cb){
  return knex('cart_line_items')
  .insert({
    users_id: userId,
    menu_items_id : itemId
  }).then(() => {
    cb()

  })
};

function getCart(userId){
  return knex('cart_line_items')
  .join('menu_items', 'menu_items_id', '=', 'menu_items.id')
  .select('menu_items.id','menu_items.name')
  .count('*')
  .sum('menu_items.price')
  .where({
    users_id: userId
  })
  .groupBy('menu_items.id')
  .asCallback((err,result) => {
   return result;
  })
}



app.post("/addToCart", (req,res) => {
  let itemId = req.body.item_id;
  let userId = 1;
  addToCart(itemId,userId,() => {
    getCart(userId)
      .then((cart) => {
        res.status(201);
        res.json({cart: cart})
      })
  });
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
          res.status(201).end();
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

