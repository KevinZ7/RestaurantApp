function makeUrlDataHelpers(knex){
//   function loadOrder(){
//   return knex('order_line_items')
//   .join('customer_orders', 'customer_orders_id', '=', 'customer_orders.id')
//   .join('menu_items','menu_items_id', '=', 'menu_items.id')
//   .join('users','users_id','=','users.id')
//   .select('users.name','users.phone','menu_items.name','menu_items.price')
//   .count('*')
//   .groupBy('menu_items.name', 'users.name', 'users.phone', 'menu_items.price')
//   .asCallback()
// }

function orderIdents(){
  return knex('customer_orders')
  .select('customer_orders.id')
  .where({users_id: 6})
  .asCallback()
}

function getCartLineItem(itemId,userId){
  return knex('cart_line_items')
  .select('id')
  .where({
    menu_items_id : itemId,
    users_id : userId
  })
  .limit(1)
}

function addToCart(itemId,userId,cb){
  return knex('cart_line_items')
  .insert({
    users_id: userId,
    menu_items_id : itemId
  }).then(() => {
    cb()

  })
}


function removeFromCart(itemId,userId,cb){
  return getCartLineItem(itemId,userId)
  .then((result) => {
    let tableId = result[0].id;
    knex('cart_line_items')
    .where('id',tableId)
    .del()
    .asCallback((err) => {
      cb();
    })
  })
}


function getCart(userId){
  return knex('cart_line_items')
  .join('menu_items', 'menu_items_id', '=', 'menu_items.id')
  .select('menu_items.id','menu_items.name','menu_items.avatar','menu_items.price')
  .count('*')
  .sum('menu_items.price')
  .where({
    users_id: userId
  })
  .groupBy('menu_items.id','menu_items.price')
  .asCallback((err,result) => {
   return result;
  })
}

function getCartItems(userId){
  return knex('cart_line_items')
  .join('menu_items','menu_items_id', '=', 'menu_items.id')
  .select('menu_items.id')
  .where({
    users_id: userId
  })
  .asCallback((err,result) => {
    return result;
  })

}

function loadMenuItems(){
  return knex('menu_items')
  .select('*')
  .then((data) =>{
   return data;
  })
}

function loadOrder(){
  return knex('order_line_items')
  .join('customer_orders', 'customer_orders_id', '=', 'customer_orders.id')
  .join('menu_items','menu_items_id', '=', 'menu_items.id')
  .join('users','users_id','=','users.id')
  .select('users.name','users.phone','menu_items.name','menu_items.price','customer_orders_id')
  .count('*')
  .groupBy('customer_orders.id','menu_items.name', 'users.name', 'users.phone', 'menu_items.price','order_line_items.customer_orders_id')
  .asCallback()
}

function confirmOrder(orderId,userId){
  return knex('order_line_items')
  .where('customer_orders_id',orderId)
  .del()
  .then(() => {
    knex('customer_orders')
    .where('customer_orders.id',orderId)
    .del()
    .asCallback()
  })
}

return{
  confirmOrder,
  loadOrder,
  loadMenuItems,
  getCartItems,
  getCart,
  removeFromCart,
  addToCart,
  getCartLineItem,
  orderIdents,
};

}

module.exports = makeUrlDataHelpers;