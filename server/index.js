
const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const accountSid = 'ACd728bad50e82e0eb6580df59e1a5f4eb';
const authToken = '11bdece36506ddf4a69ac72fede9166a';
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

app.get('/cart', (req, res) =>{
let cartData = getCart(1);

  res.send(cartData)
})


function addToCart(itemId,userId,res){
  knex('cart_line_items')
  .insert({
    users_id: userId,
    menu_items_id : itemId
  }).then(() => {
    // twilio.messages.create(
    //   {
    //     to: '+17786833957',
    //     from: '+17782007215',
    //     body: 'hey kevin this is your app',
    //   },
    //   (err, message) => {
    //     console.log("all is good");
    //   }
    // );
  })
};

function getCart(userId){
  cart = [];
  return knex('cart_line_items')
  .join('menu_items', 'menu_items_id', '=', 'menu_items.id')
  .select('menu_items.id', 'menu_items.name', 'menu_items.avatar','menu_items.price')
  .where({
    users_id: userId
  })
  .then((result) => {
   console.log(result)
  })
  // return cart
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

