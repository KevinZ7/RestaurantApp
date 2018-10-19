
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

// client.connect((err) => {
//   if(err) throw err;



app.post("/orders", (req,res) => {
  let order = req.body
  console.log(order.cart[0].id);

})

function exitInCart(userid, itemid){
  return knex('cart').

}
// function CheckInDB(userId, ItemID){
//   knex.selecT('');

// }

app.post("/addToCart", (req,res) => {

  // //Check whether the ID exists of not
  // let id = CheckIdinDb(userId, itemID)
  // if(id){
  //   //it means the id already exists in the CART
  //   //UPDATE the QUANTITY
  // } else {
  //   //It does not exitss
  //   //INSERT A NEW ROW
  // }

  let itemId = req.body.item_id
  console.log(itemId);

  return knex('list_item')
  .returning('*')
  .insert([{
    menu_item_id: itemId
  }]);
  .then(()=>{
    return knex('cart')
    .returning('*')
    .insert([{
      list_item_id:
    }])

  })

})









app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});





