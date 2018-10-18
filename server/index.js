
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









app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});





