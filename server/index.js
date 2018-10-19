
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



app.post("/orders", (req,res) => {
  let order = req.body
  console.log(order.cart[0].id);
})


function existInCart(userid, itemid){
  return knex.select('id').from("cart")
  .where("users_id",1)
  .andWhere("list_item_id",3)
  .then(function(result){
    if(result.length === 0){
      //IT means no record exists
      return false;
    } else{
      //it means a record exits
      return true;
    }
    console.log("we are go some data ",result);
  });
}


app.post("/addToCart", (req,res) => {
  let itemId = req.body.item_id
  console.log(itemId)
  let cartItemResult = existInCart(1, itemId)
    .then((cartItemResult) => {
      if(cartItemResult === false){
        return knex('cart')
        .returning('*')
        .insert({
          users_id : 1,
          list_item_id : itemId
        })
      } else {
        return knex('cart')
        .where('list_item_id', '=', itemId)
        .increment('quantity',1)
        }
      });
    res.status(202)
  });


  // return knex('list_item')
  // .returning('*')
  // .insert([{
  //   menu_item_id: itemId
  // }]);
  // .then(()=>{
  //   return knex('cart')
  //   .returning('*')
  //   .insert([{
  //     list_item_id:
  //   }])

  })










app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

