
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

const{confirmOrder,
  loadOrder,
  loadMenuItems,
  getCartItems,
  getCart,
  removeFromCart,
  addToCart,
  getCartLineItem,
  orderIdents} = require('../data-helpers/cart-knex')(knex);



//saves order from database and makes them available client side
app.get("/orderPlaced",(req, res) =>{
  loadOrder()
    .then((items) =>{
      orderIdents()
      .then((result) => {
        res.status(200);
        res.json({
          order: items,
          orderIdents: result
        })
      })
    })
})


app.post("/removeFromCart", (req,res) => {
  let itemId = Number(req.body.item_id)
  let userId = 6;

  removeFromCart(itemId,userId,() => {
    getCart(userId)
    .then((cart) => {
      res.status(201);
      res.json({cart: cart})
    })
  });

})

app.post("/addToCart", (req,res) => {
  let itemId = req.body.item_id;
  let userId = 6;
  addToCart(itemId,userId,() => {
    getCart(userId)
    .then((cart) => {
      res.status(201);
      res.json({cart: cart})
    })
  });
});


app.post("/addToOrder", (req,res) => {
  let userId = 6;
  getCartItems(userId)
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
    .then(() => {
      twilio.messages.create(
            {
              to: '+16044410372',
              from: '+16042655347',
              body: 'Thank you for placing your order, please wait for confirmation',
            },
            (err, message) => {
              console.log(message.sid);
            }
      );
    })
    .then(() => {
      twilio.messages.create(
            {
              to: '+17786833957',
              from: '+16042655347',
              body: 'You have a new order awaiting confirmation!',
            },
            (err, message) => {
              console.log(message.sid);
            }
          );
    })
  })
});


//saves items from database and makes them available client side
app.get("/items",function(req,res){
  loadMenuItems()
    .then((cart) => {
      res.status(200);
      res.json({menu: cart})
    })
});

app.get('/favourite', function(req,res){
  getLikedItem(6)
  .then((items) => {
    console.log(items)
    res.status(200);
    res.json({favouriteInfo: items })
  })
})


app.post("/confirmOrder", (req,res) => {
  let orderId = req.body.order_id;
  let userId = 6;

  confirmOrder(orderId,userId)
  .then(()=>{
    loadOrder()
    .then((items) => {
      orderIdents()
      .then((result) => {
        res.status(200);
        res.json({
          order: items,
          orderIdents: result
        })
        twilio.messages.create(
          {
            to: '+16044410372',
            from: '+16042655347',
            body: 'Your order has been confirmed and will be available in 15 minutes! Thank you for your purchase from Gonuts Donuts!',
          },
          (err, message) => {
            console.log(message.sid);
          }
        );
      })
    })
  })
})

function addLikedItem(itemId,userId){
  return knex('liked_items')
  .insert({
    users_id: userId,
    menu_items_id: itemId
  })
}

function getLikedItem(userId){
  return knex('liked_items')
  .join('menu_items','menu_items_id', '=', 'menu_items.id')
  .select('menu_items.id','menu_items.name','menu_items.price','menu_items.avatar','menu_items.description')
}




app.post("/addLikedItem", (req,res) => {
  let itemId = req.body.item_id;
  let userId = 6;

  getLikedItem(userId)
  .then((value) => {
    let found = false;
    value.forEach((item) => {
      if(item.id == itemId){
        found = true;
      }
    })

    if(found === false){
      addLikedItem(itemId,userId)
      .then(() => {
        getLikedItem(userId)
        .then((result) => {
          res.status(201);
          res.json({items:result});
        })
      });
    } else{
      getLikedItem(userId)
      .then((result) => {
        res.status(201);
        res.json({items:result});
      })
    }
  })

})

function removeLikedItem(userId,itemId){
  return knex('liked_items')
  .where({
    menu_items_id: itemId
  })
  .del()
}

app.post("/removeLikedItem", (req,res) => {
  let itemId = req.body.item_id;
  let userId = 6;

  removeLikedItem(userId,itemId)
  .then(() => {
    getLikedItem(userId)
    .then((result) => {
      res.status(201);
      res.json({items:result});
    })
  })


})


















app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

